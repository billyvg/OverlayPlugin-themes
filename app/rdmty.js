'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */
// If you need a handy tool to transpile your JSX: https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=Q
var IMAGE_PATH = 'images';
var EncountersArray = [];

var React = window.React;

var formatNumber = function formatNumber(number) {
    number = parseFloat(number, 10);

    if (number >= 1000) {
        return (number / 1000).toFixed(2) + 'K';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + 'M';
    }

    return number.toFixed(2);
};

var CombatantCompact = function (_React$Component) {
    _inherits(CombatantCompact, _React$Component);

    function CombatantCompact() {
        _classCallCheck(this, CombatantCompact);

        return _possibleConstructorReturn(this, (CombatantCompact.__proto__ || Object.getPrototypeOf(CombatantCompact)).apply(this, arguments));
    }

    _createClass(CombatantCompact, [{
        key: 'jobImage',
        value: function jobImage(job) {
            if (window.JSFIDDLE) {
                return window.GLOW_ICONS[job.toLowerCase()];
            }

            return IMAGE_PATH + '/default/' + job.toLowerCase() + '.png';
        }
    }, {
        key: 'render',
        value: function render() {
            //var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
            var width = Math.min(100, parseInt(this.props.total / this.props.max * 100, 10)) + '%';

            return this.props.perSecond === '---' ? null : React.createElement(
                'li',
                {
                    className: 'row ' + this.props.job.toLowerCase() + (this.props.isSelf ? ' self' : ''),
                    onClick: this.props.onClick },
                React.createElement('div', {
                    className: 'bar',
                    style: { width: width } }),
                React.createElement(
                    'div',
                    { className: 'text-overlay' },
                    React.createElement(
                        'div',
                        { className: 'stats' },
                        React.createElement(
                            'span',
                            { className: 'total' },
                            this.props.totalFormatted
                        ),
                        this.props.additional ? React.createElement(
                            'span',
                            { className: 'additional' },
                            '[',
                            this.props.additional,
                            ']'
                        ) : null,
                        '(',
                        React.createElement(
                            'span',
                            { className: 'ps' },
                            this.props.perSecond,
                            ','
                        ),
                        React.createElement(
                            'span',
                            { className: 'percent' },
                            this.props.percentage
                        ),
                        ')'
                    ),
                    React.createElement(
                        'div',
                        { className: 'info' },
                        React.createElement(
                            'span',
                            { className: 'job-icon' },
                            React.createElement('img', { src: this.jobImage(this.props.job) })
                        ),
                        React.createElement(
                            'span',
                            { className: 'rank' },
                            this.props.rank,
                            '.'
                        ),
                        React.createElement(
                            'span',
                            { className: 'character-name' },
                            this.props.characterName
                        ),
                        React.createElement(
                            'span',
                            { className: 'character-job' },
                            this.props.job
                        )
                    )
                )
            );
        }
    }]);

    return CombatantCompact;
}(React.Component);

CombatantCompact.defaultProps = {
    onClick: function onClick() {}
};

var ChartView = function (_React$Component2) {
    _inherits(ChartView, _React$Component2);

    function ChartView() {
        _classCallCheck(this, ChartView);

        return _possibleConstructorReturn(this, (ChartView.__proto__ || Object.getPrototypeOf(ChartView)).apply(this, arguments));
    }

    _createClass(ChartView, [{
        key: 'render',
        value: function render() {
            return React.createElement('div', { className: 'chart-view' });
        }
    }]);

    return ChartView;
}(React.Component);

