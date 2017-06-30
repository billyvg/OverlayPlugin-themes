;(function() {

angular.module('enilia.overlay.dbmanager', ['enilia.overlay.tpls',
											'ngStorage'])

	.factory('userManager',
		['$localStorage', '$q',
		function userManagerFactory ($storage, $q) {

			var session = {
					encounter:{
						encdps: "0",
						duration: "00:00",
					},
					active: false
				}
			  , isLoading
			  ;

			return {
				get: function get(key) {
					return $storage[key];
				},

				set: function set(key, value) {
					$storage[key] = value;
				},

				getSession: function getSession() {
					return session;
				},

				isUserDefined: function isUserDefined () {
					return true;
				},

				load: function() {
					if(isLoading) return $q.reject();
					return isLoading = $q.resolve().then(function () {
						isLoading = false;
					})
				}
			}

		}])

	.factory('presetManager',
		['$localStorage',
		function presetManagerFactory ($storage) {

			function uidTest (uid) {
				return function(preset) {
					return preset.__uid === uid;
				}
			}

			function findPos(preset) {
				return $storage.presets.findIndex(uidTest(preset.__uid));
			}

			return {
				get: function getPreset(uid) {
					uid = uid || $storage.preset;
					return $storage.presets.find(uidTest(uid));
				},

				set: function setPreset(preset) {
					$storage.preset = preset.__uid;
					return preset;
				},

				getAll: function getAllPreset() {
					return $storage.presets;
				},

				update: function updatePreset (preset) {
					var index = findPos(preset);
					return ~index && $storage.presets.splice(index, 1, preset) && preset;
				},

				remove: function removePreset (preset) {
					var index = findPos(preset);
					return ~index && $storage.presets.splice(index, 1)[0];
				},

				add: function addPreset (preset) {
					preset.__uid = $storage.__uid++;
					return $storage.presets.push(preset) && preset;
				},

				$getDefault: function $getDefault () {
					return {
						name:'DPS',
						cols: [
							{label:  'Name',value: 'name'},
							{label:  'Encdps',value: 'encdps'},
							{label:  'Damage (%)',value: 'damagePct'},
						]
					}
				}
			}
		}])

	.run(['$localStorage', 'VERSION',
		function update($storage, VERSION) {
			if($storage.VERSION) {
				// Need to debug this. WHy is this returning null?
				var version = $storage.VERSION.match(/(\d+).(\d+).(\d+)(?:-(.+))/);
				// console.log($storage);
				//  major = version[1]
				//	minor = version[2]
				// patch = version[3]
				// build = version[4]

				/* Placeholder for future db patchs */
			} else {
				$storage.$reset({
					__uid:3,
					preset: 1,
					presets: [
						{
							__uid:1,
							name:'DPS',
							cols: [
								{label:  'Name',value: 'name'},
								{label:  'Dps',value: 'encdps'},
								{label:  'Dps%',value: 'damagePct'},
								{label:  'Crit%',value: 'crithitPct'},
								{label:  'Misses',value: 'misses'},
							]
						},
						{
							__uid:2,
							name:'Heal',
							cols : [
								{label:  'Name',value: 'name'},
								{label:  'Dps',value: 'encdps'},
								{label:  'Dps%',value: 'damagePct'},
								{label:  'Hps',value: 'enchps'},
								{label:  'Hps%',value: 'healedPct'},
								{label:  'OverHeal',value: 'OverHealPct'},
							]
						}
					],
					VERSION: VERSION,
				});
			}
		}])

	.run(function() {

	  if (!Array.prototype.findIndex) {
	    Array.prototype.findIndex = function(predicate) {
	      if (this == null) {
	        throw new TypeError('Array.prototype.findIndex appelé sur null ou undefined');
	      }
	      if (typeof predicate !== 'function') {
	        throw new TypeError('predicate doit être une fonction');
	      }
	      var list = Object(this);
	      var length = list.length >>> 0;
	      var thisArg = arguments[1];
	      var value;

	      for (var i = 0; i < length; i++) {
	        value = list[i];
	        if (predicate.call(thisArg, value, i, list)) {
	          return i;
	        }
	      }
	      return -1;
	    };
	  }

	  if (!Array.prototype.find) {
	    Array.prototype.find = function(predicate) {
	      if (this == null) {
	        throw new TypeError('Array.prototype.find a été appelé sur null ou undefined');
	      }
	      if (typeof predicate !== 'function') {
	        throw new TypeError('predicate doit être une fonction');
	      }
	      var list = Object(this);
	      var length = list.length >>> 0;
	      var thisArg = arguments[1];
	      var value;

	      for (var i = 0; i < length; i++) {
	        value = list[i];
	        if (predicate.call(thisArg, value, i, list)) {
	          return value;
	        }
	      }
	      return undefined;
	    };
	  }

	})

})();
