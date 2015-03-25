$(function() {
    "use strict";

    // This sets what the bars behind each combatant scale by.
    // encdps and damage result in very nearly the same ratios.
    // IE: damage = total damage
    //     encdps = DPS
    var dmgKey = "damage";


    // Matching "YOU";
    // If you have ACT to fix your name to something else
    // (by default you personally show up as "YOU"), set this to match (case sensitive).
    var selfName = "Kyitrai Iarnvind";


/* No other configuration options beyond this point. */

    // flag whether the last update we received was "in combat";
    // ACT sends a final update when it closes combat, and then no others
    // until a new encounter starts.
    var lastActive = null;

    // holds DOM references and graph objects for Encounters and Combatants
    var Overlay = {
        Encounter: {},
        EncounterElem: undefined,
        Combatants: {},
        CombtatantsElem: undefined
    };

    var t = new Date().getTime();

    // not implemented
    var nameKey = null;

    // Our Graph object.
    function Graph(elem) {
        var data = [];
        var width = elem.width();
        var height = elem.height();
        var container = d3.select(elem[0]).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
                .attr("transform", "translate(0, 0)")
        ;
        var xScale = d3.scale.linear()
            .domain([t - 30000, t]) // last 30 seconds
            .range([0, width])
            ;
        var yScale = d3.scale.linear()
            .range([height, 0])
            ;
        var area = d3.svg.area()
            .x(function(d) { return xScale(d[0]); })
            .y0(height)
            .y1(function(d) { return yScale(d[1]); })
            ;
        var line = d3.svg.line()
            .x(function(d) { return xScale(d[0]); })
            .y(function(d) { return yScale(d[2]); })
            ;
        var wArea = container.append("g")
            .attr("transform", "translate(0, 0)")
            .append("path")
                .attr("class", "area");
        var yLine = container.append("g")
            .attr("transform", "translate(0, 0)")
            .append("path")
                .attr("class", "line");

        // clears up old data, usually only employed on the Encounter graph
        // because it doesn't get destroyed.
        this.reset = function() {
            data = [];
            wArea.attr("d", "");
            yLine.attr("d", "");
        }

        // adds/draws new data and slides graph
        this.addPoint = function(x, w, y) {
            var xShift = xScale(xScale.domain()[1]) - xScale(x);
            // x is the ms timestamp for w, and y,
            // w is the rolling window DPS, and y is the encdps
            data.push([x, w, y]);

            // adjust domains, x to last 30 seconds according to timestamp x,
            // and y according to the maximum between rolling w and encdps y

            wArea.attr("d", area(data))
                .attr("transform", null)
                .transition()
                    .duration(250)
                    .ease("linear")
                    .attr("transform", "translate(" + xShift + ",0)")
            ;
            yLine.attr("d", line(data))
                .attr("transform", null)
                .transition()
                    .duration(250)
                    .ease("linear")
                    .attr("transform", "translate(" + xShift + ",0)")
            ;

            xScale.domain([x - 30000, x]);
            yScale.domain([
                d3.min(data, function(d) { return (d[1] <= d[2] ? d[1] : d[2]) * 0.85; }),
                d3.max(data, function(d) { return (d[1] >= d[2] ? d[1] : d[2]) * 1.15; })
            ]);

            data = data.filter( function(v) {
                return v[0] >= (x - 32000);
            } );
        };
    }

    function update(e) {
        var encData = e.Encounter;
        var cmbData = e.Combatant;
        var last10;
        var encdps;

        t = new Date().getTime();

        // Initialization of Encounter element
        if (!(Overlay.EncounterElem)) {
            $("#overlay").empty();
            Overlay.EncounterElem = $("div.encounter.template").clone().removeClass("template").appendTo("#overlay");
            Overlay.Encounter = { graph: null };

        }
        // Initialization of Combatants block element
        if (!(Overlay.CombatantsElem)) {
            Overlay.CombatantsElem = $('<div class="combatants" />');
            Overlay.CombatantsElem.appendTo("#overlay");
            Overlay.Combatants = {};
        }

        if (!Overlay.Encounter.graph) Overlay.Encounter.graph = new Graph(Overlay.EncounterElem.find("div.graph"));

        // new or end of encounter detection
        // also triggers on init because lastActive is null
        if (lastActive !== e.isActive) {

            lastActive = e.isActive;
            if (e.isActive) { // active; new encounter

                // clean out data
                Overlay.Encounter.graph.reset();

                // remove combatants
                Overlay.Combatants = {};
                Overlay.CombatantsElem.empty();

                Overlay.EncounterElem.addClass("active");

            } else {
                Overlay.EncounterElem.removeClass("active");

            }
        }

        last10 = parseInt(encData.Last10DPS);
        encdps = parseInt(encData.ENCDPS);
        if (isNaN(last10) || last10 === Infinity) last10 = false;
        if (isNaN(encdps) || encdps === Infinity) encdps = false;

        // update displayed encounter values
        Overlay.EncounterElem.find("span.name").text(encData.title);
        Overlay.EncounterElem.find("span.last10").text(last10 ? last10 : "---");
        Overlay.EncounterElem.find("span.dps").text(encdps ? encdps : "---");
        Overlay.EncounterElem.find("span.time").text(encData.duration);

        // update encounter graph as long as last10 or encdps parsed properly
        // (last10 tends not to in places like WoD -- still haven't tracked down exact cases)
        if (last10 && encdps && e.isActive) Overlay.Encounter.graph.addPoint(t, last10, encdps);

        // Update combatants

        // Sometimes ACT inits strangely and passes NPCs in.
        // So we'll check our existing list against the combatants list and remove anything that's not appearing
        Object.keys(Overlay.Combatants).filter( function(v, i, a) {
            if (typeof(cmbData[v]) === 'undefined'){
                Overlay.Combatants[v].elem.remove();
                delete Overlay.Combatants[v];
            }
            return false;
        });

        var hdmg = false;
        $.each(cmbData, function(k, combatant) {
            var shift = false;
            var elem;
            var dispName = combatant.name;

            if (nameKey == "fname" && dispName.split(" ").length > 1) dispName = dispName.split(" ")[0];

            if (!Overlay.Combatants[combatant.name]) {
                // new combatant to be added
                Overlay.Combatants[combatant.name] = { elem: null, graph: false };
                Overlay.Combatants[combatant.name].elem = $("div.combatant.template").clone().removeClass("template");
            }

            elem = Overlay.Combatants[combatant.name].elem;

            last10 = parseInt(combatant.Last10DPS);
            encdps = parseInt(combatant.ENCDPS);
            if (isNaN(last10) || last10 === Infinity) last10 = false;
            if (isNaN(encdps) || encdps === Infinity) encdps = false;

            // assuming the OverlayPlugin is set to sort on encdps, highest to lowest,
            // the first iteration of this loop will set the hdmg to the highest
            if (!hdmg) hdmg = parseFloat(combatant[dmgKey]);
            if (combatant.name.toUpperCase() == "YOU" || combatant.name == selfName) elem.addClass("self");

            // update displayed combatant values
            elem.find("span.name").text(combatant.name);
            elem.find("span.last10").text(last10 ? last10 : "---");
            elem.find("span.dps").text(encdps ? encdps : "---");
            elem.find("span.crit").text(combatant['crithit%']);
            elem.find("span.acc").text(combatant.TOHIT + "%");
            elem.find("div.bar")
                .css('width', ((parseFloat(combatant[dmgKey]) / hdmg) * 100) + "%");
            if (combatant.Job != "") elem.addClass("job-" + combatant.Job);

            // move position in list
            // how to animate as sliding when sorting changes ...
            elem.appendTo(Overlay.CombatantsElem);

            // push last10dps to Combatant's graph
            if (last10 && encdps && e.isActive) {
                // We create the graph object here as by this point any elements have been appended.
                // Doing it before causes it not to initialize properly and the graph doesn't show up.
                if (!Overlay.Combatants[combatant.name].graph)
                    Overlay.Combatants[combatant.name].graph = new Graph(Overlay.Combatants[combatant.name].elem.find("div.graph"));
                Overlay.Combatants[combatant.name].graph.addPoint(t, last10, encdps);
            }

        });
    }

    $(document).on('onOverlayDataUpdate', function(e) { update(e.originalEvent.detail) } );
});
