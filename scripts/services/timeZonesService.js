angular.module('InTheZone')
	.service("timeZonesService", function(){
		var timeZones = [];


		for (var i = -11; i <= 12; i++) {
			timeZones[timeZones.length] = {
				"utcOffset" : i,
				"active" : false,
				"current" : false,
				"timeFormat" : "24h"					
			}
		}

		timeZones[3]["current"] = true;

		return {
			getTimeZones: function(){
				return timeZones;
			}
		}
	});
