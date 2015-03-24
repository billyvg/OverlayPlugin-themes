// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */

var IMAGE_PATH = 'images';

var React = window.React;

var ____Class2P=React.Component;for(var ____Class2P____Key in ____Class2P){if(____Class2P.hasOwnProperty(____Class2P____Key)){CombatantCompact[____Class2P____Key]=____Class2P[____Class2P____Key];}}var ____SuperProtoOf____Class2P=____Class2P===null?null:____Class2P.prototype;CombatantCompact.prototype=Object.create(____SuperProtoOf____Class2P);CombatantCompact.prototype.constructor=CombatantCompact;CombatantCompact.__superConstructor__=____Class2P;function CombatantCompact(){"use strict";if(____Class2P!==null){____Class2P.apply(this,arguments);}}
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
                            (this.props.rank + ". ")
                        ), 
                        React.createElement("span", {className: "character-name"}, 
                            this.props.characterName
                        ), 
                        React.createElement("span", {className: "character-job"}, 
                            this.props.job
                        ), 
                        React.createElement("div", {className: "damage-stats"}, 
                            React.createElement("span", {className: "damage"}, 
                                this.props.total
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

var ____Class2Q=React.Component;for(var ____Class2Q____Key in ____Class2Q){if(____Class2Q.hasOwnProperty(____Class2Q____Key)){ChartView[____Class2Q____Key]=____Class2Q[____Class2Q____Key];}}var ____SuperProtoOf____Class2Q=____Class2Q===null?null:____Class2Q.prototype;ChartView.prototype=Object.create(____SuperProtoOf____Class2Q);ChartView.prototype.constructor=ChartView;ChartView.__superConstructor__=____Class2Q;function ChartView(){"use strict";if(____Class2Q!==null){____Class2Q.apply(this,arguments);}}
    Object.defineProperty(ChartView.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        return (
            React.createElement("div", {className: "chart-view"}
            )
        );
    }});


var ____Class2R=React.Component;for(var ____Class2R____Key in ____Class2R){if(____Class2R.hasOwnProperty(____Class2R____Key)){Header[____Class2R____Key]=____Class2R[____Class2R____Key];}}var ____SuperProtoOf____Class2R=____Class2R===null?null:____Class2R.prototype;Header.prototype=Object.create(____SuperProtoOf____Class2R);Header.prototype.constructor=Header;Header.__superConstructor__=____Class2R;function Header(){"use strict";if(____Class2R!==null){____Class2R.apply(this,arguments);}}
    Object.defineProperty(Header.prototype,"render",{writable:true,configurable:true,value:function() {"use strict";
        let encounter = this.props.encounter;
        var dps = encounter.encdps.length <= 7 ? encounter.encdps : encounter.ENCDPS;
        var rdps = parseFloat(encounter.encdps);
        var rdps_max = 0;

        if (!isNaN(rdps) && rdps !== Infinity) {
            rdps_max = Math.max(rdps_max, rdps);
        }

        var width = (rdps / rdps_max) * 100;

        return (
            React.createElement("div", {className: "encounter-header"}, 
                React.createElement("span", {className: "target-name"}, 
                    encounter.title
                ), 
                React.createElement("span", {className: "duration"}, 
                    "(", encounter.duration, ")"
                ), 

                React.createElement("div", {
                    className: "chart-view-switcher", 
                    onClick: this.props.onViewChange}, 
                    this.props.currentView
                )
            )
        );
    }});
;

Header.defaultProps = {
    encounter: {},
    onViewChange:function() {}
}


var ____Class2S=React.Component;for(var ____Class2S____Key in ____Class2S){if(____Class2S.hasOwnProperty(____Class2S____Key)){Combatants[____Class2S____Key]=____Class2S[____Class2S____Key];}}var ____SuperProtoOf____Class2S=____Class2S===null?null:____Class2S.prototype;Combatants.prototype=Object.create(____SuperProtoOf____Class2S);Combatants.prototype.constructor=Combatants;Combatants.__superConstructor__=____Class2S;function Combatants(){"use strict";if(____Class2S!==null){____Class2S.apply(this,arguments);}}
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

var ____Class2T=React.Component;for(var ____Class2T____Key in ____Class2T){if(____Class2T.hasOwnProperty(____Class2T____Key)){DamageMeter[____Class2T____Key]=____Class2T[____Class2T____Key];}}var ____SuperProtoOf____Class2T=____Class2T===null?null:____Class2T.prototype;DamageMeter.prototype=Object.create(____SuperProtoOf____Class2T);DamageMeter.prototype.constructor=DamageMeter;DamageMeter.__superConstructor__=____Class2T;
    function DamageMeter(props) {"use strict";
        ____Class2T.call(this,props);
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
