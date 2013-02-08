angular.module('VerticalRangeSlider')
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
				+ '  <div class="range"></div>'
				+ '  <a class="slider-handle top" ></a>'
				+ '  <a class="slider-handle bottom" ></a>'
				+ '</div>',
			replace : true,
			restrict : "AEC",
			scope : {
				topValue : "=",
				bottomValue : "=",
				min : "@",
				max : "@",
				topPx : "=",
				bottomPx : "="
			},
			compile : function (element, attrs) {			
				var range = element.find('div')
					,	topHandle = angular.element(element.find('a')[0])
					, bottomHandle = angular.element(element.find('a')[1])					 
					;

				attrs["class"] && element.addClass(attrs["class"]);

				element.css({
					"position": "relative",
					"width" : "100%",
					"height" : "100%"
				});

				topHandle.css({
					"display" : "block",
					"position" : "absolute",
					"top" : 0
				});

				bottomHandle.css({
					"display" : "block",
					"position" : "absolute",					
					"bottom" : 0
				});

				range.css({
					"position" : "absolute",					
				});

				return function link(scope, element, attrs) {
					var range = element.find('div')
						,	topHandle = angular.element(element.find('a')[0])
						, bottomHandle = angular.element(element.find('a')[1])					
						, topHandleHeight = topHandle[0].clientHeight
						, bottomHandleHeight = bottomHandle[0].clientHeight

						, elementHeight = element[0].clientHeight
						, pxStep = elementHeight / (attrs.max - attrs.min);					
					
					topHandle.css({"top" : 0});
					
					bottomHandle.css({"bottom" : 0});

					attrs.min = parseInt(attrs.min) || 0;
					attrs.max = parseInt(attrs.max) || elementHeight;

					scope.topValue = scope.topValue || attrs.min;
					scope.bottomValue = scope.bottomValue || attrs.max;

					range.css({					
						"top" : scope.topValue * pxStep + "px",
						"bottom" : elementHeight - scope.bottomValue * pxStep + "px"
					});

					var topMoving = false
						, topCurrentY = topHandle[0].offsetTop || 0
						, topOldY = 0
						, bottomMoving = false
						, bottomCurrentY = bottomHandle[0].offsetTop || 0
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
							topOldY = event.pageY;

							top = topCurrentY + offsetY;
							if ( top >= 0 && top <= elementHeight - scope.bottomPx) { 

								scope.topValue = Math.round(top / pxStep);
								scope.$apply();
							}

							topCurrentY = topCurrentY + offsetY;

							return false;
						}

						if (bottomMoving) {
							offsetY = event.pageY - bottomOldY;
							bottomOldY = event.pageY;

							top = bottomCurrentY + offsetY;
							if ( top >= scope.topPx 
								&& top < elementHeight) { 
								
								scope.bottomValue = Math.round(top / pxStep);
								scope.$apply();
							}

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
							"top" : (top - topHandleHeight / 2)  + "px"
						});

						range.css({
							"top" : top + "px"
						});

						scope.topPx =  top;
						
					});

					scope.$watch('bottomValue', function(newValue, oldValue) {
						newValue = !isNaN(newValue) ? parseInt(newValue) : oldValue;
						newValue = newValue <= scope.topValue ? scope.topValue : newValue;
						newValue = newValue >= attrs.max ? attrs.max : newValue;
						
						var top = Math.round (pxStep * newValue);
											
						bottomHandle.css({
							"bottom" : (elementHeight - top - bottomHandleHeight / 2) + "px"								
						});

						range.css({
							"bottom" : elementHeight - top + "px"
						});

						scope.bottomPx = elementHeight - top;

					});

				} 
			}
		};
	})
