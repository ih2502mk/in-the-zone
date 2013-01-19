'use strict';

/**
 * Register modules.
 */
angular.module('VerticalRangeSlider', []);
angular.module('TimeFormatsModule', []);

/**
 * Register "In the Zone" main application module
 */
angular.module('inTheZone', [
		'VerticalRangeSlider'
	, 'TimeFormatsModule'
]);
