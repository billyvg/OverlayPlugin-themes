// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */

var IMAGE_PATH = 'images';
var EncountersArray = [];

var React = window.React;

var formatNumber = function(number)  {
    number = parseFloat(number, 10);

    if (number >= 1000) {
        return (number / 1000).toFixed(2) + 'K';
    }
    else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + 'K';
    }

    return number.toFixed(2);
};

var ____Class1s=React.Component;for(var ____Class1s____Key in ____Class1s){if(____Class1s.hasOwnProperty(____Class1s____Key)){CombatantCompact[____Class1s____Key]=____Class1s[____Class1s____Key];}}var ____SuperProtoOf____Class1s=____Class1s===null?null:____Class1s.prototype;CombatantCompact.prototype=Object.create(____SuperProtoOf____Class1s);CombatantCompact.prototype.constructor=CombatantCompact;CombatantCompact.__superConstructor__=____Class1s;function CombatantCompact(){"use strict";if(____Class1s!==null){____Class1s.apply(this,arguments);}}
    Object.defineProperty(CombatantCompact.prototype,"jobImage",{writable:true,configurable:true,value:function(job) {"use strict";
        if (window.JSFIDDLE) {
            return window.GLOW_ICONS[job.toLowerCase()];
        }

        return IMAGE_PATH + '/glow/' + job.toLowerCase() + '.png';
    }});

    Object.defineProperty(CombatantCompact.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        //var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
        var width = Math.min(100, parseInt(this.props.total / this.props.max * 100, 10)) + '%';

        return (
            this.props.perSecond === '---' ? null :
            React.createElement("li", {
                className: 'row ' + this.props.job.toLowerCase() + (this.props.isSelf ? ' self' : ''), 
                onClick: this.props.onClick}, 
                React.createElement("div", {
                    className: "bar", 
                    style: {width: width}}), 
                    React.createElement("div", {className: "text-overlay"}, 
                        React.createElement("div", {className: "stats"}, 
                            React.createElement("span", {className: "total"}, 
                                this.props.totalFormatted
                            ), 

                            this.props.additional ?
                            React.createElement("span", {className: "additional"}, 
                                "[", this.props.additional, "]"
                            ) : null, 


                            "(", 
                            React.createElement("span", {className: "ps"}, 
                                this.props.perSecond, ","
                            ), 

                            React.createElement("span", {className: "percent"}, 
                                this.props.percentage
                            ), 
                            ")"
                        ), 
                        React.createElement("div", {className: "info"}, 
                            React.createElement("span", {className: "job-icon"}, 
                                React.createElement("img", {src: this.jobImage(this.props.job)})
                            ), 
                            React.createElement("span", {className: "rank"}, 
                                this.props.rank, "."
                            ), 
                            React.createElement("span", {className: "character-name"}, 
                                this.props.characterName
                            ), 
                            React.createElement("span", {className: "character-job"}, 
                                this.props.job
                            )
                        )
                    )
            )
        );
    }});

CombatantCompact.defaultProps = {
    onClick:function() {}
};

var ____Class1t=React.Component;for(var ____Class1t____Key in ____Class1t){if(____Class1t.hasOwnProperty(____Class1t____Key)){ChartView[____Class1t____Key]=____Class1t[____Class1t____Key];}}var ____SuperProtoOf____Class1t=____Class1t===null?null:____Class1t.prototype;ChartView.prototype=Object.create(____SuperProtoOf____Class1t);ChartView.prototype.constructor=ChartView;ChartView.__superConstructor__=____Class1t;function ChartView(){"use strict";if(____Class1t!==null){____Class1t.apply(this,arguments);}}
    Object.defineProperty(ChartView.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        return (
            React.createElement("div", {className: "chart-view"}
            )
        );
    }});


