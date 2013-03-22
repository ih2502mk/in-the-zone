angular.module('InTheZone')
.controller('MainCtrl', ['$scope'
	, 'timeZonesService'
	, 'geolocationService'
	, 'geonamesTimezoneService' 
	, function($scope, timeZonesService, 
			geolocationService, geonamesTimezoneService) {

		$scope.timeZones = timeZonesService.getTimeZones();

		geolocationService.getCurrentPosition(function(err, position) {
			if(!err) {				
				geonamesTimezoneService
					.getTimezone(position.lat, position.lng, function(err, data){
					
					$scope.timeZones[timeZonesService.gmtZeroIndex + data]["current"] = true;
				});
			}
		});

		$scope.range = {
			"topValue" : 12,
			"bottomValue" : 35,
			"topPx" : 0,
			"bottomPx" : 0
		};
	}
]);
