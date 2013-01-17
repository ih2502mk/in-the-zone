angular.module('inTheZone')
	.filter('toggleClass', function() {
		return function(value, classStr) {
			return value ? classStr : "";
		}
	});
