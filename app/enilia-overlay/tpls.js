angular.module("enilia.overlay.tpls", [
	"app/Config/config.html",
	"app/Config/partials/formcontrols/checkbox.html",
	"app/Config/partials/formcontrols/fieldselect.html",
	"app/Config/partials/formcontrols/presetConfig.html",
	"app/Config/partials/formcontrols/sorter.html",
	"app/Config/partials/preset.html",
	"app/Debug/debug.html",
	"app/DpsMeter/dpsmeter.html",
	"app/DpsMeter/partials/combatant.html",
	"app/DpsMeter/partials/combatants.html",
	"app/DpsMeter/partials/encounter.html",
]);

angular.module("app/Config/config.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/Config/config.html",
    "\n" +
    "<div class=\"menu\">\n" +
    "	<a href=\"#/dpsmeter\"\n" +
    "	   class=\"glyphicon glyphicon-tasks menu-item\"></a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"config\">\n" +
    "\n" +
    "	<h1>Presets</h1>\n" +
    "\n" +
    "	<div class=\"presets-collection\">\n" +
    "\n" +
    "		<div ng-repeat=\"preset in presets\" class=\"preset-line\">\n" +
    "			<div class=\"controls\">\n" +
    "				<span class=\"glyphicon delete\"\n" +
    "					  ng-click=\"remove($event, preset)\"\n" +
    "					  ng-class=\"{\n" +
    "					    'glyphicon-minus': checkRemove !== preset,\n" +
    "					  	'glyphicon-trash': checkRemove === preset,\n" +
    "					  	'remove': checkRemove === preset\n" +
    "					  }\"\n" +
    "					  prevent-selection></span>\n" +
    "				<a \n" +
    "				   class=\"glyphicon glyphicon-eye-open disabled preview\"></a>\n" +
    "				<a ng-href=\"#/config/preset/{{preset.__uid}}/clone\"\n" +
    "				   class=\"glyphicon glyphicon-duplicate clone\"></a>\n" +
    "				<a ng-href=\"#/config/preset/{{preset.__uid}}/edit\"\n" +
    "				   class=\"glyphicon glyphicon-wrench edit\"></a>\n" +
    "			</div>\n" +
    "			<span class=\"field preset\"\n" +
    "				  ng-class=\"{selected: selectedPreset === preset}\"\n" +
    "				  ng-click=\"select(preset)\"\n" +
    "				  >{{preset.name}}</span>\n" +
    "		</div>\n" +
    "\n" +
    "	</div>\n" +
    "\n" +
    "	<div>\n" +
    "		<a ng-href=\"#/config/preset/new\"\n" +
    "		   class=\"glyphicon glyphicon-plus add\"></a>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/Config/partials/formcontrols/checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/Config/partials/formcontrols/checkbox.html",
    "<span class=\"glyphicon checkbox\"\n" +
    "		ng-class=\"{\n" +
    "			'glyphicon-check':		checked,\n" +
    "			'glyphicon-unchecked':	!checked}\"\n" +
    "		ng-click=\"click()\"\n" +
    "		prevent-selection></span>\n" +
    "");
}]);

angular.module("app/Config/partials/formcontrols/fieldselect.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/Config/partials/formcontrols/fieldselect.html",
    "\n" +
    "<div class=\"fieldselect\" ng-class=\"{ expanded: isExpanded }\">\n" +
    "\n" +
    "	<div class=\"selected field\"\n" +
    "		 ng-click=\"isExpanded = !isExpanded\"\n" +
    "		 prevent-selection>{{selectedLabel}}</div>\n" +
    "\n" +
    "	<div class=\"fields\" ng-click=\"isExpanded = false\">\n" +
    "		<div class=\"field\"\n" +
    "			 ng-repeat=\"option in parsedOptions\"\n" +
    "			 ng-click=\"setSelected(option)\"\n" +
    "			 prevent-selection\n" +
    "			 >\n" +
    "			 {{option.label}}</div>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/Config/partials/formcontrols/presetConfig.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/Config/partials/formcontrols/presetConfig.html",
    "\n" +
    "<div ng-repeat=\"col in cols\"\n" +
    "	 class=\"preset-col\">\n" +
    "	<div class=\"controls\">\n" +
    "		<span class=\"preset-col-index\">({{$index}})</span>\n" +
    "		<sorter ng-model=\"cols\"\n" +
    "				index=\"$index\"></sorter>\n" +
    "		<span class=\"glyphicon delete\"\n" +
    "			  ng-click=\"remove($event, $index)\"\n" +
    "			  ng-class=\"{\n" +
    "			    'glyphicon-minus': removeIndex !== $index,\n" +
    "			  	'glyphicon-trash': removeIndex === $index,\n" +
    "			  	remove: removeIndex === $index\n" +
    "			  }\"\n" +
    "			  prevent-selection></span>\n" +
    "	</div>\n" +
    "		<fieldselect ng-model=\"col.value\"\n" +
    "					 options=\"colsCollection\"\n" +
    "					 label=\"label\"\n" +
    "					 value=\"value\"></fieldselect>\n" +
    "	<input type=\"text\"\n" +
    "		   ng-model=\"col.label\"\n" +
    "		   class=\"preset-col-label\"\n" +
    "		   auto-select />\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"preset-col preset-col-template\">\n" +
    "	<div class=\"controls\">\n" +
    "		<span class=\"preset-col-index\">({{cols.length}})</span>\n" +
    "		<sorter ng-model=\"newcol\"\n" +
    "				index=\"0\"></sorter>\n" +
    "		<span class=\"glyphicon glyphicon-plus add\"\n" +
    "			  ng-click=\"add(newcol[0])\"\n" +
    "			  prevent-selection></span>\n" +
    "	</div>\n" +
    "		<fieldselect ng-model=\"newcol[0]\"\n" +
    "					 options=\"colsCollection\"\n" +
    "					 label=\"label\"></fieldselect>\n" +
    "	<input type=\"text\"\n" +
    "		   ng-model=\"newcol[0].label\"\n" +
    "		   class=\"preset-col-label\"\n" +
    "		   auto-select />\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/Config/partials/formcontrols/sorter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/Config/partials/formcontrols/sorter.html",
    "\n" +
    "<span class=\"glyphicon glyphicon-chevron-up sorter-up\"\n" +
    "	  ng-class=\"{disabled: $first}\"\n" +
    "	  ng-click=\"!$first &amp;&amp; up()\"\n" +
    "	  prevent-selection></span>\n" +
    "<span class=\"glyphicon glyphicon-chevron-down sorter-down\"\n" +
    "	  ng-class=\"{disabled: $last}\"\n" +
    "	  ng-click=\"!$last &amp;&amp; down()\"\n" +
    "	  prevent-selection></span>\n" +
    "");
}]);

