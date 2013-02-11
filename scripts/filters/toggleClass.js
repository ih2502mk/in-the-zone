// It's not needed anymore

angular.module('InTheZone')
	.filter('toggleClass', function() {
		return function(value, classStr) {
			return value ? classStr : "";
		}
	});
