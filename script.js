angular.module("Experimentals", [])
	
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
	});

function EperimentalCtrl($scope) {

	$scope.log = function() {
		console.log(arguments);
	}

}
