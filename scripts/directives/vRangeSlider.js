angular.module('VerticalRangeSlider', [])
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
				max : "@"
			},
			compile : function (element, attrs) {
				
				
				return function link(scope, element, attrs) {
					var range = element.find('div')
						,	topHandle = angular.element(element.find('a')[0])
						, bottomHandle = angular.element(element.find('a')[1])					 
						;

					element.css({
						"position": "relative",
						"width" : "100%",
						"height" : "100%"
					});
					var elementHeight = element[0].clientHeight;

					topHandle.css({
						"display" : "block",
						"position" : "absolute",
						"width" : "100%",
						"height" : "5px",
						"backgroundColor" : "#4a757d",
						"top" : 0
					});
					var topHandleHeight = topHandle[0].clientHeight;

					bottomHandle.css({
						"display" : "block",
						"position" : "absolute",
						"width" : "100%",
						"height" : "5px",
						"backgroundColor" : "#00757d",
						"top" : (elementHeight - 5) + "px"  
					});
					var bottomHandleHeight = bottomHandle[0].clientHeight;

					range.css({
						"position" : "absolute",
						"width" : "100%",
						"backgroundColor" : "#31c8e3",
						"top" : topHandle[0].offsetTop + 3 + "px",
						"bottom" : elementHeight - bottomHandle[0].offsetTop - 3 + "px"
					});

					attrs.min = parseInt(attrs.min) || 0;
					attrs.max = parseInt(attrs.max) || (elementHeight 
						- topHandleHeight - bottomHandleHeight);

					scope.topValue = scope.topValue || attrs.min;
					scope.bottomValue = scope.bottomValue || attrs.max;

					var pxStep = ( elementHeight 
							- topHandleHeight 
							- bottomHandleHeight ) / (attrs.max - attrs.min);
					
					var topMoving = false
						, topCurrentY = topHandle[0].offsetTop || 0
						, topOldY = 0
						, bottomMoving = false
						, bottomCurrentY = topHandle[0].offsetTop || 0
						, bottomOldY = 0
						;

					topHandle.bind('mousedown', function(event){

						topMoving = true;
						topCurrentY = topHandle[0].offsetTop || 0;
						topOldY = event.pageY;

						disableUserSelect();
					});

					bottomHandle.bind('mousedown', function(event){

						bottomMoving = true;
						bottomCurrentY = bottomHandle[0].offsetTop || 0;
						bottomOldY = event.pageY;

						disableUserSelect();
					});

					$document.bind('mouseup', function(){
						topMoving = false;
						bottomMoving = false;
						
						enableUserSelect();					
					});

					$document.bind('mousemove', function(event){
						var offsetY
							, top;

						if (topMoving) {
							offsetY = event.pageY - topOldY;

							top = topCurrentY + offsetY;
							if ( top >= 0 && top <= bottomHandle[0].offsetTop - topHandleHeight) { 

								scope.topValue = Math.round(top / pxStep);
								scope.$apply();
							}				
						
							topOldY = event.pageY;

							topCurrentY = topCurrentY + offsetY;

							return false;
						}

						if (bottomMoving) {
							offsetY = event.pageY - bottomOldY;

							top = bottomCurrentY + offsetY;
							if ( top >= topHandle[0].offsetTop + topHandleHeight 
								&& top <= elementHeight - bottomHandle[0].clientHeight) { 
								
								scope.bottomValue = Math.round(top / pxStep);
								scope.$apply();
							}
							
							bottomOldY = event.pageY;

							bottomCurrentY = bottomCurrentY + offsetY;

							return false;
						}

					});

					scope.$watch('topValue', function(newValue, oldValue) {
						newValue = !isNaN(newValue) ? parseInt(newValue) : oldValue;
						newValue = newValue <= attrs.min ? attrs.min : newValue;
						newValue = newValue >= scope.bottomValue ? scope.bottomValue : newValue;

						var top = Math.round (pxStep * newValue);
										
						topHandle.css({
							"top" : top + "px"
						});

						range.css({
							"top" : top + 3 + "px"
						});
						
					});

					scope.$watch('bottomValue', function(newValue, oldValue) {
						newValue = !isNaN(newValue) ? parseInt(newValue) : oldValue;
						newValue = newValue <= scope.topValue ? scope.topValue : newValue;
						newValue = newValue >= attrs.max ? attrs.max : newValue;
						
						var top = Math.round (pxStep * newValue) 
								+ topHandleHeight;
											
						bottomHandle.css({
							"top" : top + "px"								
						});

						range.css({
							"bottom" : elementHeight - top - 3 + "px"
						});

					});

				} 
			}
		};
	})
