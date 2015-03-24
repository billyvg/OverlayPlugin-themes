// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */

var IMAGE_PATH = 'images';

var React = window.React;

var formatNumber = function(number)  {
    number = parseInt(number, 10);

    if (number >= 1000) {
        return Math.round(number / 1000) + 'K';
    }
    else if (number >= 1000000) {
        return Math.round(number / 1000000) + 'K';
    }

    return number;
};

var ____Class0=React.Component;for(var ____Class0____Key in ____Class0){if(____Class0.hasOwnProperty(____Class0____Key)){CombatantCompact[____Class0____Key]=____Class0[____Class0____Key];}}var ____SuperProtoOf____Class0=____Class0===null?null:____Class0.prototype;CombatantCompact.prototype=Object.create(____SuperProtoOf____Class0);CombatantCompact.prototype.constructor=CombatantCompact;CombatantCompact.__superConstructor__=____Class0;function CombatantCompact(){"use strict";if(____Class0!==null){____Class0.apply(this,arguments);}}
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
                                this.props.perSecond, ","
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

var ____Class1=React.Component;for(var ____Class1____Key in ____Class1){if(____Class1.hasOwnProperty(____Class1____Key)){ChartView[____Class1____Key]=____Class1[____Class1____Key];}}var ____SuperProtoOf____Class1=____Class1===null?null:____Class1.prototype;ChartView.prototype=Object.create(____SuperProtoOf____Class1);ChartView.prototype.constructor=ChartView;ChartView.__superConstructor__=____Class1;function ChartView(){"use strict";if(____Class1!==null){____Class1.apply(this,arguments);}}
    Object.defineProperty(ChartView.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        return (
            React.createElement("div", {className: "chart-view"}
            )
        );
    }});


var ____Class2=React.Component;for(var ____Class2____Key in ____Class2){if(____Class2.hasOwnProperty(____Class2____Key)){Header[____Class2____Key]=____Class2[____Class2____Key];}}var ____SuperProtoOf____Class2=____Class2===null?null:____Class2.prototype;Header.prototype=Object.create(____SuperProtoOf____Class2);Header.prototype.constructor=Header;Header.__superConstructor__=____Class2;function Header(){"use strict";if(____Class2!==null){____Class2.apply(this,arguments);}}
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


var ____Class3=React.Component;for(var ____Class3____Key in ____Class3){if(____Class3.hasOwnProperty(____Class3____Key)){Combatants[____Class3____Key]=____Class3[____Class3____Key];}}var ____SuperProtoOf____Class3=____Class3===null?null:____Class3.prototype;Combatants.prototype=Object.create(____SuperProtoOf____Class3);Combatants.prototype.constructor=Combatants;Combatants.__superConstructor__=____Class3;function Combatants(){"use strict";if(____Class3!==null){____Class3.apply(this,arguments);}}
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

            console.log(combatant);
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

var ____Class4=React.Component;for(var ____Class4____Key in ____Class4){if(____Class4.hasOwnProperty(____Class4____Key)){DamageMeter[____Class4____Key]=____Class4[____Class4____Key];}}var ____SuperProtoOf____Class4=____Class4===null?null:____Class4.prototype;DamageMeter.prototype=Object.create(____SuperProtoOf____Class4);DamageMeter.prototype.constructor=DamageMeter;DamageMeter.__superConstructor__=____Class4;
    function DamageMeter(props) {"use strict";
        ____Class4.call(this,props);
        this.state = {
            currentViewIndex: 0
        };
    }

    Object.defineProperty(DamageMeter.prototype,"handleCombatRowClick",{writable:true,configurable:true,value:function(e) {"use strict";
        console.log('Row clicked');
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
