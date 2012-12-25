angular.module("TimeFormatsModule", [])
	
	.filter('value48ToTime', function() {
		return function(value, format) {
			format = format || "24h";
		   
	    var hrs = parseInt(Math.floor(value / 2))
	      , mins = (value % 2) ? "30" : "00"
	      , a = "";
	    
	    hrs = (hrs < 0) ? 24 + hrs : hrs;
	    hrs = (hrs > 24) ? hrs - 24 : hrs;

	    if (format === "12h") {
	    	if (hrs > 12 ) {
	    		hrs = hrs - 12;
	    		a = " PM";
	    	}
	    	else if (hrs < 12) {
	    		a = " AM"
	    	}
	    	else if ( hrs === 12 && mins == "00" ) {
	    		a = " PM";	
	    	}
	    	else if ( hrs === 0 && mins == "00" ) {
	    		hrs = 12;
	    		a = " AM";	
	    	}
	    }

	    return hrs + ":" + mins + a;   
		}
	})

	.filter('classActive', function() {
		return function(value) {
			return value ? "active" : "";
		}
	});

function TimeZoneController($scope) {

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
			"current" : false,
			"timeFormat" : "24h"
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

	$scope.w = "25%";
}