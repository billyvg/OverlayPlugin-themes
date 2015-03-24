// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */

var IMAGE_PATH = 'images';

var React = window.React;

var formatNumber = (number) => {
    number = parseFloat(number, 10);

    if (number >= 1000) {
        return (number / 1000).toFixed(2) + 'K';
    }
    else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + 'K';
    }

    return number.toFixed(2);
};

class CombatantCompact extends React.Component {
    jobImage(job) {
        if (window.JSFIDDLE) {
            return window.GLOW_ICONS[job.toLowerCase()];
        }

        return IMAGE_PATH + '/jobs/' + job + '_glow.png';
    }

    render() {
        //var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
        var width = parseInt(this.props.total / this.props.max * 100, 10) + '%';

        return (
            this.props.perSecond === '---' ? null :
            <li
                className={'row ' + this.props.job.toLowerCase() + (this.props.isSelf ? ' self' : '')}
                onClick={this.props.onClick}>
                <div
                    className='bar'
                    style={{width: width}} />
                    <div className="text-overlay">
                        <span className='job-icon'>
                            <img src={this.jobImage(this.props.job.toLowerCase())} />
                        </span>
                        <span className="rank">
                            {this.props.rank}.
                        </span>
                        <span className="character-name">
                            {this.props.characterName}
                        </span>
                        <span className="character-job">
                            {this.props.job}
                        </span>
                        <div className="damage-stats">
                            <span className="damage">
                                {formatNumber(this.props.total)}
                            </span>
                            (
                            <span className="dps">
                                {formatNumber(this.props.perSecond)},
                            </span>

                            <span className="damage-percent">
                                {this.props.percentage}
                            </span>
                            )
                        </div>
                    </div>
            </li>
        );
    }
}
CombatantCompact.defaultProps = {
    onClick() {}
};

class ChartView extends React.Component {
    render() {
        return (
            <div className="chart-view">
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        var encounter = this.props.encounter;
        var rdps = parseFloat(encounter.encdps);
        var rdps_max = 0;

        if (!isNaN(rdps) && rdps !== Infinity) {
            rdps_max = Math.max(rdps_max, rdps);
        }

        return (
            <div className="encounter-header">
                <span className="target-name">
                    {encounter.title}
                </span>
                <span className="dps">
                    Dmg: {formatNumber(encounter.damage)} ({formatNumber(encounter.encdps)} dps)
                </span>
                <span className="duration">
                    - {encounter.duration}
                </span>

                <div
                    className="chart-view-switcher"
                    onClick={this.props.onViewChange}>
                    {this.props.currentView}
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    encounter: {},
    onViewChange() {}
};


class Combatants extends React.Component {
    shouldComponentUpdate(nextProps) {
        // if data is empty then don't re-render
        if (Object.getOwnPropertyNames(nextProps.data).length === 0) {
            return false;
        }

        return true;
    }

    render() {
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
                        <CombatantCompact
                            onClick={this.props.onClick}
                            encounterDamage={this.props.encounterDamage}
                            rank={rank}
                            data={combatant}
                            isSelf={isSelf}
                            key={combatant.name}
                            max={maxdps}
                            {...stats}
                        />
                    );
                    rank++;
                }
            }

        }

        return (
            <ul className="combatants">
                {rows}
            </ul>
        );
    }
}

Combatants.defaultProps = {
    onClick() {}
};

class DamageMeter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentViewIndex: 0
        };
    }

    handleCombatRowClick(e) {
        console.log('Row clicked');
    }

    handleClick(e) {
    }

    handleViewChange(e) {
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

    }

    render() {
        var data = this.props.parseData.Combatant;

        // need to resort data if currentView is not damage
        if (this.state.currentViewIndex === 1) {
            data = _.sortBy(_.filter(data, (d) => {
                return parseInt(d.healed, 10) > 0;
            }), (d) => {
                if (this.state.currentViewIndex === 1) {
                    return -parseInt(d.healed, 10);
                }
            });
        }

        return (
            <div
                onClick={this.handleClick}
                className={'damage-meter' + (!this.props.parseData.isActive ? ' inactive' : '') + (!this.props.noJobColors ? ' show-job-colors' : '')}>
                <Header
                    encounter={this.props.parseData.Encounter}
                    onViewChange={this.handleViewChange.bind(this)}
                    currentView={this.props.chartViews[this.state.currentViewIndex]}
                    />
                <Combatants
                    currentView={this.props.chartViews[this.state.currentViewIndex]}
                    onClick={this.handleCombatRowClick}
                    data={data}
                    encounterDamage={this.props.parseData.Encounter.damage} />
            </div>
        );
    }
}

DamageMeter.defaultProps = {
    chartViews: [
        'Damage',
        'Healing',
        'Detailed'
    ],
    parseData: {},
    noJobColors: false
};
