'use strict';

/**
 * Register modules.
 */
angular.module('VerticalRangeSlider', []);
angular.module('TimeFormatsModule', []);
angular.module('ngExperiments', []);
angular.module('geolocationService', []);
// angular.module('geonamesTimezoneService', []);

/**
 * Register "In the Zone" main application module
 */
angular.module('InTheZone', [
		'VerticalRangeSlider'
	, 'TimeFormatsModule'
	, 'ngExperiments'
	, 'geolocationService'
	// , 'geonamesTimezoneService'
]);
