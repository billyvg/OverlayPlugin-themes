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

var ____Classf=React.Component;for(var ____Classf____Key in ____Classf){if(____Classf.hasOwnProperty(____Classf____Key)){CombatantCompact[____Classf____Key]=____Classf[____Classf____Key];}}var ____SuperProtoOf____Classf=____Classf===null?null:____Classf.prototype;CombatantCompact.prototype=Object.create(____SuperProtoOf____Classf);CombatantCompact.prototype.constructor=CombatantCompact;CombatantCompact.__superConstructor__=____Classf;function CombatantCompact(){"use strict";if(____Classf!==null){____Classf.apply(this,arguments);}}
    Object.defineProperty(CombatantCompact.prototype,"jobImage",{writable:true,configurable:true,value:function(job) {"use strict";
        if (window.JSFIDDLE) {
            return window.GLOW_ICONS[job.toLowerCase()];
        }

        return IMAGE_PATH + '/jobs/glow/' + job.toLowerCase() + '.png';
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
                        ), 
                        React.createElement("div", {className: "stats"}, 
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

var ____Classg=React.Component;for(var ____Classg____Key in ____Classg){if(____Classg.hasOwnProperty(____Classg____Key)){ChartView[____Classg____Key]=____Classg[____Classg____Key];}}var ____SuperProtoOf____Classg=____Classg===null?null:____Classg.prototype;ChartView.prototype=Object.create(____SuperProtoOf____Classg);ChartView.prototype.constructor=ChartView;ChartView.__superConstructor__=____Classg;function ChartView(){"use strict";if(____Classg!==null){____Classg.apply(this,arguments);}}
    Object.defineProperty(ChartView.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        return (
            React.createElement("div", {className: "chart-view"}
            )
        );
    }});


var ____Classh=React.Component;for(var ____Classh____Key in ____Classh){if(____Classh.hasOwnProperty(____Classh____Key)){Header[____Classh____Key]=____Classh[____Classh____Key];}}var ____SuperProtoOf____Classh=____Classh===null?null:____Classh.prototype;Header.prototype=Object.create(____SuperProtoOf____Classh);Header.prototype.constructor=Header;Header.__superConstructor__=____Classh;
    function Header(props) {"use strict";
        ____Classh.call(this,props);
        this.state = {
            expanded: false
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
                        React.createElement("span", {className: "target-name"}, 
                            encounter.title
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
    onExtraDetailsClick:function() {}
};


var ____Classi=React.Component;for(var ____Classi____Key in ____Classi){if(____Classi.hasOwnProperty(____Classi____Key)){Combatants[____Classi____Key]=____Classi[____Classi____Key];}}var ____SuperProtoOf____Classi=____Classi===null?null:____Classi.prototype;Combatants.prototype=Object.create(____SuperProtoOf____Classi);Combatants.prototype.constructor=Combatants;Combatants.__superConstructor__=____Classi;function Combatants(){"use strict";if(____Classi!==null){____Classi.apply(this,arguments);}}
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

var ____Classj=React.Component;for(var ____Classj____Key in ____Classj){if(____Classj.hasOwnProperty(____Classj____Key)){DamageMeter[____Classj____Key]=____Classj[____Classj____Key];}}var ____SuperProtoOf____Classj=____Classj===null?null:____Classj.prototype;DamageMeter.prototype=Object.create(____SuperProtoOf____Classj);DamageMeter.prototype.constructor=DamageMeter;DamageMeter.__superConstructor__=____Classj;
    function DamageMeter(props) {"use strict";
        ____Classj.call(this,props);
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
        'Healing'
    ],
    parseData: {},
    noJobColors: false
};
