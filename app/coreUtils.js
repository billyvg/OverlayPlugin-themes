/*
    GENERAL CONFIG FILE FOR EASIER OVERLAY USABILITY AND DEVELOPMENT
    Created By: Sinistral Revicane of Faerie

    This file is meant to help users and developers both in creating and configuring overlays. The goal is to make the options for overlays simple to use, access, and understand so
    we can focus on creating awesome overlays, and less on figuring out what fields are needed. This will also allow apps to be migrated very easily if data key values ever change.
*/



    /*
        List of data keys available for encounterdef configs. I couldn't find a resource for this so I spent a few days finding these out and figuring out what they did to the best of my knowledge.
        I have some custom ones in here that I calculate on the fly, these are prepended with CUSTOM and can not be used for anything other than this overlay plugin.

        All the data here is aggregated from all parsed combatants into a single value, usually via a sum or average, depending on field.
    */
var encounterOptions = {
        //Unknown purpose
        ENCOUNTER_N: "n",
        //Unknown purpose
        ENCOUNTER_T: "t",
        //Tends to be the first monster encountered during a parse OR "Encounter"
        TITLE: "title",
        //Duration in M:SS format
        DURATION: "duration",
        //Duration in S format
        DURATION_SECONDS: "DURATION",
        //Damage done by all parsed players and pets.
        DAMAGE: "damage",
        //Millions of damage done by all parsed players and pets.
        DAMAGE_MILLIONS: "damage-m",
        //Thousands of damage done by all parsed players and pets. Whole Number
        DAMAGE_ROUNDED_THOUSANDS: "DAMAGE-k",
        //Millions of damage done by all parsed players and pets. Whole Number
        DAMAGE_ROUNDED_MILLIONS: "DAMAGE-m",
        //DPS done by all parsed players and pets. Seems identical to encdps
        DPS: "dps",
        //DPS done by all parsed players and pets, rounded to whole number. Seems identical to ENCDPS
        DPS_ROUNDED: "DPS",
        //Thousands of DPS done by all parsed players and pets. Seems identical to ENCDPS-k
        DPS_ROUNDED_THOUSANDS: "DPS-k",
        //Number of landed hits done by all parsed players and pets.
        HITS: "hits",
        //Number of critical hits done by all parsed players and pets.
        CRITICAL_HITS: "crithits",
        //Overall crit percentage of all parsed players and pets.
        CRITICAL_PERCENTAGE: "crithit%",
        //Overall misses performed by all parsed players and pets.
        MISSES: "misses",
        //Unknown purpose
        HIT_FAILED: "hitfailed",
        //Overall number of attempted offensive actions by all parsed players and pets.
        SWINGS: "swings",
        //This value is incorrect as of 7/30/2015. If you want true accuracy, do hits/swings.
        //Overall % chance to hit for all parsed players and pets.
        TO_HIT: "tohit",
        //Overall % chance to hit for all parsed players and pets, rounded to whole number.
        TO_HIT_ROUNDED: "TOHIT",
        //The highest damaging attack performed by all players and pets parsed. Form of SOURCE-ABILITY NAME-DAMAGE
        MAX_HIT: "maxhit",
        //The highest damaging attack performed by all players and pets parsed. Form of DAMAGE
        MAX_HIT_SHORT: "MAXHIT",
        //The total amount of health attempted to be restored by all players and pets parsed.
        HEALED: "healed",
        //The total HPS attempted to be performed by all players and pets parsed.
        HPS: "enchps",
        //The total HPS attempted to be performed by all players and pets parsed, rounded to whole number.
        HPS_ROUNDED: "ENCHPS",
        //The total HPS in thousands attempted to be performed by all players and pets parsed.
        HPS_ROUNDED_THOUSANDS: "ENCHPS-k",
        //The total critical heals performed by all players and pets parsed.
        CRITICAL_HEALS: "critheals",
        //The total critical heal rate performed by all players and pets parsed.
        CRITICAL_HEALS_PERCENTAGE: "critheal%",
        //The total number of healing actions performed by all players and pets parsed.
        HEALS: "heals",
        //The total number of cures/dispells performed by all players and pets parsed.
        CURES: "cures",
        //The highest healed amount performed by all players and pets parsed. Form of SOURCE-ABILITY NAME-HEALED. Appears idential to maxhealward
        MAX_HEAL: "maxheal",
        //The highest healed amount performed by all players and pets parsed. Form of HEALED. Appears identical to MAXHEALWARD.
        MAX_HEAL_SIMPLE: "MAXHEAL",
        //Total damage taken accross all players and pets parsed.
        DAMAGE_TAKEN: "damagetaken",
        //Total healing recieved taken accross all players and pets parsed.
        HEALS_TAKEN: "healstaken",
        //Unknown Purpose
        POWER_DRAIN: "powerdrain",
        //I think this is mana regenerated throughout fight, by all parsed players and pets (I don't think pets have mana).
        POWER_HEAL: "powerheal",
        //Number of kills performed by all parsed players and pets.
        KILLS: "kills",
        //Number of deaths accross all players and pets.
        DEATHS: "deaths",
        //Current zone the parser is in.
        CURRENT_ZONE_NAME: "CurrentZoneName",
        //DPS of all parsed players and pets over the last 10 seconds, rounded to nearest whole number.
        DPS_10_SECONDS: "Last10DPS",
        //DPS of all parsed players and pets over the last 30 seconds, rounded to nearest whole number.
        DPS_30_SECONDS: "Last30DPS",
        //DPS of all parsed players and pets over the last 60 seconds, rounded to nearest whole number.
        DPS_60_SECONDS: "Last60DPS"
    },

    /*
        List of data keys available for bodyDef configs. I couldn't find a resource for this so I spent a few days finding these out and figuring out what they did to the best of my knowledge.
        I have some custom ones in here that I calculate on the fly, these are prepended with CUSTOM and can not be used for anything other than this overlay plugin.

        All the data here pertains to a specific player, pet, or if you have the config in the parse plugin enabled, player+pet. If you have the option enabled, 
        this overlay cannot tell the difference between a player and a player owned pet.
    */
    combatantOptions = {
        //Unknown purpose
        COMBATANT_N: "n",
        //Unknown purpose
        COMBATANT_T: "t",
        //The player, or pet, this data was gathered from.
        NAME: "name",
        //Duration in M:SS format that this entity participated in combat.
        DURATION: "duration",
        //Duration in S format that this entity participanted in combat.
        DURATION_SECONDS: "DURATION",
        //Damage done by entity.
        DAMAGE: "damage",
        //Millions of damage done by entity.
        DAMAGE_MILLIONS: "damage-m",
        //Thousands of damage done by entity. Whole Number
        DAMAGE_ROUNDED_THOUSANDS: "DAMAGE-k",
        //Millions of damage done by entity. Whole Number
        DAMAGE_ROUNDED_MILLIONS: "DAMAGE-m",
        //Percentage of overall damage this player contributed.
        DAMAGE_PERCENT: "damage%",
        //DPS done by entity. Seems identical to dps
        DPS: "encdps",
        //DPS done by entity, rounded to whole number. Seems identical to DPS
        DPS_ROUNDED: "ENCDPS",
        //Thousands of DPS done by entity. Seems identical to DPS-k
        DPS_ROUNDED_THOUSANDS: "ENCDPS-k",
        //Number of landed hits done by entity.
        HITS: "hits",
        //Number of critical hits done by entity.
        CRITICAL_HITS: "crithits",
        //Overall crit percentage of entity.
        CRITICAL_PERCENTAGE: "crithit%",
        //Overall misses performed by entity.
        MISSES: "misses",
        //Unknown purpose
        HIT_FAILED: "hitfailed",
        //Overall number of attempted offensive actions by entity.
        SWINGS: "swings",
        //This value is incorrect as of 7/30/2015. If you want true accuracy, do hits/swings.
        //Overall % chance to hit for entity.
        TO_HIT: "tohit",
        //Overall % chance to hit for entity, rounded to whole number.
        TO_HIT_ROUNDED: "TOHIT",
        //The highest damaging attack performed by all players and pets parsed. Form of SOURCE-ABILITY NAME-DAMAGE
        MAX_HIT: "maxhit",
        //The highest damaging attack performed by all players and pets parsed. Form of DAMAGE
        MAX_HIT_SHORT: "MAXHIT",
        //The total amount of health attempted to be restored by all players and pets parsed.
        HEALED: "healed",
        //Percentage of overall attempted healing this player contributed.
        HEALED_PERCENT: "healed%",
        //The total HPS attempted to be performed by all players and pets parsed.
        HPS: "enchps",
        //The total HPS attempted to be performed by all players and pets parsed, rounded to whole number.
        HPS_ROUNDED: "ENCHPS",
        //The total HPS in thousands attempted to be performed by all players and pets parsed. 
        HPS_ROUNDED_THOUSANDS: "ENCHPS-k",
        //The total critical heals performed by all players and pets parsed.
        CRITICAL_HEALS: "critheals",
        //The total critical heal rate performed by all players and pets parsed.
        CRITICAL_HEALS_PERCENTAGE: "critheal%",
        //The total number of healing actions performed by all players and pets parsed.
        HEALS: "heals",
        //The total number of cures/dispells performed by all players and pets parsed.
        CURES: "cures",
        //The highest healed amount performed by all players and pets parsed. Form of SOURCE-ABILITY NAME-HEALED. Appears idential to maxhealward
        MAX_HEAL: "maxheal",
        //The highest healed amount performed by all players and pets parsed. Form of HEALED. Appears identical to MAXHEALWARD.
        MAX_HEAL_SIMPLE: "MAXHEAL",
        //Total damage taken accross all players and pets parsed.
        DAMAGE_TAKEN: "damagetaken",
        //Total healing recieved taken accross all players and pets parsed.
        HEALS_TAKEN: "healstaken",
        //Unknown Purpose
        POWER_DRAIN: "powerdrain",
        //I think this is mana regenerated throughout fight, by entity (I don't think pets have mana).
        POWER_HEAL: "powerheal",
        //Number of kills performed by entity.
        KILLS: "kills",
        //Number of deaths accross all players and pets.
        DEATHS: "deaths",
        //I think this is supposed to be how much Threat this player/pet currently has, but it's broken and is always 0 as of 7/30/2015.
        THREAT_STRENGTH: "threatstr",
        //I think this is supposed to be how far from top threat this player/pet currently is, but it's broken and is alway +(0)/0/-(0)/0 as of 7/30/2015
        THREAT_DELTA: "threatdelta",
        //String representation of the abbreviated job of the player. Ex. "Sch"
        JOB: "Job",
        //Percentage of attacks entity has performed.
        PARRY_RATE: "ParryPct",
        //Percentage of blocks entity has performed.
        BLOCK_RATE: "BlockPct",
        //I think this is the percentage of attacks the have landed on the entity, but I am not certain.
        INC_TO_HIT: "IncToHit",
        //The amount of healing this entity has performed that was unnecessary.
        OVERHEAL_PERCENT: "OverHealPct",
        //Seems identical to JOB except this field is populated if the entity is a Chocobo, whereas JOB is not. Otherwise, I can't find a difference. (This might apply to pets too)
        JOB_OR_NAME: "JobOrName",
        //DPS of entity over the last 10 seconds, rounded to nearest whole number.
        DPS_10_SECONDS: "Last10DPS",
        //DPS of entity over the last 30 seconds, rounded to nearest whole number.
        DPS_30_SECONDS: "Last30DPS",
        //DPS of entity over the last 60 seconds, rounded to nearest whole number.
        DPS_60_SECONDS: "Last60DPS",
        //The following are truncations of the entities name.
        NAME_TRUNC3: "NAME3",
        NAME_TRUNC4: "NAME4",
        NAME_TRUNC5: "NAME5",
        NAME_TRUNC6: "NAME6",
        NAME_TRUNC7: "NAME7",
        NAME_TRUNC8: "NAME8",
        NAME_TRUNC9: "NAME9",
        NAME_TRUNC10: "NAME10",
        NAME_TRUNC11: "NAME11",
        NAME_TRUNC12: "NAME12",
        NAME_TRUNC13: "NAME13",
        NAME_TRUNC14: "NAME14",
        NAME_TRUNC15: "NAME15",

        /*
            Custom options are defined below here. They delibrately follow different naming conventions to minimize the chance of clashing with future updates.
        */

        //Reports the value of healed * (OverHeal%/100) to get total amount of actual healing performed by entity. Since OVERHEAL_PERCENT is a rounded value, 
        //this will have a small margin of error of +-.5% of your total healing done.
        CUSTOM_ACTUAL_HEALING: "custom_actual_healing",

        //Pass in a integer, and this will return a name truncated to X characters. Example: combatantOptions.CUSTOM_TRUNCX(13) is equivalent to NAME_TRUNC13. X can be any whole number. 
        //It will break if a string or fraction is used, I'm not wasting function calls to check this. Use this correctly.
        CUSTOM_TRUNCX: "custom_truncx"
    },

    /*
        The inactivityTracker will quickly compare a few fields of the data being passed down from ACT to determine if there is a reason to actually update the view. This will save on processing power
        when you are finished with a fight as ACT has a habit of sending down data when you personally are doing nothing.

        The threshold is the number of seconds that it takes to determine inactivity.

        The sleep length is how long the function ignores activity when it determines activity is occuring. For example, if it checks data and see activity, it will stop making checks for the duration of
        the sleep length. Sleep length is considered active when calculating inactivity.

        Note that the overlay you are using must be checking the result of the inactivityTracker.isActive() call for these options to have any effect. See sinistral_dynamicView.html for examples.
    */
    inactivityTrackerOptions = {
        enabled: true,
        threshold: 30,
        sleepLength: 10
    };

