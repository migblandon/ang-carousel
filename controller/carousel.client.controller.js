angular.module('carousel').controller('conductor', ['$scope', '$timeout',
	function($scope, $timeout){
		$scope.images = [
			{path: '/carousel/images/teacher.jpg'},
			{path: '/carousel/images/students.png'},
			{path: '/carousel/images/participating.jpg'}
		
		];
		$scope.scene = [];
		$scope.showScene = function(index){
			$timeout.cancel(timePromise);
			allFalse();
			this.scene[index] = true;
			startFromRotation(index);
		};
		$scope.initRotation = function(){
			startView();
			startRotation();
		};
		$scope.ifOnView = function(place, index){
			if (place === index){
				return 'on-view';
			}
		};
		/**
		 * internal func: startView
		 * shows the first image and hides the rest
		 */
		var startView = function(){
			$scope.scene[0] = true;
			for (var i = 1 ; i < $scope.images.length ; i++){
				$scope.scene[i] = false;
			}
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
