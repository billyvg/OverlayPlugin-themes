/*
    Config file for Sinistral's Dynamic View overlay. Refer to config.js for help in finding out what data keys return what data.
    To change what is rendered in each view, simple add/remove/edit entries inside of the view you wish to edit. headerDef's are your static data point labels, and bodyDef is what holds the actual data.
    So say you want to add attacks missed to the damageView. You would simply add:

    { text: "Misses", width: 3%, align:"center" } to the headerDef, and
    { text: "{0}", options: [combatantOptions.MISSES], width: 3%, align: "center" } to the bodyDef.
    You may substitue text for html as needed. HTML will always take precedence over text.
    Again, refer to config.js to see what options are available to you.

    If you want to edit encounterDef, make sure you use encounterOptions instead.

    You can also add entirely new views. Just follow the structure of the ones given. The view builder will pick up the changes and add it as an option.

    To change how each view is ranked, you can edit sortDef. Just specify the field you wish to sort by. Currently, sortDef only supports numeric values, and DESC sorting. 

*/

    /*
        Allows for dynamic sorting when changing view. This might be CPU intensive for some users.
    */
var enableDynamicSort = true,

    /*
        Data attached to every view filter. Editing this will change every single view.
    */
    globalView = {
        headerDef: [
            { text: "Job", width: "1.5%", align: "center" },
            { text: "Name", width: "3%", align: "left" }
        ],
        bodyDef: [
            { html: "<img src='./images/default/{0}.png' style='width=1.5%;height:auto;' />", options: [combatantOptions.JOB_OR_NAME], align: "center" },
            { text: "{0}", options: [combatantOptions.NAME], width: "3%",  align: "left" }
        ]
    },

    dynamicViewList = [
        /*
            A view meant to give detailed DPS data.
        */
        damageView = {
            headerDef: [
                { text: "DPS" , width: "3%", align: "left", span: 2 },
                { text: "Crit %", width: "1.5%", align: "left" },
                { text: "Acc %", width: "2%", align: "left" },
                { text: "Max Hit", width: "4%", align: "left"}
            ],
            bodyDef: [
                { text: "{0}", options: [combatantOptions.DPS], width: "1.5%", align: "left" },
                { text: "{0}", options: [combatantOptions.DAMAGE_PERCENT], width: "1.5%", align: "left" },
                { text: "{0}", options: [combatantOptions.CRITICAL_PERCENTAGE], width: "1.5%", align: "left" },
                { text: "{0}", options: [combatantOptions.TO_HIT], width: "2%", align: "left" },
                { text: "{0}", options: [combatantOptions.MAX_HIT], width: "4%", align: "left"}
            ],
            encounterDef: {
                text: "Time: {0}  /  DPS: {1}  /  Damage Dealt: {2}",
                options: [encounterOptions.DURATION, encounterOptions.DPS_ROUNDED, encounterOptions.DAMAGE]
            },
            sortDef: combatantOptions.DPS,
            name: "Damage"
        },

        /*
            A view meant to give detailed Healer data.
        */
        healedView = {
            headerDef: [
                { text: "HPS", width: "3%", align: "left", span: 2 },
                { text: "Crit %", width: "2%", align: "left" },
                { text: "OverH %", width: "2%", align: "left" },
                { text: "Actual", width: "2.5%", align: "left" },
                { text: "Max Heal", width: "4%", align: "left"}
            ],
            bodyDef: [
                { text: "{0}", options: [combatantOptions.HPS], width: "1.5%", align: "left" },
                { text: "{0}", options: [combatantOptions.HEALED_PERCENT], width: "1.5%", align: "left"},
                { text: "{0}", options: [combatantOptions.CRITICAL_HEALS_PERCENTAGE], width: "2%", align: "left" },
                { text: "{0}", options: [combatantOptions.OVERHEAL_PERCENT], width: "2%", align: "left" },
                { text: "{0}", options: [combatantOptions.CUSTOM_ACTUAL_HEALING], width: "2.5%", align: "left"},
                { text: "{0}", options: [combatantOptions.MAX_HEAL], width: "4%", align: "left"}
            ],
            encounterDef: {
                text: "Time: {0}  /  HPS: {1}  /  Healing Done: {2}",
                options: [encounterOptions.DURATION, encounterOptions.HPS_ROUNDED, encounterOptions.HEALED]
            },
            sortDef: combatantOptions.HPS,
            name: "Healing"
        },

        /*
            A view meant to help Tanks figure out their mitigation specs and how much healing they require per encounter.
        */
        tankView = {
            headerDef: [
                { text: "Block %", width: "2%", align: "left" },
                { text: "Parry %", width: "2%", align: "left" },
                { text: "Damage Taken", width: "4%", align: "left" },
                { text: "Healing Taken", width: "4%", align: "left"}
            ],
            bodyDef: [
                { text: "{0}", options: [combatantOptions.PARRY_RATE], width: "2%", align: "left" },
                { text: "{0}", options: [combatantOptions.BLOCK_RATE], width: "2%", align: "left"},
                { text: "{0}", options: [combatantOptions.DAMAGE_TAKEN], width: "4%", align: "left" },
                { text: "{0}", options: [combatantOptions.HEALS_TAKEN], width: "4%", align: "left" },
            ],
            encounterDef: {
                text: "Time: {0}  /  DPS: {1}  /  HPS: {2}",
                options: [encounterOptions.DURATION, encounterOptions.DPS_ROUNDED, encounterOptions.HPS_ROUNDED]
            },
            sortDef: combatantOptions.DAMAGE_TAKEN,
            name: "Tanking"
        }
    ];