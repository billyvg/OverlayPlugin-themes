viewBuilder = (function(){

    var currentView = 0,
        currentData = null,

        encounterData = null,
        conbatantTable = null,
        viewOptions = null,

        defCache = {
            encounterDef: null,
            headerDef: null,
            bodyDef: null
        },

        defType = {
            ENCOUNTER: "encounterDef",
            HEADER: "headerDef",
            BODY: "bodyDef"
        }

    function getCurrentView(def)
    {
        var view,
            viewArray;

        if(def == defType.ENCOUNTER)
        {
            return dynamicViewList[currentView].encounterDef;
        }

        view = globalView[def].slice(0);

        viewIterable = dynamicViewList[currentView][def];

        for(var i = 0; i < viewIterable.length; i++)
        {
            view.push(viewIterable[i]);
        }

        defCache[def] = view;

        return view;
    }

    function buildViewHeader()
    {
        var tableHeader = document.createElement("thead"),
            headerRow = tableHeader.insertRow(),
            currentView = defCache.headerDef || getCurrentView(defType.HEADER);
        
        tableHeader.id = "combatantTableHeader";

        for(var i = 0; i < currentView.length; i++) {
            var cell = document.createElement("th");

            if(currentView[i].text) 
            {
                cell.innerText = currentView[i].text;
            } 
            else
            {
                cell.innerHTML = currentView[i].html;
            }

            cell.style.width = currentView[i].width;
            cell.style.maxWidth = currentView[i].width;

            if(currentView[i].span) 
            {
                cell.colSpan = currentView[i].span;
            }

            if(currentView[i].align) 
            {
                cell.style.textAlign = currentView[i].align;
            }

            headerRow.appendChild(cell);
        }
        combatantTable.tHead = tableHeader;
    }

    function buildViewBody()
    {
        var newTableBody = document.createElement("tbody"),
            oldTableBody = document.getElementById("combatantTableBody"),
            combatant,
            combatantList = enableDynamicSort ? sortData() : currentData.Combatant;

        newTableBody.id = "combatantTableBody";

        if(enableDynamicSort)
        {
            for(var i = 0; i < combatantList.length; i++)
            {
                combatant = currentData.Combatant[combatantList[i][combatantOptions.NAME]];
                buildViewBodyHTML(combatant, newTableBody);
            }
        }
        else
        {
            for(var combatName in combatantList)
            {
                combatant = currentData.Combatant[combatantName];
                buildViewBodyHTML(combatant, newTableBody);
            }
        }

        if(oldTableBody)
        {
            combatantTable.replaceChild(newTableBody, oldTableBody);
        }
        else
        {
            combatantTable.appendChild(newTableBody);
        }
    }

    function buildViewBodyHTML(combatant, newTableBody)
    {
        var cell,
            egiSearch,
            tableRow,
            currentView = defCache.bodyDef || getCurrentView(defType.BODY);

        combatant.JobOrName = combatant.Job || "limit break";
        egiSearch = combatant.JobOrName.indexOf("-Egi (");

        if(egiSearch != -1 ||
           combatant.JobOrName.indexOf("Eos (") == 0 ||
           combatant.JobOrName.indexOf("Selene (") == 0 ||
           combatant.JobOrName.indexOf("Carbuncle (") != -1) 
        {
            combatant.JobOrName = "pet";
        }
        else if(combatant.JobOrName.indexOf(" (") != -1) 
        {
            combatant.JobOrName = "cho";
        }

        tableRow = newTableBody.insertRow(newTableBody.rows.length);

        for(var i = 0; i < currentView.length; i++)
        {
            cell = tableRow.insertCell(i);

            if(currentView[i].html) 
            {
                cell.innerHTML = loadOptions(currentView[i].html, currentView[i].options, combatant);
            } 
            else
            {
                cell.innerText = loadOptions(currentView[i].text, currentView[i].options, combatant);
            }

            cell.style.width = currentView[i].width;
            cell.style.maxWidth = currentView[i].width;

            if(currentView[i].align) 
            {
                cell.style.textAlign = currentView[i].align;
            }
        }
    }

    function buildViewEncounter()
    {
        var encounterTemplate,
            preRenderedStore,
            currentView = defCache.encounterDef || getCurrentView(defType.ENCOUNTER);

        if(currentView.html)
        {
            encounterTemplate = currentView.html;
            encounterData.innerHTML = loadOptions(encounterTemplate, currentView.options, getEncounterData(currentData));
        }
        else
        {
            encounterTemplate = currentView.text;
            encounterData.innerText = loadOptions(encounterTemplate, currentView.options, getEncounterData(currentData));
        }
    }

    function sortData()
    {
        var combatantArray = [],
            combatantEntry,
            sortedCombatant = {},
            tempSortField,
            percentIndex;

        for(var combatantName in currentData.Combatant)
        {
            combatantEntry = {};
            combatantEntry[combatantOptions.NAME] = combatantName;
            tempSortField = currentData.Combatant[combatantName][dynamicViewList[currentView].sortDef];
            percentIndex = tempSortField.indexOf("%");

            combatantEntry.sortField = parseFloat(percentIndex === -1 ? tempSortField : tempSortField.substring(0, percentIndex));

            combatantArray.push(combatantEntry);
        }

        return combatantArray.sort(sortCombatants);
    }

    function sortCombatants(a, b)
    {
        if(a.sortField === NaN)
        {
            return 1;
        }

        if(b.sortField === NaN)
        {
            return -1;
        }

        if (a.sortField < b.sortField)
            return 1;
        if (a.sortField > b.sortField)
            return -1;
    }

    function ViewBuilder() {};

    ViewBuilder.prototype.update = function(data) {
        if(data)
        {
            currentData = data;
        }

        buildViewEncounter();
        buildViewHeader();
        buildViewBody();
    };

    ViewBuilder.prototype.setView = function(viewIndex) {
        currentView = viewIndex;

        defCache.encounterDef = null;
        defCache.headerDef = null;
        defCache.bodyDef = null;

        this.update();
    };

    ViewBuilder.prototype.init = function() {
        var viewElement,
            self = this;

        encounterData = document.getElementById("encounterData");
        combatantTable = document.getElementById("combatantTable");
        viewOptions = document.getElementById("views");

        for(var i = 0; i < dynamicViewList.length; i++)
        {
            viewElement = document.createElement("span");
            viewElement.className = "viewOption";
            viewElement.setAttribute("data-viewIndex", i);
            viewElement.innerText = dynamicViewList[i].name + "   ";
            viewElement.addEventListener("mouseenter", function(event) {
                self.setView(event.target.dataset.viewindex);
            });
            viewOptions.appendChild(viewElement);
        }
    };

    return new ViewBuilder();
}());