/**
    Utility functions to get elements inside the JSON data struct. We want to go through this list so if this structure ever changes, it is trivial to update all the views.
*/
function getEncounterData(data)
{
    return data.Encounter;
}

function getCombatantList(data)
{
    return data.Combatant;
}

function getIsActive(data)
{
    return isActive;
}



/**
    Attaches custom options to the data passed down from the plugin for convenience. If you want to use custom options, make sure this is the first function you call.
    Don't be concerned about passing the giant JSON object around, JS uses pointers for this under the hood, it has no overhead.
    Feel free to add to this as needed. If you need a custom encounter variable, just add a field to data.Encounter. Don't forget to add your key to the option map.

    @param {Encounter, Combatant, isActive} data - JSON of the current parse
    @returns {Encounter, Combatant, isActive} Mutated JSON with custom options
*/
function attachCustomOptions(data)
{
    var combatant,
    overhealPercent;

    for(combatantKey in data.Combatant)
    {
        var overhealPercent;

        combatant = data.Combatant[combatantKey];

        //CUSTOM_ACTUAL_HEALING
        overhealPercent = parseInt(combatant[combatantOptions.OVERHEAL_PERCENT].substring(0, combatant[combatantOptions.OVERHEAL_PERCENT].length - 1));
        combatant[combatantOptions.CUSTOM_ACTUAL_HEALING] = Math.floor(combatant.healed * (1 - (overhealPercent/100)));

        //CUSTOM_TRUNCX
        combatant[combatantOptions.CUSTOM_TRUNCX] = function(truncVal) {
            return combatant.name.substring(0, truncVal);
        }
    }

    return data;
}

