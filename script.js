function TimeZoneController($scope) {
	$scope.timeZones = [
		{
			"utc-offset" : -11,
			"active" : false,
			"current" : false,
			"timeFormat" : "24h" // 24h or "12h"
		},
		{
			"utc-offset" : -10,
			"active" : false,
			"current" : false,
			"timeFormat" : "24h"
		}
	];

	$scope.range = {
		"topValue" : 35
		"bottomValue" : 12
	};

	$scope.valueToTime = function(value, format) {
		format = format || "24h";
		
	}
}