var Header = function (_React$Component3) {
    _inherits(Header, _React$Component3);

    function Header(props) {
        _classCallCheck(this, Header);

        var _this3 = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

        _this3.state = {
            expanded: false,
            group: true,
            showEncountersList: false
        };
        _this3.handleEndEncounter = _this3.handleEndEncounter.bind(_this3);
        return _this3;
    }

    _createClass(Header, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            // WIll need to add a null check here if we are swapping betwen self and group.
            // Possibly more null checks as well.
            if (nextProps.encounter.encdps === '---') {
                return false;
            }
            return true;
        }
    }, {
        key: 'handleExtraDetails',
        value: function handleExtraDetails(e) {
            this.props.onExtraDetailsClick(e);

            this.setState({
                expanded: !this.state.expanded
            });
        }

        /**
         * Show dropdown for list of encounters
         */

    }, {
        key: 'handleEncounterClick',
        value: function handleEncounterClick(e) {
            this.setState({
                showEncountersList: !this.state.showEncountersList
            });
        }

        /**
         * Toggle between group and indidivual stats.
         */

    }, {
        key: 'handleToggleStats',
        value: function handleToggleStats(e) {
            this.setState({
                group: !this.state.group
            });
        }
    }, {
        key: 'handleEndEncounter',
        value: function handleEndEncounter() {
            if (OverlayPluginApi != undefined) {
                OverlayPluginApi.endEncounter();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var data = this.props.data;
            var encounter = this.props.encounter;
            var self = data['YOU'];

            var rdps = parseFloat(encounter.encdps);
            var rdps_max = 0;
            if (!isNaN(rdps) && rdps !== Infinity) {
                rdps_max = Math.max(rdps_max, rdps);
            }

            // This is the switcher for Toggling group info or self info
            var DataSource = this.state.group ? encounter : self;
            if (self == undefined) {
                DataSource = encounter;
            }
            // Calculate the drect hit % based off of the combatant list. This is not efficient and needs to be removed
            // Once the encounter object is fixed to properly include this info.
            var datalength = 0;
            var DirectHitPct = 0;
            var CritDirectHitPct = 0;
            if (this.state.group) {
                if (data !== undefined) {
                    for (var x in data) {
                        if (!data.hasOwnProperty(x)) continue;
                        DirectHitPct += parseFloat(data[x].DirectHitPct.substring(0, data[x].DirectHitPct.length - 1));
                        CritDirectHitPct += parseFloat(data[x].CritDirectHitPct.substring(0, data[x].CritDirectHitPct.length - 1));
                        datalength++;
                    }
                    if (DirectHitPct > 0) {
                        DirectHitPct = parseFloat(DirectHitPct / datalength);
                    }
                    if (CritDirectHitPct > 0) {
                        CritDirectHitPct = parseFloat(CritDirectHitPct / datalength);
                    }
                }
            } else {
                if (self != undefined) {
                    DirectHitPct = self.DirectHitPct;
                    CritDirectHitPct = self.CritDirectHitPct;
                }
            }

            return React.createElement(
                'div',
                { className: 'header ' + (this.state.expanded ? '' : 'collapsed') },
                React.createElement(
                    'div',
                    { className: 'encounter-header' },
                    React.createElement(
                        'div',
                        { className: 'encounter-data ff-header' },
                        React.createElement(
                            'span',
                            { className: 'target-name dropdown-parent', onClick: this.handleEncounterClick.bind(this) },
                            encounter.title,
                            React.createElement(
                                'div',
                                { className: 'dropdown-menu encounters-list-dropdown ' + (this.state.showEncountersList ? '' : 'hidden') },
                                React.createElement(
                                    'div',
                                    { onClick: this.props.onSelectEncounter.bind(this, null) },
                                    'Current Fight'
                                ),
                                EncountersArray.map(function (encounter, i) {
                                    return React.createElement(
                                        'div',
                                        { key: i, onClick: this.props.onSelectEncounter.bind(this, i) },
                                        encounter.Encounter.title
                                    );
                                }.bind(this))
                            )
                        ),
                        React.createElement(
                            'span',
                            { className: 'duration' },
                            '(',
                            encounter.duration,
                            ')'
                        ),
                        React.createElement('span', { className: 'arrow ' + (this.state.expanded ? 'up' : 'down'), onClick: this.handleExtraDetails.bind(this) })
                    ),
                    React.createElement(
                        'div',
                        {
                            className: 'chart-view-switcher',
                            onClick: this.props.onViewChange,
                            style: { float: 'right' } },
                        this.props.currentView
                    ),
                    React.createElement(
                        'div',
                        {
                            className: 'ff-header',
                            onClick: this.handleEndEncounter,
                            style: { float: 'right' } },
                        'End Encounter'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'extra-details' },
                    this.props.currentView == "Damage" ? React.createElement(
                        'div',
                        { className: 'data-set-view-switcher clearfix', onClick: this.handleToggleStats.bind(this) },
                        React.createElement(
                            'span',
                            { className: 'data-set-option ' + (this.state.group ? 'active' : '') },
                            'G'
                        ),
                        React.createElement(
                            'span',
                            { className: 'data-set-option ' + (!this.state.group ? 'active' : '') },
                            'I'
                        )
                    ) : null,
                    React.createElement(
                        'div',
                        { className: 'extra-row damage' },
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Damage'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                formatNumber(DataSource.damage) + ' (' + formatNumber(DataSource.encdps) + ')'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Max'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                DataSource.maxhit
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'extra-row damage' },
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Crit%'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                formatNumber(parseFloat(DataSource.crithits / DataSource.hits * 100)) + "%"
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Misses'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                encounter.misses
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Direct%'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                formatNumber(DirectHitPct) + "%"
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'DirectCrit%'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                formatNumber(CritDirectHitPct) + "%"
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'extra-row healing' },
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Heals'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                formatNumber(DataSource.healed) + ' (' + formatNumber(DataSource.enchps) + ')'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Crit%'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                DataSource['critheal%']
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'cell' },
                            React.createElement(
                                'span',
                                { className: 'label ff-header' },
                                'Max'
                            ),
                            React.createElement(
                                'span',
                                { className: 'value ff-text' },
                                DataSource.maxheal
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Header;
}(React.Component);

Header.defaultProps = {
    encounter: {},
    onViewChange: function onViewChange() {},
    onSelectEncounter: function onSelectEncounter() {},
    onExtraDetailsClick: function onExtraDetailsClick() {}
};

var Combatants = function (_React$Component4) {
    _inherits(Combatants, _React$Component4);

    function Combatants() {
        _classCallCheck(this, Combatants);

        return _possibleConstructorReturn(this, (Combatants.__proto__ || Object.getPrototypeOf(Combatants)).apply(this, arguments));
    }

    _createClass(Combatants, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            // if data is empty then don't re-render
            if (Object.getOwnPropertyNames(nextProps.data).length === 0) {
                return false;
            }

            return true;
        }
    }, {
        key: 'render',
        value: function render() {
            var rows = [];
            var maxRows = 12;
            var isDataArray = _.isArray(this.props.data);
            var dataArray = isDataArray ? this.props.data : Object.keys(this.props.data);
            var limit = Math.max(dataArray.length, maxRows);
            var names = dataArray.slice(0, maxRows - 1);
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
                            };
                        }
                    } else if (this.props.currentView === 'Tanking') {
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
                            };
                        }
                    } else {
                        if (!maxdps) {
                            maxdps = parseFloat(combatant.damage);
                        }
                        stats = {
                            job: combatant.Job || '',
                            characterName: combatant.name,
                            total: combatant.damage,
                            totalFormatted: formatNumber(combatant.damage),
                            perSecond: formatNumber(combatant.encdps),
                            percentage: combatant['damage%']
                        };
                    }

                    if (stats) {
                        rows.push(React.createElement(CombatantCompact, _extends({
                            onClick: this.props.onClick,
                            encounterDamage: this.props.encounterDamage,
                            rank: rank,
                            data: combatant,
                            isSelf: isSelf,
                            key: combatant.name,
                            max: maxdps
                        }, stats)));
                        rank++;
                    }
                }
            }

            return React.createElement(
                'ul',
                { className: 'combatants' },
                rows
            );
        }
    }]);

    return Combatants;
}(React.Component);

