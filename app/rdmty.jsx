// fiddle: http://jsfiddle.net/v1ddnsvh/8/
/* global window */
// If you need a handy tool to transpile your JSX: https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&targets=&browsers=&builtIns=false&debug=false&code_lz=Q
var IMAGE_PATH = 'images';
var EncountersArray = [];

var React = window.React;

var formatNumber = (number) => {
    number = parseFloat(number, 10);

    if (number >= 1000) {
        return (number / 1000).toFixed(2) + 'K';
    }
    else if (number >= 1000000) {
        return (number / 1000000).toFixed(2) + 'M';
    }

    return number.toFixed(2);
};
class CombatantCompact extends React.Component {
    jobImage(job) {
        if (window.JSFIDDLE) {
            return window.GLOW_ICONS[job.toLowerCase()];
        }

        return IMAGE_PATH + '/default/' + job.toLowerCase() + '.png';
    }

    render() {
        //var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
        var width = Math.min(100, parseInt(this.props.total / this.props.max * 100, 10)) + '%';

        return (
            this.props.perSecond === '---' ? null :
            <li
                className={'row ' + this.props.job.toLowerCase() + (this.props.isSelf ? ' self' : '')}
                onClick={this.props.onClick}>
                <div
                    className='bar'
                    style={{width: width}} />
                    <div className="text-overlay">
                        <div className="stats">
                            <span className="total">
                                {this.props.totalFormatted}
                            </span>

                            {this.props.additional ?
                            <span className="additional">
                                [{this.props.additional}]
                            </span> : null }


                            (
                            <span className="ps">
                                {this.props.perSecond},
                            </span>

                            <span className="percent">
                                {this.props.percentage}
                            </span>
                            )
                        </div>
                        <div className="info">
                            <span className='job-icon'>
                                <img src={this.jobImage(this.props.job)} />
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
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            group: true,
            showEncountersList: false
        };
    }

    shouldComponentUpdate(nextProps) {
        // WIll need to add a null check here if we are swapping betwen self and group.
        // Possibly more null checks as well.
        if (nextProps.encounter.encdps === '---') {
            return false;
        }
        return true;
    }

    handleExtraDetails(e) {
        this.props.onExtraDetailsClick(e);

        this.setState({
            expanded: !this.state.expanded
        });
    }

    /**
     * Show dropdown for list of encounters
     */
    handleEncounterClick(e) {
        this.setState({
            showEncountersList: !this.state.showEncountersList
        });
    }


    /**
     * Toggle between group and indidivual stats.
     */
    handleToggleStats(e){
      this.setState({
        group: !this.state.group
      })
    }


