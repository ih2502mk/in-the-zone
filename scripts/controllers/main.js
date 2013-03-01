angular.module('InTheZone')
	.controller('MainCtrl', [
		  '$scope'
		, 'timeZonesService'
		, 'geolocationService' 
		,  function($scope, timeZonesService, geolocationService){

		$scope.timeZones = timeZonesService.getTimeZones();

		geolocationService.getCurrentPosition(function(err, position) {
			if(!err) {
				console.log(position);
			}
		});

		$scope.range = {
			"topValue" : 12,
			"bottomValue" : 35,
			"topPx" : 0,
			"bottomPx" : 0
		};
	}]);
