// fiddle: http://jsfiddle.net/v1ddnsvh/8/

var IMAGE_PATH = 'images';

var Combatant = React.createClass({
	render: function() {
		return (
			React.createElement('li', {className: 'row' + (this.props.isSelf ? ' self' : '')},
				React.createElement('span', {className: 'dps'},
					this.props.data.dps
					),
				React.createElement('div', {className: 'detail'},
					React.createElement('span', {className: 'title'},
						React.createElement('span', {className: 'label-left'},
							this.props.data.name
							),
						React.createElement('span', {className: 'label-right'},
							this.props.data.damage
							)
						),
					React.createElement('span', {className: 'bar'})
					)
				)
			);
	}
});

var CombatantCompact = React.createClass({
	getDefaultProps: function() {
		return {
			onClick: function() {}
		};
	},

	jobImage: function(job) {
		return IMAGE_PATH + '/jobs/' + job + '_white.png';
	},

	render: function() {
		//var width = parseInt(this.props.data.damage / this.props.encounterDamage * 100, 10) + '%';
		var width = parseInt(this.props.data.damage / this.props.maxdps * 100, 10) + '%';

		return (
			this.props.data.dps === '---' ? null :
			React.createElement('li', {
					className: 'row ' + this.props.data.Job + (this.props.isSelf ? ' self' : ''),
					onClick: this.props.onClick
				},
				React.createElement('div', {className: 'bar', style: {width: width}}),
				React.createElement('div', {className: 'text-overlay'},
					React.createElement('span', {className: 'job-icon'},
						React.createElement('img', {src: this.jobImage(this.props.data.Job.toLowerCase())})
					),
					React.createElement('span', {className: 'rank'}, this.props.rank + '. '),
					React.createElement('span', {className: 'character-name'},
						this.props.data.name
					),
					React.createElement('span', {className: 'character-job'},
						this.props.data.Job
					),
					React.createElement('div', {className: 'damage-stats'},
						React.createElement('span', {className: 'damage'},
							this.props.data.damage
						),
						' (',
						React.createElement('span', {className: 'dps'},
							this.props.data.dps
						),
						', ',
						React.createElement('span', {className: 'damage-percent'},
							this.props.data['damage%']
						),
						')'
					)
				)
			)
		);
	}
});

var Encounter = React.createClass({
	shouldComponentUpdate: function(nextProps) {
	},

	render: function() {
		var dps = this.props.encdps.length <= 7 ? this.props.encdps : this.props.ENCDPS;
		var rdps = parseFloat(this.props.encdps);
		var rdps_max = 0;

		if (!isNaN(rdps) && rdps != Infinity) {
			rdps_max = Math.max(rdps_max, rdps);
		}

		var width = (rdps / rdps_max) * 100;

		return (
			React.createElement('div', {className: 'encounter-header'},
				React.createElement('span', {className: 'target-name'},
					this.props.title
				),
				React.createElement('span', {className: 'duration'},
					this.props.duration
				)
			)
		);
	}
});


var Combatants = React.createClass({
	getDefaultProps: function() {
		return {
			onClick: function() {}
		};
	},

	shouldComponentUpdate: function(nextProps) {
		// if data is empty then don't re-render
		if (Object.getOwnPropertyNames(nextProps.data).length === 0) {
			return false;
		}

		return true;
	},

	render: function() {
		var rows = [];
		var maxRows = 10;
		var dataArray = Object.keys(this.props.data);
		var limit = Math.max(dataArray.length, maxRows);
		var names = dataArray.slice(0, maxRows-1);
		var maxdps = false;
		var combatant;
		var row;
		var isSelf;

		for (var i = 0; i < names.length; i++) {
			combatant = this.props.data[names[i]];

			if (!maxdps) {
				maxdps = parseFloat(combatant.damage);
			}

			isSelf = combatant.name === 'YOU' || combatant.name === 'You';

			if (combatant.Job !== "") {
				rows.push(
					React.createElement(CombatantCompact, {
						onClick: this.props.onClick,
						encounterDamage: this.props.encounterDamage,
						rank: i + 1,
						data: combatant,
						isSelf: isSelf,
						key: names[i],
						maxdps: maxdps
					})
				);
			}

		}

		return React.createElement('ul', {className: 'combatants'}, rows);
	}
});

var DamageMeter = React.createClass({
	handleCombatRowClick: function(e) {
		console.log('Row clicked');
	},

	handleClick: function(e) {
		console.log('cliocked');
	},

	render: function() {
		return (
			React.createElement('div', {onClick: this.handleClick, className: 'damage-meter' + (!this.props.isActive ? 'inactive' : '')},
				React.createElement(Encounter, this.props.Encounter),
				React.createElement(Combatants, {
					onClick: this.handleCombatRowClick,
					data: this.props.Combatant,
					encounterDamage: this.props.Encounter.damage
				})
			)
		);
	}
});
