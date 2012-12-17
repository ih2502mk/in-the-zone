angular.module("TimeFormatsModule", []).
	filter('value48ToTime', function() {
		return function(value, format) {
			format = format || TIME_FORMAT_24H;
		   
	    var hrs = parseInt(Math.floor(value / 2))
	      , mins = (value % 2) ? "30" : "00"
	      , a = false;
	    
	    hrs = (hrs < 0) ? 24 + hrs : hrs;
	    hrs = (hrs > 24) ? hrs - 24 : hrs;

	    if (format === TIME_FORMAT_12H) {
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

function TimeZoneController($scope) {
	var 
		  TIME_FORMAT_24H = "24h"
		, TIME_FORMAT_12H = "12h"



	$scope.timeZones = [
		{
			"utc-offset" : -11,
			"active" : false,
			"current" : false,
			"timeFormat" : TIME_FORMAT_24H
		},
		{
			"utc-offset" : -10,
			"active" : false,
			"current" : false,
			"timeFormat" : TIME_FORMAT_24H
		},
		{
			"utc-offset" : -9,
			"active" : false,
			"current" : false,
			"timeFormat" : TIME_FORMAT_24H
		},

	];

	$scope.range = {
		"topValue" : 35,
		"bottomValue" : 12
	};
}