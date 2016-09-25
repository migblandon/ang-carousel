angular.module('carousel').controller('conductor', ['$scope', 
	function($scope){
		$scope.title = 'Hello world';
		$scope.scene = [false, false, true];
		$scope.showScene = function(index){
			this.scene = [false, false, false];
			this.scene[index] = true;
		};
}]);