/*
    This is a very optimized function to inject data values into your strings. It's usage is very simple:
    Example Usage: loadOptions("Duration: {0}  /  Damage: {1}  /  Healed: {2}", [combatantOptions.DURATION, combatantOptions.DAMAGE, combatantOptions.HEALED], data.Combatant["YOU"])
    Note that you will likely want to call this function inside of a loop that iterates through your combatants. This function expects a singular combatant. data.Encounter can be passed in simply,
    since it does not hold an array as of 7/31/2015.

    @param {string} str - The string containing placeholders to inject data into. Placeholders should be sequential, unique, and enclosed in {}. Ex: {0}
    @param {string[]} options - The data keys you wish to replace sequentially. They will be injected from right to left. Index 0 will replace {0}, 1 will replace {1}, and so on. 
    For convenience and ease of updating, it is recommend to use the combatantOptions and encounterOptions enum defined above. Ex: [combatantOptions.DAMAGE, combatantOptions.DPS]
    @param {combatant/encounter} dictionary - The data scope that will be injecting data into str. See the above note for examples and explanation.

    @returns {string} The string containing the injected data.
*/
function loadOptions(str, options, dictionary)
{
    var injectedString = str;

    for(var i = 0; i < options.length; i++)
    {
        if(dictionary[options[i]] == undefined)
        {
            console.log("Unable to locate value for {" + i + "} in string " + str + ". Make sure the key is correctly entered. If it is, then the config might have an incorrect value and needs logged as a bug!");
        }
        else
        {
            injectedString = injectedString.replace("{" + i + "}", dictionary[options[i]])
        }
    }

    return injectedString;
}

