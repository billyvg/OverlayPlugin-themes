;(function() {

var intervalId;

window.start = start;
window.stop = stop;
window.step = dispatch;

start();

function start() {
	stop();
	dispatch();
	intervalId = setInterval(dispatch, 1000);
}

function stop() {
	intervalId = clearInterval(intervalId);
}

function dispatch() {
	var encounter = {
		    "duration": getDuration(),
		}
	  , combatants = {}
	  , combatant
	  , jobs = ["Arc","Ast","Blm","Brd","Drg","Drk","Gld","Mch","Mnk","Nin","Pld","Sch","Smn","War","Whm"]
	  , duration
	  , length = parseInt(Math.random() * 8 + 1)
	  , overalldps = 0
	  ;

	do {
		combatant = combatants["Name"+length] = getCombatant("Name"+length);
		overalldps += parseInt(combatant.encdps)
	} while (length-- > 1)

	for(length in combatants) {
		combatants[length]["damage%"] = parseInt(combatants[length].encdps * 100 / overalldps) + "%";
	}

	encounter.encdps = overalldps.toFixed(2);

	// Dispatch the event.
	document.dispatchEvent(
		new CustomEvent('onOverlayDataUpdate', {
			'detail': {
				"Encounter": encounter,
				"Combatant": combatants
			}
		})
	);

	function getCombatant(name) {
		return {
			name: name,
		    "duration": getDuration(),
		    "encdps": getDPS(),
		    "crithit%": getCritPct(),
		    "misses": getMisses(),
		    "Job": getJob(),
		};
	}

	function getDuration() {
		if(duration) return duration;
		return duration = new Date().toTimeString().split(' ')[0];
	}

	function getDPS() {
		return (Math.random() * 1000).toFixed(2);
	}

	function getCritPct() {
		return parseInt(Math.random() * 20) + "%";
	}

	function getMisses() {
		return parseInt(Math.random() * 10) + "";
	}

	function getJob() {
		return jobs[parseInt(Math.random() * jobs.length)];
	}
}

}());