angular.module("app/Config/partials/preset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/Config/partials/preset.html",
    "\n" +
    "<div class=\"menu\">\n" +
    "	<a href=\"#/dpsmeter\" class=\"glyphicon glyphicon-tasks menu-item\"></a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"config\">\n" +
    "\n" +
    "	<h1>{{title}}: {{preset.name}}</h1>\n" +
    "\n" +
    "	<div class=\"preset-name\">\n" +
    "		<span>Name: </span><input type=\"text\" ng-model=\"preset.name\" />\n" +
    "	</div>\n" +
    "\n" +
    "	<preset-config cols=\"preset.cols\"></preset-config>\n" +
    "\n" +
    "	<div>\n" +
    "		<a href=\"#/config\" class=\"glyphicon glyphicon-arrow-left\"></a>\n" +
    "		<a href=\"#/config\" class=\"glyphicon glyphicon-ok\" ng-click=\"save()\"></a>\n" +
    "	</div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/Debug/debug.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/Debug/debug.html",
    "\n" +
    "<p>\n" +
    "	Ooops! Looks like something went wrong<br />\n" +
    "	Please send the following informations to the developper with a detailled explanation of what you were trying to achieve before breaking his work, he will surely know what to do with it and fix the problem <small>(or ditch it under a rag, pretending nothing happened... ever. Who knows ?)</small>\n" +
    "</p>\n" +
    "\n" +
    "<div>{{loc.path()}}</div>\n" +
    "<div>{{loc.url()}}</div>\n" +
    "<div>{{loc.absUrl()}}</div>\n" +
    "");
}]);

angular.module("app/DpsMeter/dpsmeter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/DpsMeter/dpsmeter.html",
    "\n" +
    "<div class=\"menu\">\n" +
    "\n" +
    "	<a class=\"glyphicon menu-item\"\n" +
    "	   ng-class=\"{\n" +
    "	   	'glyphicon-object-align-top':		!expandFromBottom,\n" +
    "	   	'glyphicon-object-align-bottom':	expandFromBottom}\"\n" +
    "	   ng-click=\"setExpandFromBottom(!expandFromBottom)\"></a>\n" +
    "\n" +
    "	<a href=\"#/config\"\n" +
    "	   class=\"glyphicon glyphicon-cog menu-item\"></a>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div>\n" +
    "	<encounter encounter=\"encounter\" active=\"active\"></encounter>\n" +
    "	<combatants combatants=\"combatants\"></combatants>\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/DpsMeter/partials/combatant.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/DpsMeter/partials/combatant.html",
    "\n" +
    "	<td ng-repeat=\"col in cols\" ng-class=\"[{job: $first}, col.value]\">{{combatant[col.value]}}</td>\n" +
    "\n" +
    "");
}]);

angular.module("app/DpsMeter/partials/combatants.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/DpsMeter/partials/combatants.html",
    "<div class=\"combatants\">\n" +
    "\n" +
    "	<table>\n" +
    "			<tr class=\"tableheader\">\n" +
    "				<th class=\"header\"\n" +
    "					ng-repeat=\"header in headers\"\n" +
    "					ng-class=\"header.value\">{{header.label}}</th>\n" +
    "			</tr>\n" +
    "			<tr combatant=\"combatant\"\n" +
    "				bestdps=\"bestdps\"\n" +
    "				ng-repeat=\"combatant in combatants track by combatant.name\"\n" +
    "				ng-class=\"combatant.Job\"\n" +
    "				class=\"combatant\"></tr>\n" +
    "			<tr ng-hide=\"combatants\">\n" +
    "				<td colspan=\"{{headers.length}}}\" class=\"waiting\">\n" +
    "					<div class=\"message\">--- Waiting for Data ---</div>\n" +
    "				</td>\n" +
    "			</tr>\n" +
    "	</table>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/DpsMeter/partials/encounter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/DpsMeter/partials/encounter.html",
    "<div class=\"encounter\" ng-class=\"{active: active}\">\n" +
    "	<div class=\"encounter-duration\">\n" +
    "		{{encounter.duration}}\n" +
    "	</div>\n" +
    "	<div class=\"encounter-encdps\">\n" +
    "		{{encounter.encdps}}\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);
