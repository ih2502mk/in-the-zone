angular.module('InTheZone')
	.controller('MainCtrl', ["$scope", "timeZonesService", function($scope, timeZonesService){

		$scope.timeZones = timeZonesService.getTimeZones();

		$scope.range = {
			"topValue" : 12,
			"bottomValue" : 35,
			"topPx" : 0,
			"bottomPx" : 0
		};
	}]);