var ____Class1u=React.Component;for(var ____Class1u____Key in ____Class1u){if(____Class1u.hasOwnProperty(____Class1u____Key)){Header[____Class1u____Key]=____Class1u[____Class1u____Key];}}var ____SuperProtoOf____Class1u=____Class1u===null?null:____Class1u.prototype;Header.prototype=Object.create(____SuperProtoOf____Class1u);Header.prototype.constructor=Header;Header.__superConstructor__=____Class1u;
    function Header(props) {"use strict";
        ____Class1u.call(this,props);
        this.state = {
            expanded: false,
            showEncountersList: false
        };
    }

    Object.defineProperty(Header.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps) {"use strict";
        if (nextProps.encounter.encdps === '---') {
            return false;
        }

        return true;
    }});

    Object.defineProperty(Header.prototype,"handleExtraDetails",{writable:true,configurable:true,value:function(e) {"use strict";
        this.props.onExtraDetailsClick(e);

        this.setState({
            expanded: !this.state.expanded
        });
    }});

    /**
     * Show dropdown for list of encounters
     */
    Object.defineProperty(Header.prototype,"handleEncounterClick",{writable:true,configurable:true,value:function(e) {"use strict";
        this.setState({
            showEncountersList: !this.state.showEncountersList
        });
    }});

    Object.defineProperty(Header.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        var encounter = this.props.encounter;
        var rdps = parseFloat(encounter.encdps);
        var rdps_max = 0;

        if (!isNaN(rdps) && rdps !== Infinity) {
            rdps_max = Math.max(rdps_max, rdps);
        }

        return (
            React.createElement("div", {className: ("header " + (this.state.expanded ? '' : 'collapsed'))}, 
                React.createElement("div", {className: "encounter-header"}, 
                    React.createElement("div", {className: "encounter-data ff-header"}, 
                        React.createElement("span", {className: "target-name dropdown-parent", onClick: this.handleEncounterClick.bind(this)}, 
                            encounter.title, 
                            React.createElement("div", {className: ("dropdown-menu encounters-list-dropdown " + (this.state.showEncountersList ? '' : 'hidden'))}, 
                                React.createElement("div", {onClick: this.props.onSelectEncounter.bind(this, null)}, 
                                    "Current Fight"
                                ), 

                                EncountersArray.map(function(encounter, i) {
                                    return (
                                        React.createElement("div", {key: i, onClick: this.props.onSelectEncounter.bind(this, i)}, 
                                            encounter.Encounter.title
                                        )
                                    );

                                }.bind(this))
                            )
                        ), 
                        React.createElement("span", {className: "duration"}, 
                            "(", encounter.duration, ")"
                        ), 
                        React.createElement("span", {className: ("arrow " + (this.state.expanded ? 'up' : 'down')), onClick: this.handleExtraDetails.bind(this)})
                    ), 

                    React.createElement("div", {
                        className: "chart-view-switcher", 
                        onClick: this.props.onViewChange}, 
                        this.props.currentView
                    )
                ), 
                React.createElement("div", {className: "extra-details"}, 
                    React.createElement("div", {className: "extra-row damage"}, 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "Damage"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                formatNumber(encounter.damage)
                            )
                        ), 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "DPS"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                formatNumber(encounter.encdps)
                            )
                        ), 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "Crits"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                encounter['crithit%']
                            )
                        ), 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "Miss"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                encounter['misses']
                            )
                        ), 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "Max"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                encounter.maxhit
                            )
                        )
                    ), 
                    React.createElement("div", {className: "extra-row healing"}, 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "Heals"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                formatNumber(encounter.healed)
                            )
                        ), 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "HPS"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                formatNumber(encounter.enchps)
                            )
                        ), 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "Crits"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                encounter['critheal%']
                            )
                        ), 
                        React.createElement("div", {className: "cell"}, 
                            React.createElement("span", {className: "label ff-header"}, "Max"), 
                            React.createElement("span", {className: "value ff-text"}, 
                                encounter.maxheal
                            )
                        )
                    )
                )
            )
        );
    }});


Header.defaultProps = {
    encounter: {},
    onViewChange:function() {},
    onSelectEncounter:function() {},
    onExtraDetailsClick:function() {}
};


