angular.module('InTheZone')
	.service('geolocationService', function($window){
		
		return {
			getCurrentPosition : function(cb) {
				if($window.navigator.geolocation) {
		      $window.navigator.geolocation.getCurrentPosition(
		      	function(position) {
		        	cb(false, {
		        		lat: position.coords.latitude,
		        		lng: position.coords.longitude
		        	});
		      	}, 
		      	function() {
		      		cb(true);
		      	}
		      );  
		    } 
		    else {
		      cb(true);
		    }		
			}
		}
	});