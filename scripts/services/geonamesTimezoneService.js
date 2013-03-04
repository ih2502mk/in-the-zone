angular.module('InTheZone')
	.service('geonamesTimezoneService', function($http){

		var baseUrl = 'http://api.geonames.org/timezoneJSON'
			, username = 'ih2502mk'
			, callbackName = 'JSON_CALLBACK';

			return {
				getTimezone: function(lat, lng, cb) {
					var url = baseUrl
						+ '?lat=' + lat
						+ '&lng=' + lng
						+ '&username=' + username
						+ '&callback=' + callbackName;

					$http.jsonp(url, {method: 'GET'})
					.success(function(data, status){
						cb(false, data.rawOffset);
					})
					.error(function(data, status){
						cb(true);
					});
				}
			};
	});