/*
    Object that expects data passed to it to determine if a overlay render is needed or not. To use, simply pass data into inactivityTracker.update, and then check inactivityTracker.getIsActive to determine
    if you should run any logic. This helps save processing power when the player is running through the world and is around combat, but not actively contributing to combat. See sinistralis_dynamicView.html
    for a usage example.    
*/
var inactivityTracker = (function() {
    var lastUpdateSwings = 0,
        lastUpdateCasts = 0,
        inactivityCount = 0,
        sleepDuration = 0,
        isActive = true,
        inactivityInterface = null;

    function determineActivity(data)
    {
        if(sleepDuration == 0)
        {
            if(lastUpdateSwings !== data.Encounter[encounterOptions.SWINGS] || lastUpdateCasts !== data.Encounter[encounterOptions.HEALS])
            {
                lastUpdateSwings = data.Encounter[encounterOptions.SWINGS];
                lastUpdateCasts = data.Encounter[encounterOptions.HEALS];
                inactivityCount = 0;
                sleepDuration = inactivityTrackerOptions.sleepLength;
            }
        }

        isActive = inactivityCount < inactivityTrackerOptions.threshold
    }



    if(inactivityTrackerOptions.enabled === true)
    {
        setInterval(function() {
            if(sleepDuration) sleepDuration--;
            if(inactivityCount < inactivityTrackerOptions.threshold) inactivityCount++;
        }, 1000);

        inactivityInterface = {
            update: function(data) {
                determineActivity(data);
            },
            getIsActive: function() {
                return isActive;
            }
        };
    }
    else
    {
        inactivityInterface = {
            update: function() {},
            getIsActive: function() {
                return true;
            }
        };
    }

    return inactivityInterface;
}());