Combatants.defaultProps = {
    onClick: function onClick() {}
};

var DamageMeter = function (_React$Component5) {
    _inherits(DamageMeter, _React$Component5);

    function DamageMeter(props) {
        _classCallCheck(this, DamageMeter);

        var _this5 = _possibleConstructorReturn(this, (DamageMeter.__proto__ || Object.getPrototypeOf(DamageMeter)).call(this, props));

        _this5.state = {
            currentViewIndex: 0
        };
        return _this5;
    }

    _createClass(DamageMeter, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
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
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            // save this encounter data
            if (this.props.parseData.Encounter.title === 'Encounter' && nextProps.parseData.Encounter.title !== 'Encounter') {
                EncountersArray.unshift({
                    Encounter: nextProps.parseData.Encounter,
                    Combatant: nextProps.parseData.Combatant
                });

                // Only keep the last 10 fights
                if (EncountersArray.length > 10) {
                    EncountersArray.pop();
                }
            }
        }
    }, {
        key: 'handleCombatRowClick',
        value: function handleCombatRowClick(e) {}
    }, {
        key: 'handleClick',
        value: function handleClick(e) {}
    }, {
        key: 'handleViewChange',
        value: function handleViewChange(e) {
            var index = this.state.currentViewIndex;

            if (index > this.props.chartViews.length - 2) {
                index = 0;
            } else {
                index++;
            }

            this.setState({
                currentViewIndex: index
            });
        }
    }, {
        key: 'handleSelectEncounter',
        value: function handleSelectEncounter(index, e) {
            if (index >= 0) {
                this.setState({
                    selectedEncounter: EncountersArray[index]
                });
            } else {
                this.setState({
                    selectedEncounter: null
                });
            }
            this.render();
            console.log('handle select', index);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var debug = false;
            var data = this.props.parseData.Combatant;
            var encounterData = this.props.parseData.Encounter;

            if (this.state.selectedEncounter) {
                data = this.state.selectedEncounter.Combatant;
                encounterData = this.state.selectedEncounter.Encounter;
            } else {
                // Healing
                // need to resort data if currentView is not damage
                if (this.state.currentViewIndex === 1) {
                    data = _.sortBy(_.filter(data, function (d) {
                        return parseInt(d.healed, 10) > 0;
                    }), function (d) {
                        if (_this6.state.currentViewIndex === 1) {
                            return -parseInt(d.healed, 10);
                        }
                    });
                }
                // Tanking
                else if (this.state.currentViewIndex === 2) {
                        data = _.sortBy(_.filter(data, function (d) {
                            return parseInt(d.damagetaken, 10) > 0;
                        }), function (d) {
                            if (_this6.state.currentViewIndex === 2) {
                                return -parseInt(d.damagetaken, 10);
                            }
                        });
                    }
            }

            return React.createElement(
                'div',
                {
                    onClick: this.handleClick,
                    className: 'damage-meter' + (!this.props.parseData.isActive ? ' inactive' : '') + (!this.props.noJobColors ? ' show-job-colors' : '') },
                React.createElement(Header, {
                    encounter: encounterData,
                    data: data,
                    onViewChange: this.handleViewChange.bind(this),
                    onSelectEncounter: this.handleSelectEncounter.bind(this),
                    currentView: this.props.chartViews[this.state.currentViewIndex]
                }),
                React.createElement(Combatants, {
                    currentView: this.props.chartViews[this.state.currentViewIndex],
                    onClick: this.handleCombatRowClick,
                    data: data,
                    encounterDamage: encounterData.damage }),
                !debug ? null : React.createElement(
                    'div',
                    null,
                    React.createElement(Debugger, { data: this.props.parseData })
                )
            );
        }
    }]);

    return DamageMeter;
}(React.Component);

DamageMeter.defaultProps = {
    chartViews: ['Damage', 'Healing', 'Tanking'],
    parseData: {},
    noJobColors: false
};

var Debugger = function (_React$Component6) {
    _inherits(Debugger, _React$Component6);

    function Debugger(props) {
        _classCallCheck(this, Debugger);

        return _possibleConstructorReturn(this, (Debugger.__proto__ || Object.getPrototypeOf(Debugger)).call(this, props));
    }

    _createClass(Debugger, [{
        key: 'render',
        value: function render() {
            var css = {
                overflowY: 'scroll',
                maxHeight: '250px'
            };
            return React.createElement(
                'pre',
                { style: css },
                JSON.stringify(this.props.data, null, 2)
            );
        }
    }]);

    return Debugger;
}(React.Component);