var ____Class1v=React.Component;for(var ____Class1v____Key in ____Class1v){if(____Class1v.hasOwnProperty(____Class1v____Key)){Combatants[____Class1v____Key]=____Class1v[____Class1v____Key];}}var ____SuperProtoOf____Class1v=____Class1v===null?null:____Class1v.prototype;Combatants.prototype=Object.create(____SuperProtoOf____Class1v);Combatants.prototype.constructor=Combatants;Combatants.__superConstructor__=____Class1v;function Combatants(){"use strict";if(____Class1v!==null){____Class1v.apply(this,arguments);}}
    Object.defineProperty(Combatants.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps) {"use strict";
        // if data is empty then don't re-render
        if (Object.getOwnPropertyNames(nextProps.data).length === 0) {
            return false;
        }

        return true;
    }});

    Object.defineProperty(Combatants.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        var rows = [];
        var maxRows = 12;
        var isDataArray = _.isArray(this.props.data);
        var dataArray = isDataArray ? this.props.data : Object.keys(this.props.data);
        var limit = Math.max(dataArray.length, maxRows);
        var names = dataArray.slice(0, maxRows-1);
        var maxdps = false;
        var combatant;
        var row;
        var isSelf;
        var rank = 1;
        var stats;

        for (var i = 0; i < names.length; i++) {
            combatant = isDataArray ? this.props.data[i] : this.props.data[names[i]];
            stats = null;

            isSelf = combatant.name === 'YOU' || combatant.name === 'You';

            if (combatant.Job !== "") {
                // should probably fix this
                if (this.props.currentView === 'Healing') {
                    if (parseInt(combatant.healed, 10) > 0) {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.healed);
                        }
                        stats = {
                            job: combatant.Job || '',
                            characterName: combatant.name,
                            total: combatant.healed,
                            totalFormatted: formatNumber(combatant.healed),
                            perSecond: formatNumber(combatant.enchps),
                            additional: combatant['OverHealPct'],
                            percentage: combatant['healed%']
                        }
                    }
                }
                else if (this.props.currentView === 'Tanking') {
                    if (parseInt(combatant.damagetaken, 10) > 0) {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.damagetaken);
                        }
                        stats = {
                            job: combatant.Job || '',
                            characterName: combatant.name,
                            total: combatant.damagetaken,
                            totalFormatted: formatNumber(combatant.damagetaken),
                            perSecond: combatant.ParryPct,
                            percentage: combatant.BlockPct
                        }
                    }
                }
                else {
                    if (!maxdps) {
                        maxdps = parseFloat(combatant.damage);
                    }
                    stats = {
                        job: combatant.Job || '',
                        characterName: combatant.name,
                        total: combatant.damage,
                        totalFormatted: formatNumber(combatant.damage),
                        perSecond: formatNumber(combatant.dps),
                        percentage: combatant['damage%']
                    }
                }

                if (stats) {
                    rows.push(
                        React.createElement(CombatantCompact, React.__spread({
                            onClick: this.props.onClick, 
                            encounterDamage: this.props.encounterDamage, 
                            rank: rank, 
                            data: combatant, 
                            isSelf: isSelf, 
                            key: combatant.name, 
                            max: maxdps}, 
                            stats)
                        )
                    );
                    rank++;
                }
            }

        }

        return (
            React.createElement("ul", {className: "combatants"}, 
                rows
            )
        );
    }});


Combatants.defaultProps = {
    onClick:function() {}
};

