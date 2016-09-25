angular.module('carousel').controller('conductor', ['$scope', '$timeout',
	function($scope, $timeout){
		$scope.title = 'Hello world';
		$scope.scene = [true, false, false];
		$scope.showScene = function(index){
			$timeout.cancel(timePromise);
			allFalse();
			this.scene[index] = true;
			startFromRotation(index);
		};
		$scope.initRotation = function(){
			startRotation();
		};
		var timePromise;
		var rotate = function(index){
			var follower = index + 1;
			if(index === 0 || index === 1){
				$scope.scene[index] = false;
				$scope.scene[follower] = true;
			}
			else{
				$scope.scene[index] = false;
				$scope.scene[0] = true;
				follower = 0;
			}
			timePromise = $timeout(function(){
				rotate(follower);	
			}, 4000);
		};
		var allFalse = function(){
			$scope.scene = [false, false, false];
		};
		var startFromRotation = function(index){
			timePromise = $timeout(function(){
				rotate(index);
			}, 6000);
		};
		var startRotation = function(){
			timePromise = $timeout(function(){
				rotate(0);
			}, 6000);
		};
		
}]);
