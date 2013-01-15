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

	.directive('vRangeSlider', function factory($document){
		var disableUserSelect = function() {
			$document[0].body.style.webkitUserSelect = "none";
			$document[0].body.style.MozUserSelect = "none";
			$document[0].body.style.userSelect = "none";
		}

		var enableUserSelect = function() {
			$document[0].body.style.webkitUserSelect = "all";
			$document[0].body.style.MozUserSelect = "all";
			$document[0].body.style.userSelect = "all";		
		}

		return {
			template : 
					'<div class="slider" >' 
				+ '<div class="range"></div>'
				+ '<a class="slider-handle top" ></a>'
				+ '<a class="slider-handle bottom" ></a>'
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
				scope.topValue = scope.topValue || attrs.min;
				scope.bottomValue = scope.bottomValue || attrs.max

				element.css({
					"position": "relative",
					"width" : "100%",
					"height" : "100%"
				});

				var range = element.find('div')
					,	topHandle = angular.element(element.find('a')[0])
					, bottomHandle = angular.element(element.find('a')[1])
					, elementHeight = element[0].clientHeight
					;

				topHandle.css({
					"display" : "block",
					"position" : "absolute",
					"width" : "100%",
					"height" : "5px",
					"backgroundColor" : "#4a757d",
					"top" : 0
				});

				bottomHandle.css({
					"display" : "block",
					"position" : "absolute",
					"width" : "100%",
					"height" : "5px",
					"backgroundColor" : "#00757d",
					"top" : (elementHeight - 5) + "px"  
				});

				range.css({
					"position" : "absolute",
					"width" : "100%",
					"backgroundColor" : "#31c8e3",
					"top" : topHandle[0].offsetTop + 3 + "px",
					"bottom" : elementHeight - bottomHandle[0].offsetTop - 3 + "px"
				});

				var topHandleHeight = topHandle[0].clientHeight
					, bottomHandleHeight = bottomHandle[0].clientHeight
					, pxStep = ( elementHeight 
						- topHandleHeight 
						- bottomHandleHeight ) / (attrs.max - attrs.min);
				
				scope.topMoving = false;
				scope.topCurrentY = topHandle[0].offsetTop || 0;
				scope.topOldY = 0;

				scope.bottomMoving = false;
				scope.bottomCurrentY = topHandle[0].offsetTop || 0;
				scope.bottomOldY = 0;

				topHandle.bind('mousedown', function(event){

					scope.topMoving = true;
					scope.topCurrentY = topHandle[0].offsetTop || 0;
					scope.topOldY = event.pageY;

					disableUserSelect();
				});

				bottomHandle.bind('mousedown', function(event){

					scope.bottomMoving = true;
					scope.bottomCurrentY = bottomHandle[0].offsetTop || 0;
					scope.bottomOldY = event.pageY;

					disableUserSelect();
				});

				$document.bind('mouseup', function(){
					scope.topMoving = false;
					scope.bottomMoving = false;
					
					enableUserSelect();					
				});

				$document.bind('mousemove', function(event){
					var offsetY
						, top;

					if (scope.topMoving) {
						offsetY = event.pageY - scope.topOldY;

						top = scope.topCurrentY + offsetY;
						if ( top < 0 ) { 
							top = 0 
						}
						else if ( top >= bottomHandle[0].offsetTop 
							- topHandleHeight ) {
							
							top = bottomHandle[0].offsetTop 
								- bottomHandle[0].clientHeight;
						}

						scope.topValue = Math.round(top / pxStep);						

						top = Math.round (pxStep * scope.topValue);
										
						topHandle.css({
							"top" : top + "px"								
						});

						range.css({
							"top" : top + 3 + "px"
						});
					
						scope.topOldY = event.pageY;

						scope.topCurrentY = scope.topCurrentY + offsetY;

						return false;
					}

					if (scope.bottomMoving) {
						offsetY = event.pageY - scope.bottomOldY;

						top = scope.bottomCurrentY + offsetY;
						if ( top <= topHandle[0].offsetTop + topHandleHeight ) { 
							top = topHandle[0].offsetTop + topHandleHeight 
						}
						else if ( top >= elementHeight - bottomHandle[0].clientHeight ) {
							top = elementHeight - bottomHandle[0].clientHeight;
						}

						top = Math.round (pxStep * Math.round(top / pxStep)) 
							+ topHandleHeight;
										
						bottomHandle.css({
							"top" : top + "px"								
						});

						range.css({
							"bottom" : elementHeight - top - 3 + "px"
						});
					
						scope.bottomOldY = event.pageY;

						scope.bottomCurrentY = scope.bottomCurrentY + offsetY;

						return false;
					}

				});

				scope.$watch('topValue', function(newValue, oldValue) {
					console.log(newValue);
				});

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
			"current" : true,
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

	$scope.topVal = 5;
}
