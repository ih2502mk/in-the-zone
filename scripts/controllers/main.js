angular.module('inTheZone')
	.controller('MainCtrl', function($scope){
		
		$scope.timeZones = [
			{
				"utcOffset" : -11,
				"active" : false,
				"current" : false,
				"timeFormat" : "24h"			
			},
			{
				"utcOffset" : -10,
				"active" : false,
				"current" : true,
				"timeFormat" : "12h"
			},
			{
				"utcOffset" : -9,
				"active" : false,
				"current" : false,
				"timeFormat" : "24h"
			}

		];

		$scope.range = {
			"topValue" : 35,
			"bottomValue" : 12
		};
	});
