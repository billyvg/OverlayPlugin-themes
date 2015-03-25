// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */

var IMAGE_PATH = 'images';

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

var ____Class18=React.Component;for(var ____Class18____Key in ____Class18){if(____Class18.hasOwnProperty(____Class18____Key)){CombatantCompact[____Class18____Key]=____Class18[____Class18____Key];}}var ____SuperProtoOf____Class18=____Class18===null?null:____Class18.prototype;CombatantCompact.prototype=Object.create(____SuperProtoOf____Class18);CombatantCompact.prototype.constructor=CombatantCompact;CombatantCompact.__superConstructor__=____Class18;function CombatantCompact(){"use strict";if(____Class18!==null){____Class18.apply(this,arguments);}}
    Object.defineProperty(CombatantCompact.prototype,"jobImage",{writable:true,configurable:true,value:function(job) {"use strict";
        if (window.JSFIDDLE) {
            return window.GLOW_ICONS[job.toLowerCase()];
        }

        return IMAGE_PATH + '/jobs/' + job + '_glow.png';
    }});

    Object.defineProperty(CombatantCompact.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        //var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
        var width = parseInt(this.props.total / this.props.max * 100, 10) + '%';

        return (
            this.props.perSecond === '---' ? null :
            React.createElement("li", {
                className: 'row ' + this.props.job.toLowerCase() + (this.props.isSelf ? ' self' : ''), 
                onClick: this.props.onClick}, 
                React.createElement("div", {
                    className: "bar", 
                    style: {width: width}}), 
                    React.createElement("div", {className: "text-overlay"}, 
                        React.createElement("span", {className: "job-icon"}, 
                            React.createElement("img", {src: this.jobImage(this.props.job.toLowerCase())})
                        ), 
                        React.createElement("span", {className: "rank"}, 
                            this.props.rank, "."
                        ), 
                        React.createElement("span", {className: "character-name"}, 
                            this.props.characterName
                        ), 
                        React.createElement("span", {className: "character-job"}, 
                            this.props.job
                        ), 
                        React.createElement("div", {className: "damage-stats"}, 
                            React.createElement("span", {className: "damage"}, 
                                formatNumber(this.props.total)
                            ), 
                            "(", 
                            React.createElement("span", {className: "dps"}, 
                                formatNumber(this.props.perSecond), ","
                            ), 

                            React.createElement("span", {className: "damage-percent"}, 
                                this.props.percentage
                            ), 
                            ")"
                        )
                    )
            )
        );
    }});

CombatantCompact.defaultProps = {
    onClick:function() {}
};

var ____Class19=React.Component;for(var ____Class19____Key in ____Class19){if(____Class19.hasOwnProperty(____Class19____Key)){ChartView[____Class19____Key]=____Class19[____Class19____Key];}}var ____SuperProtoOf____Class19=____Class19===null?null:____Class19.prototype;ChartView.prototype=Object.create(____SuperProtoOf____Class19);ChartView.prototype.constructor=ChartView;ChartView.__superConstructor__=____Class19;function ChartView(){"use strict";if(____Class19!==null){____Class19.apply(this,arguments);}}
    Object.defineProperty(ChartView.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        return (
            React.createElement("div", {className: "chart-view"}
            )
        );
    }});