    render() {
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
        if (self == undefined){
          DataSource = encounter;
        }
        // Calculate the drect hit % based off of the combatant list. This is not efficient and needs to be removed
        // Once the encounter object is fixed to properly include this info.
        var datalength = 0;
        var DirectHitPct = 0
        var CritDirectHitPct = 0;

        if (this.state.group){
          if (data.length > 0){
            for (var x in data){
              if(!data.hasOwnProperty(x)) continue;
              DirectHitPct += parseFloat(data[x].DirectHitPct.substring(0, (data[x].DirectHitPct.length - 1)));
              CritDirectHitPct += parseFloat(data[x].CritDirectHitPct.substring(0, (data[x].CritDirectHitPct.length - 1)));
              datalength++;
            }
          }
          if ( DirectHitPct > 0 ){
              DirectHitPct = parseFloat( DirectHitPct / datalength);
          }
          if (CritDirectHitPct > 0){
            CritDirectHitPct = parseFloat( CritDirectHitPct / datalength);
          }
        } else {
          if (self != undefined){
            DirectHitPct = self.DirectHitPct;
            CritDirectHitPct = self.CritDirectHitPct;
          }
        }

        return (
            <div className={`header ${this.state.expanded ? '' : 'collapsed'}`}>
                <div className="encounter-header">
                    <div className="encounter-data ff-header">
                        <span className="target-name dropdown-parent" onClick={this.handleEncounterClick.bind(this)}>
                            {encounter.title}
                            <div className={`dropdown-menu encounters-list-dropdown ${this.state.showEncountersList ? '' : 'hidden'}`}>
                                <div onClick={this.props.onSelectEncounter.bind(this, null)}>
                                    Current Fight
                                </div>
                                {EncountersArray.map(function(encounter, i) {
                                    return (
                                        <div key={i} onClick={this.props.onSelectEncounter.bind(this, i)}>
                                            {encounter.Encounter.title}
                                        </div>
                                    );
                                }.bind(this))}
                            </div>
                        </span>
                        <span className="duration">
                            ({encounter.duration})
                        </span>
                        <span className={`arrow ${this.state.expanded ? 'up' : 'down'}`} onClick={this.handleExtraDetails.bind(this)} />
                    </div>
                    <div
                        className="chart-view-switcher"
                        onClick={this.props.onViewChange}>
                        {this.props.currentView}
                    </div>
                </div>
                <div className="extra-details">
                    {this.props.currentView == "Damage" ?
                      <div className="data-set-view-switcher clearfix" onClick={this.handleToggleStats.bind(this)}>
                        <span className={`data-set-option ${this.state.group ? 'active' : ''}`}>G</span>
                        <span className={`data-set-option ${!this.state.group ? 'active' : ''}`}>I</span>
                      </div>
                    : null}
                    <div className="extra-row damage">
                        <div className="cell">
                            <span className="label ff-header">Damage</span>
                            <span className="value ff-text">
                                {`${formatNumber(DataSource.damage)} (${formatNumber(DataSource.encdps)})`}
                            </span>
                        </div>

                        <div className="cell">
                            <span className="label ff-header">Max</span>
                            <span className="value ff-text">
                                {DataSource.maxhit}
                            </span>
                        </div>
                    </div>
                    <div className="extra-row damage">
                      {/* crithit is not being calculated properly in the Encounter object so instead we are calcing it on the fly*/}
                      <div className="cell">
                          <span className="label ff-header">Crit%</span>
                          <span className="value ff-text">
                            { formatNumber( parseFloat(DataSource.crithits / DataSource.hits * 100) ) + "%" }
                          </span>
                      </div>
                      <div className="cell">
                          <span className="label ff-header">Misses</span>
                          <span className="value ff-text">
                              {encounter.misses}
                          </span>
                      </div>
                      {/* DirectHitPct coming from the Encounter object is missing so we are calcing above */}
                      <div className="cell">
                          <span className="label ff-header">Direct%</span>
                          <span className="value ff-text">
                              {formatNumber(DirectHitPct) + "%"}
                          </span>
                      </div>
                      {/* CritDirectHitPct coming from the Encounter object is missing so we are calcing above */}
                      <div className="cell">
                          <span className="label ff-header">DirectCrit%</span>
                          <span className="value ff-text">
                              {formatNumber(CritDirectHitPct) + "%"}
                          </span>
                      </div>
                    </div>
                    <div className="extra-row healing">
                        <div className="cell">
                            <span className="label ff-header">Heals</span>
                            <span className="value ff-text">
                                {`${formatNumber(DataSource.healed)} (${formatNumber(DataSource.enchps)})`}
                            </span>
                        </div>
                        {/* Overlay plugin is not returning correct heal values  */}
                        <div className="cell">
                            <span className="label ff-header">Crit%</span>
                            <span className="value ff-text">
                                {DataSource['critheal%']}
                            </span>
                        </div>
                        <div className="cell">
                            <span className="label ff-header">Max</span>
                            <span className="value ff-text">
                                {DataSource.maxheal}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Header.defaultProps = {
    encounter: {},
    onViewChange() {},
    onSelectEncounter() {},
    onExtraDetailsClick() {}
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
                        perSecond: formatNumber(combatant.encdps),
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

    shouldComponentUpdate(nextProps, nextState) {
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

    componentWillReceiveProps(nextProps) {
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
    }

    handleCombatRowClick(e) {
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

    handleSelectEncounter(index, e) {
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
    }

    render() {
        const debug = false;
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
                data = _.sortBy(_.filter(data, (d) => {
                    return parseInt(d.healed, 10) > 0;
                }), (d) => {
                    if (this.state.currentViewIndex === 1) {
                        return -parseInt(d.healed, 10);
                    }
                });
            }
            // Tanking
            else if (this.state.currentViewIndex === 2) {
                data = _.sortBy(_.filter(data, (d) => {
                    return parseInt(d.damagetaken, 10) > 0;
                }), (d) => {
                    if (this.state.currentViewIndex === 2) {
                        return -parseInt(d.damagetaken, 10);
                    }
                });
            }
        }

        return (
            <div
                onClick={this.handleClick}
                className={'damage-meter' + (!this.props.parseData.isActive ? ' inactive' : '') + (!this.props.noJobColors ? ' show-job-colors' : '')}>
                <Header
                    encounter={encounterData}
                    data={data}
                    onViewChange={this.handleViewChange.bind(this)}
                    onSelectEncounter={this.handleSelectEncounter.bind(this)}
                    currentView={this.props.chartViews[this.state.currentViewIndex]}
                    />
                <Combatants
                    currentView={this.props.chartViews[this.state.currentViewIndex]}
                    onClick={this.handleCombatRowClick}
                    data={data}
                    encounterDamage={encounterData.damage} />
                {
                  !debug ? null :
                  <div>
                    <Debugger data={this.props.parseData}/>
                  </div>
                }
            </div>
        );
    }
}

DamageMeter.defaultProps = {
    chartViews: [
        'Damage',
        'Healing',
        'Tanking'
    ],
    parseData: {},
    noJobColors: false
};


class Debugger extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const css ={
      overflowY:'scroll',
      maxHeight:'250px'
    }
    return ( <pre style={css}>{JSON.stringify(this.props.data, null,2)}</pre>);
  }
}
