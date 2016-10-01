angular.module('carousel').controller('conductor', ['$scope', '$timeout',
	function($scope, $timeout){
		/**
		 * <--REPLACE WITH YOUR OWN PATHS-->
		 */
		$scope.images = [
			{path: '/carousel/images/Technique-for-Faster-Web-Development.jpg'},
			{path: '/carousel/images/webdevelopment.jpg'},
			{path: '/carousel/images/web-development-cropped.jpg'}
		
		];
		/**
		 * local var: startingDelay and followUpDelay
		 * startingDelay: The time it takes for the second image to show.
		 * followUpDelay : The time it takes after the second image shows and then after.
		 */
		var startingDelay = 6000; //Default starting delay before moving to show next image
		var followUpDelay = 4000; //Default follow up delay timing after the starting delay
		/**
		 * scope var: scene.
		 * scene get initialize automatically according to the amount of images.
		 */
		$scope.scene = [];
		/**
		 * local var: timePromise
		 * the promice to show the next image is held, just in case the user wants to click on another image.
		 */
		var timePromise;
		/**
		 * scope func: showScene
		 * cancels any future change when carousel open and starts new again from image picked
		 * param: index is the image picked by the user
		 */
		$scope.showScene = function(index){
			$timeout.cancel(timePromise);
			allFalse();
			this.scene[index] = true;
			startFromRotation(index);
		};
		/**
		 * scope func: initRotation
		 * Initialize the view and start rotation
		 */
		$scope.initRotation = function(){
			startView();
			startRotation();
		};
		/**
		 * scope func: ifOnView
		 * Determines which image is the one on on the current view
		 * param: place is the index of the image
		 * param: index is the image on view
		 */
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
		/**
		 * local func: rotate
		 * determines where the next image is located and saves a promise with 
		 * 	a determine amount of time to change image again.
		 * param: index is the current location of the image
		 */
		var rotate = function(index){
			var follower = index + 1;
			if(index < $scope.images.length- 1){
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
			}, followUpDelay);
		};
		/**
		 * local func: allFalse
		 * Makes all the images hide
		 */
		var allFalse = function(){
			for (var i = 0 ; i < $scope.images.length ; i++){
				$scope.scene[i] = false;
			}
		};
		/**
		 * local func: startFromRotation
		 * Starts rotation again when the user clicks on an image
		 * param: index is the image clicked
		 */
		var startFromRotation = function(index){
			timePromise = $timeout(function(){
				rotate(index);
			}, startingDelay);
		};
		/**
		 * local func: startRotation
		 * Starts rotation from the beggining
		 */
		var startRotation = function(){
			timePromise = $timeout(function(){
				rotate(0);
			}, startingDelay);
		};
		
}]);
