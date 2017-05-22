
angular.module('enilia.overlay', ['ngRoute',
								  'enilia.overlay.tpls',
								  'enilia.overlay.dpsmeter',
								  'enilia.overlay.config',
								  'enilia.overlay.dbmanager'])

	.constant('VERSION', '{#VERSION#}')

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				redirectTo: '/dpsmeter',
			})
			.otherwise({
				templateUrl: 'app/Debug/debug.html',
				controller: 'debugController'
			});
	}])

	.factory('sanitize',
		function sanitizeFactory() {
			return function sanitize(unsafe) {
			  	if(angular.isObject(unsafe)) {
			  		angular.forEach(unsafe, function(value, key) {
			  			unsafe[key.replace(/%/g, 'Pct')] = sanitize(value);
			  		});
				}
				return unsafe;
			}
		})

	.controller('overlayController',
		['$scope',
		  '$document',
		  'userManager',
		  'sanitize',
		  '$route',
		  function($scope, $document, userManager, sanitize, $route) {

		  		$scope.$on('$routeChangeStart', function($event, next) {
		  			if(!userManager.isUserDefined() && !next.$$route.isLoginManager) {
		  				$event.preventDefault();
		  				userManager.load().then($route.reload)
		  			}
		  		});

				$scope.state = { isLocked: true };

				$document.on('onOverlayStateUpdate', stateUpdate);
				$document.on('onOverlayDataUpdate', dataUpdate);

			    function stateUpdate(e) {
			        $scope.$apply(function() {
			        	$scope.state = e.detail;
			        });
			    }

			    function dataUpdate (e) {
			    	var session = userManager.getSession();
					session.encounter = sanitize(e.detail.Encounter);
					session.combatants = sanitize(e.detail.Combatant);
					session.active = e.detail.isActive;
			    }

			    $scope.setExpandFromBottom = function(value, save) {
			    	$scope.expandFromBottom = value;
			    	if(save !== false) {
			    		userManager.set('expandFromBottom', value);
			    	}
			    }

			    $scope.getExpandFromBottom = function() {
			    	return userManager.get('expandFromBottom');
			    }
		}])

	.controller('debugController',
		['$scope', '$location',
		function($scope, $location) {

			$scope.loc = $location;

		}])

;