var ____Class1a=React.Component;for(var ____Class1a____Key in ____Class1a){if(____Class1a.hasOwnProperty(____Class1a____Key)){Header[____Class1a____Key]=____Class1a[____Class1a____Key];}}var ____SuperProtoOf____Class1a=____Class1a===null?null:____Class1a.prototype;Header.prototype=Object.create(____SuperProtoOf____Class1a);Header.prototype.constructor=Header;Header.__superConstructor__=____Class1a;function Header(){"use strict";if(____Class1a!==null){____Class1a.apply(this,arguments);}}
	Object.defineProperty(Header.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps) {"use strict";
		if (nextProps.encounter.encdps === '---') {
			return false;
		}

		return true;
	}});

    Object.defineProperty(Header.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        var encounter = this.props.encounter;
        var rdps = parseFloat(encounter.encdps);
        var rdps_max = 0;

        if (!isNaN(rdps) && rdps !== Infinity) {
            rdps_max = Math.max(rdps_max, rdps);
        }

        return (
            React.createElement("div", {className: "encounter-header"}, 
                React.createElement("span", {className: "target-name"}, 
                    encounter.title
                ), 
                React.createElement("span", {className: "dps"}, 
                    "Dmg: ", formatNumber(encounter.damage), " (", formatNumber(encounter.encdps), " dps)"
                ), 
                React.createElement("span", {className: "duration"}, 
                    "- ", encounter.duration
                ), 

                React.createElement("div", {
                    className: "chart-view-switcher", 
                    onClick: this.props.onViewChange}, 
                    this.props.currentView
                )
            )
        );
    }});


Header.defaultProps = {
    encounter: {},
    onViewChange:function() {}
};


var ____Class1b=React.Component;for(var ____Class1b____Key in ____Class1b){if(____Class1b.hasOwnProperty(____Class1b____Key)){Combatants[____Class1b____Key]=____Class1b[____Class1b____Key];}}var ____SuperProtoOf____Class1b=____Class1b===null?null:____Class1b.prototype;Combatants.prototype=Object.create(____SuperProtoOf____Class1b);Combatants.prototype.constructor=Combatants;Combatants.__superConstructor__=____Class1b;function Combatants(){"use strict";if(____Class1b!==null){____Class1b.apply(this,arguments);}}
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
                if (this.props.currentView === 'Healing') {
                    if (parseInt(combatant.healed, 10) > 0) {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.healed);
                        }
                        stats = {
                            job: combatant.Job || '',
                            characterName: combatant.name,
                            total: combatant.healed,
                            perSecond: combatant.enchps,
                            percentage: combatant['healed%']
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
                        perSecond: combatant.dps,
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

var ____Class1c=React.Component;for(var ____Class1c____Key in ____Class1c){if(____Class1c.hasOwnProperty(____Class1c____Key)){DamageMeter[____Class1c____Key]=____Class1c[____Class1c____Key];}}var ____SuperProtoOf____Class1c=____Class1c===null?null:____Class1c.prototype;DamageMeter.prototype=Object.create(____SuperProtoOf____Class1c);DamageMeter.prototype.constructor=DamageMeter;DamageMeter.__superConstructor__=____Class1c;
    function DamageMeter(props) {"use strict";
        ____Class1c.call(this,props);
        this.state = {
            currentViewIndex: 0
        };
    }

	Object.defineProperty(DamageMeter.prototype,"shouldComponentUpdate",{writable:true,configurable:true,value:function(nextProps, nextState) {"use strict";
		return true;
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

    Object.defineProperty(DamageMeter.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        var data = this.props.parseData.Combatant;

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

        return (
			this.props.parseData.Encounter.encdps === '---' ? React.createElement("h3", null, "Awaiting Data") :
            React.createElement("div", {
                onClick: this.handleClick, 
                className: 'damage-meter' + (!this.props.parseData.isActive ? ' inactive' : '') + (!this.props.noJobColors ? ' show-job-colors' : '')}, 
                React.createElement(Header, {
                    encounter: this.props.parseData.Encounter, 
                    onViewChange: this.handleViewChange.bind(this), 
                    currentView: this.props.chartViews[this.state.currentViewIndex]}
                    ), 
                React.createElement(Combatants, {
                    currentView: this.props.chartViews[this.state.currentViewIndex], 
                    onClick: this.handleCombatRowClick, 
                    data: data, 
                    encounterDamage: this.props.parseData.Encounter.damage})
            )
        );
    }});


DamageMeter.defaultProps = {
    chartViews: [
        'Damage',
        'Healing',
        'Detailed'
    ],
    parseData: {},
    noJobColors: false
};
