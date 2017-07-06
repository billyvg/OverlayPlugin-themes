var rows = 10;
var rdps_max = 0;

String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

function JobOrName(combatant) {
	combatant.JobOrName = combatant.Job || combatant.name;
	var egiSearch = combatant.JobOrName.indexOf("-Egi (");
	if (egiSearch !=-1)
	{
		combatant.JobOrName = combatant.JobOrName.substring(0,egiSearch);
	}
	else if (combatant.JobOrName.indexOf("Eos (")==0)
	{
		combatant.JobOrName = "Eos";
	}
	else if (combatant.JobOrName.indexOf("Selene (")==0)
	{
		combatant.JobOrName = "Selene";
	}
	else if (combatant.JobOrName.indexOf("Carbuncle (")!=-1)
	{
		// currently no carbuncle pics
	}
	else if (combatant.JobOrName.indexOf(" (")!=-1)
	{
		combatant.JobOrName = "choco";
	}
	
	return combatant.JobOrName;
};

function update(e) {
	var encounter = e.detail.Encounter;
	var combatants = e.detail.Combatant;
	var template = $('#source li');
	var container = $('#overlay').clone();

	// todo: animate changes while combat is active?
	// for now, always just fully replace the content

	container.html('');

	var rdps = parseFloat(encounter.encdps);

	// sanity check
	if (!isNaN(rdps) && rdps != Infinity) {
		rdps_max = Math.max(rdps_max, rdps);
	}

	//var header = template.clone();
	var header = $('#header li').clone();
	if (encounter.encdps.length <= 7) {
		header.find('.raiddps').text(encounter.encdps);
	} else {
		header.find('.raiddps').text(encounter.ENCDPS);
	}
	header.find('.encountertitle').text(encounter.title.toUpperCase());
	header.find('.duration').text("Time: " + encounter.duration);
	//header.find('.bar').css('width', ((rdps / rdps_max) * 100) + '%');

	// set inactive
	if (!e.detail.isActive) {
		rdps_max = 0;
		$('body').addClass('inactive');
	} else {
		$('body').removeClass('inactive');
	}

	container.append(header);

	var limit = Math.max(combatants.length, rows);
	var names = Object.keys(combatants).slice(0,rows-1);
	var maxdps = false;

	for (var i = 0; i < names.length; i++) {
		var combatant = combatants[names[i]];
		var row = template.clone();
		var dps_width = (parseFloat(combatant.encdps) / maxdps) * 100;

		if (!maxdps) {
			maxdps = parseFloat(combatant.encdps);
		}

		if (combatant.name == 'YOU') {
			row.addClass('you');
		}
		
		var jobIcon = "<img src='./images/glow/"+ JobOrName(combatant) +".png' onError=\this.onerror=null;this.src='./images/error.png';\" />";
		var dmgperc = parseInt(combatant["damage%"]);

		row.find('.dps').text(combatant.encdps);
		row.find('.job').html(jobIcon);
		row.find('.damageperc').text(combatant["damage%"]+"DPS");
		if ( dps_width < 97 )
		{
			row.find('.damageperc').css('right', "-40px"); 
		}
		else
		{
			row.find('.damageperc').css('right', "0px");
		}
		
		row.find('.name').text(combatant.name);
		row.find('.bar').css('width', dps_width + '%');
		row.find('.besthit').text(combatant.maxhit);
		if ( dps_width > 12 )
		{
			row.find('.critperc').text(combatant["crithit%"]+"CRIT");
			row.find('.directperc').text(combatant["DirectHitPct"]+"DRCT");
		}
		else
		{
			row.find('.critperc').text("");
			row.find('.directperc').text("");
		}

		container.append(row);
	}

	$('#overlay').replaceWith(container);
}