var ____Class1w=React.Component;for(var ____Class1w____Key in ____Class1w){if(____Class1w.hasOwnProperty(____Class1w____Key)){DamageMeter[____Class1w____Key]=____Class1w[____Class1w____Key];}}var ____SuperProtoOf____Class1w=____Class1w===null?null:____Class1w.prototype;DamageMeter.prototype=Object.create(____SuperProtoOf____Class1w);DamageMeter.prototype.constructor=DamageMeter;DamageMeter.__superConstructor__=____Class1w;
    function DamageMeter(props) {"use strict";
        ____Class1w.call(this,props);
        this.state = {
            currentViewIndex: 0
        };
    }

    Object.defineProperty(DamageMeter.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps, nextState) {"use strict";
        if (nextProps.parseData.Encounter.encdps === '---') {
            return false;
        }

        if (this.state.currentViewIndex !== nextState.currentViewIndex) {
            return true;
        }

        if (this.state.selectedEncounter) {
            return false;
        }

        return true;
    }});

    Object.defineProperty(DamageMeter.prototype,"componentWillReceiveProps",{writable:true,configurable:true,value:function(nextProps) {"use strict";
        // save this encounter data
        if (this.props.parseData.Encounter.title === 'Encounter' &&
            nextProps.parseData.Encounter.title !== 'Encounter') {
            EncountersArray.unshift({
                Encounter: nextProps.parseData.Encounter,
                Combatant: nextProps.parseData.Combatant
            });

            // Only keep the last 10 fights
            if (EncountersArray.length > 10) {
                EncountersArray.pop();
            }
        }
    }});

    Object.defineProperty(DamageMeter.prototype,"handleCombatRowClick",{writable:true,configurable:true,value:function(e) {"use strict";
    }});

    Object.defineProperty(DamageMeter.prototype,"handleClick",{writable:true,configurable:true,value:function(e) {"use strict";
    }});

    Object.defineProperty(DamageMeter.prototype,"handleViewChange",{writable:true,configurable:true,value:function(e) {"use strict";
        var index = this.state.currentViewIndex;

        if (index > this.props.chartViews.length-2) {
            index = 0;
        }
        else {
            index++;
        }

        this.setState({
            currentViewIndex: index
        });

    }});

    Object.defineProperty(DamageMeter.prototype,"handleSelectEncounter",{writable:true,configurable:true,value:function(index, e) {"use strict";
        if (index >= 0) {
            this.setState({
                selectedEncounter: EncountersArray[index]
            });
        }
        else {
            this.setState({
                selectedEncounter: null
            });
        }
        this.render();
        console.log('handle select', index);
    }});

    Object.defineProperty(DamageMeter.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        var data = this.props.parseData.Combatant;
        var encounterData = this.props.parseData.Encounter;

        if (this.state.selectedEncounter) {
            data = this.state.selectedEncounter.Combatant;
            encounterData = this.state.selectedEncounter.Encounter;
        }
        else {
            // Healing
            // need to resort data if currentView is not damage
            if (this.state.currentViewIndex === 1) {
                data = _.sortBy(_.filter(data, function(d)  {
                    return parseInt(d.healed, 10) > 0;
                }), function(d)  {
                    if (this.state.currentViewIndex === 1) {
                        return -parseInt(d.healed, 10);
                    }
                }.bind(this));
            }
            // Tanking
            else if (this.state.currentViewIndex === 2) {
                data = _.sortBy(_.filter(data, function(d)  {
                    return parseInt(d.damagetaken, 10) > 0;
                }), function(d)  {
                    if (this.state.currentViewIndex === 2) {
                        return -parseInt(d.damagetaken, 10);
                    }
                }.bind(this));
            }
        }

        return (
            React.createElement("div", {
                onClick: this.handleClick, 
                className: 'damage-meter' + (!this.props.parseData.isActive ? ' inactive' : '') + (!this.props.noJobColors ? ' show-job-colors' : '')}, 
                React.createElement(Header, {
                    encounter: encounterData, 
                    onViewChange: this.handleViewChange.bind(this), 
                    onSelectEncounter: this.handleSelectEncounter.bind(this), 
                    currentView: this.props.chartViews[this.state.currentViewIndex]}
                    ), 
                React.createElement(Combatants, {
                    currentView: this.props.chartViews[this.state.currentViewIndex], 
                    onClick: this.handleCombatRowClick, 
                    data: data, 
                    encounterDamage: encounterData.damage})
            )
        );
    }});


DamageMeter.defaultProps = {
    chartViews: [
        'Damage',
        'Healing',
        'Tanking'
    ],
    parseData: {},
    noJobColors: false
};
