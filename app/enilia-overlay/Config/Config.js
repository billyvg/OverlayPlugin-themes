;(function() {

angular.module('enilia.overlay.config', ['ngRoute',
										 'enilia.overlay.tpls',
										 'enilia.overlay.dpsmeter',
										 'enilia.overlay.dbmanager'])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/config', {
				templateUrl: 'app/Config/config.html',
				controller: 'configController'
			})
			.when('/config/preset/new', {
				templateUrl:'app/Config/partials/preset.html',
				controller: 'newPresetController'
			})
			.when('/config/preset/:presetId/edit', {
				templateUrl:'app/Config/partials/preset.html',
				controller: 'editPresetController'
			})
			.when('/config/preset/:cloneId/clone', {
				templateUrl:'app/Config/partials/preset.html',
				controller: 'clonePresetController'
			})
	}])

	.controller('configController',
		['$scope', 'presetManager', '$document',
		function configController($scope, presetManager, $document) {

			$scope.presets = presetManager.getAll();
			$scope.selectedPreset = presetManager.get();
			$scope.select = function select(preset) {
				$scope.selectedPreset = presetManager.set(preset);
			}
			$scope.remove = function($event, preset) {
				if($scope.checkRemove === preset) {
					presetManager.remove(preset);
				} else {
					$scope.checkRemove = preset;
					$document.one('click', function() {
						$scope.$apply(function() {
							delete $scope.checkRemove;
						});
					});
					$event.stopPropagation();
				}
			};

		}])

	.controller('editPresetController',
		['$scope', '$routeParams', 'presetManager',
		function configPresetController($scope, $routeParams, presetManager) {

			$scope.title = "Editing";

			$scope.preset = angular.copy(presetManager.get(parseInt($routeParams.presetId)));

			$scope.save = function() {
				presetManager.update($scope.preset);
			};

		}])

	.controller('newPresetController',
		['$scope', 'presetManager',
		function configPresetController($scope, presetManager) {

			$scope.title = "Creating";

			$scope.preset = presetManager.$getDefault();

			$scope.save = function() {
				presetManager.add($scope.preset);
			};

		}])

	.controller('clonePresetController',
		['$scope', '$routeParams', 'presetManager',
		function configPresetController($scope, $routeParams, presetManager) {

			$scope.title = "Cloning";

			$scope.preset = angular.copy(presetManager.get(parseInt($routeParams.cloneId)));

			$scope.save = function() {
				presetManager.add($scope.preset);
			};

		}])

	.directive('preventSelection', ['$window',
		function preventSelectionDirective($window) {
			return {
				restrict:'A',
				link:function(scope, element) {
					element.on('mousedown', function() {
						$window.requestAnimationFrame(function() {
							$window.getSelection().removeAllRanges();
						});
					})
				}
			}
		}])

	.directive('autoSelect', ['$window',
		function autoSelectDirective($window) {
			return {
				restrict:'A',
				link:function(scope, element) {
					element.on('click', function() {
						if($window.getSelection().toString().length) return;
						element[0].select();
					})
				}
			}
		}])

	.directive('presetConfig', function presetConfigDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/presetConfig.html',
			scope: {
				cols: '='
			},
			controller:['$scope', '$document', 
				function($scope, $document) {

					$scope.colsCollection = [
						{label:  'Name',value: 'name'},{label:  'Duration',value: 'duration'},{label:  'Duration (s)',value: 'DURATION'},
						{label:  'Damage',value: 'damage'},{label:  'Damage (m)',value: 'damage-m'},{label:  'Damage (k)',value: 'DAMAGE-k'},
						{label:  'Damage(M)',value: 'DAMAGE-m'},{label:  'Damage (%)',value: 'damagePct'},{label:  'dps',value: 'dps'},
						{label:  'DPS',value: 'DPS'},{label:  'DPS (k)',value: 'DPS-k'},{label:  'Encdps',value: 'encdps'},
						{label:  'ENCDPS',value: 'ENCDPS'},{label:  'ENCDPS (k)',value: 'ENCDPS-k'},{label:  'Hits',value: 'hits'},
						{label:  'Crit Hits',value: 'crithits'},{label:  'Crit Hits (%)',value: 'crithitPct'},{label:  'Misses',value: 'misses'},
						{label:  'Hit Failed',value: 'hitfailed'},{label:  'Swings',value: 'swings'},{label:  'Accuracy',value: 'tohit'},
						{label:  'ACCURACY',value: 'TOHIT'},{label:  'Best Attack',value: 'maxhit'},{label:  'Best Damage',value: 'MAXHIT'},
						{label:  'Healed',value: 'healed'},{label:  'Healed (%)',value: 'healedPct'},{label:  'Enchps',value: 'enchps'},
						{label:  'ENCHPS',value: 'ENCHPS'},{label:  'ENCHPS (k)',value: 'ENCHPS-k'},{label:  'Crit Heals',value: 'critheals'},
						{label:  'Crit Heals (%)',value: 'crithealPct'},{label:  'Heals',value: 'heals'},{label:  'Cures',value: 'cures'},
						{label:  'Best Heal',value: 'maxheal'},{label:  'Max Heal',value: 'MAXHEAL'},{label:  'Best Heal Ward',value: 'maxhealward'},
						{label:  'Max Heal Ward',value: 'MAXHEALWARD'},{label:  'Damage Taken',value: 'damagetaken'},{label:  'Heals Taken',value: 'healstaken'},
						{label:  'Powerdrain',value: 'powerdrain'},{label:  'Powerheal',value: 'powerheal'},{label:  'Kills',value: 'kills'},
						{label:  'Deaths',value: 'deaths'},{label:  'Threat Str',value: 'threatstr'},{label:  'Threat Delta',value: 'threatdelta'},
						{label:  'Name (3)',value: 'NAME3'},{label:  'Name (4)',value: 'NAME4'},{label:  'Name (5)',value: 'NAME5'},
						{label:  'Name (6)',value: 'NAME6'},{label:  'Name (7)',value: 'NAME7'},{label:  'Name (8)',value: 'NAME8'},
						{label:  'Name (9)',value: 'NAME9'},{label:  'Name (10)',value: 'NAME10'},{label:  'Name (11)',value: 'NAME11'},
						{label:  'Name (12)',value: 'NAME12'},{label:  'Name (13)',value: 'NAME13'},{label:  'Name (14)',value: 'NAME14'},
						{label:  'Name (15)',value: 'NAME15'},{label:  'Last 10s DPS',value: 'Last10DPS'},{label:  'Last 30s DPS',value: 'Last30DPS'},
						{label:  'Last 60s DPS',value: 'Last60DPS'},{label:  'Job',value: 'Job'},{label:  'Parry (%)',value: 'ParryPct'},
						{label:  'Block (%)',value: 'BlockPct'},{label:  'Inc To Hit',value: 'IncToHit'},{label:  'OverHeal (%)',value: 'OverHealPct'},
					];

					$scope.remove = function($event, index) {
						if($scope.removeIndex === index) {
							$scope.cols.splice(index, 1);
						} else {
							$scope.removeIndex = index;
							$document.one('click', function() {
								$scope.$apply(function() {
									$scope.removeIndex = -1;
								});
							});
							$event.stopPropagation();
						}
					};


					$scope.newcol = [{label:  'Name',value: 'name'}];

					$scope.add = function(newcol) {
						$scope.cols.push(angular.copy(newcol));
					}
				}],
		}
	})

	.directive('fieldselect', function fieldselectDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/fieldselect.html',
			scope: {
				ngModel: '=',
				options: '=',
				label: '@?',
				value: '@?',
				onChange:'=?',
			},
			controller:['$scope', '$parse',
				function fieldselectController($scope, $parse) {

					var parsedOptions = $scope.parsedOptions = []
					  , getLabel = $scope.label ? ($scope.label === "{key}" ? getKey : $parse($scope.label)) : angular.identity
					  , getValue = $scope.value ? $parse($scope.value) : angular.identity
					  ;

	  				function getKey(option, key) {
	  					return key;
	  				}

					angular.forEach($scope.options, function(option, key) {
						var obj = {
								label:getLabel(option) || getLabel(null, key),
								value:getValue(option)
							};
						if(angular.equals(obj.value, $scope.ngModel)) $scope.selectedLabel = obj.label;
						parsedOptions.push(obj);
					});

					$scope.setSelected = function(option) {
						$scope.ngModel = angular.copy(option.value);
						$scope.selectedLabel = option.label;
						($scope.onChange || angular.identity)(option.value);
					};
				}],
		}
	})

	.directive('checkbox', function checkboxDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/checkbox.html',
			scope: {
				checked: '='
			},
			controller:['$scope',
				function checkboxController ($scope) {
				
					$scope.click = function click () {
						$scope.checked = !$scope.checked;
					};

				}],
		}
	})

	.directive('sorter', function sorterDirective() {
		return {
			restrict:'E',
			templateUrl:'app/Config/partials/formcontrols/sorter.html',
			scope: {
				ngModel:'=',
				$index:'=index',
				sortableDirection:'@?',
			},
			controller:['$scope',
				function sorterController ($scope) {

					function setScope() {
						$scope.$first = ($scope.$index === 0);
						$scope.$last = ($scope.$index === ($scope.ngModel.length - 1));
					}

					$scope.$watch('$index', setScope);
					$scope.$watch('ngModel.length', setScope);
				
					$scope.up = function up() {
						if($scope.$first) return;
						var move = $scope.ngModel.splice($scope.$index, 1);
						$scope.ngModel.splice($scope.$index-1, 0, move[0]);
					};
					$scope.down = function down() {
						if($scope.$last) return;
						var move = $scope.ngModel.splice($scope.$index, 1);
						$scope.ngModel.splice($scope.$index+1, 0, move[0]);
					};

				}],
		}
	})

	

})();