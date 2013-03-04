angular.module('InTheZone')
	.service("timeZonesService", function(){
		var timeZones = []
			,	gmtZeroIndex = 12;


		for (var i = -11; i <= 12; i++) {
			timeZones[timeZones.length] = {
				"utcOffset" : i,
				"active" : false,
				"current" : false,
				"timeFormat" : "24h"					
			}

			if(i === 0) {gmtZeroIndex = timeZones.length - 1;}
		}

		return {
			getTimeZones: function(){
				return timeZones;
			},
			gmtZeroIndex: gmtZeroIndex
		}
	});
