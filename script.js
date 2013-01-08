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
	})

	.directive('rangeSlider', function factory(){
		return {
			template : 
					'<div class="slider" >' 
				+ '<div class="range"></div>'
				+ '<a href="#" class="slider-handle top" ></a>'
				+ '<a href="#" class="slider-handle bottom" ></a>'
				+ '</div>',
			replace : true,
			restrict : "AEC",
			scope : {
				topValue : "=",
				bottomValue : "=",
				min : "@",
				max : "@",
				step : "@",
				onChange : "&"
			},
			link : function(scope, element, attrs) {
				var range = element.find('div')
					,	topHandle = element.find('a')[0]
					, bottomHandle = element.find('a')[1] ;



			}
		};
	})

	.directive('draggable', function factory($document){
		return {
			restrict : "AC",
			scope : {

			},
			link : function(scope, element, attrs) {
				element.css({
					"position" : "absolute",
					"width" : "100px",
					"height" : "100px",
					"backgroundColor" : "#ff0",
					"z-index" : 1000
				});

				scope.moving = false;
				
				scope.currentX = 0;
				scope.currentY = 0;
				scope.oldX = 0;
				scope.oldY = 0;

				element.bind('mousedown', function(event){
					scope.moving = true;
					scope.currentX = parseFloat(element.css("left")) || 0;
					scope.currentY = parseFloat(element.css("top")) || 0;
					scope.oldX = event.pageX;
					scope.oldY = event.pageY;

					$document[0].body.style.webkitUserSelect = "none";
					$document[0].body.style.MozUserSelect = "none";
					$document[0].body.style.userSelect = "none";
				});

				element.bind('mouseup', function() {
					scope.moving = false;
					
					$document[0].body.style.webkitUserSelect = "all";
					$document[0].body.style.MozUserSelect = "all";
					$document[0].body.style.userSelect = "all";
				});
				
				$document.bind('mousemove', function(event){
					if (scope.moving) {
						var offsetX = event.pageX - scope.oldX
							, offsetY = event.pageY - scope.oldY;
						
						element.css({
							"top" : scope.currentY + offsetY + "px",
							"left" : scope.currentX + offsetX + "px"
						});

						scope.oldX = event.pageX;
						scope.oldY = event.pageY;

						scope.currentX = scope.currentX + offsetX;
						scope.currentY = scope.currentY + offsetY;

						return false;
					}
				});


			}
		}
	})

	//an experimentation thing
	.directive('fooDir', function factory(){
		return {
			template : 
					'<div style="position: absolute; z-index: 1000;" >{{passedValue}}<br /><br /></div>',
			replace : true,
			restrict : "AEC",
			scope : {
				passedValue : "=",
				onAction : "&"		
			},
			link: function(scope, element, attrs) {
				element.bind('click', function(){
					scope.onAction({arg1 : 233, arg2 : "HELLO!"});	
				})
				console.log(element.find('br'));
			}
		};
	})

	;

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
			"timeFormat" : "12h"
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

	$scope.aaa = "Hello man!!!";

	$scope.log = function() {
		console.log(arguments);
	}
}
