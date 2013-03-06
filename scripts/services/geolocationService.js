angular.module('InTheZone')
	.service('geolocationService', function($window){
		
		var pos = {
			lat: false,
			lng: false
		};

		return {
			getCurrentPosition : function(cb) {
				if($window.navigator.geolocation) {
		      $window.navigator.geolocation.getCurrentPosition(
		      	function(position) {
		      		pos.lat = position.coords.latitude;
		      		pos.lng = position.coords.longitude;
		        	cb(false, pos);
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