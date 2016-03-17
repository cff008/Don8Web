angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('organizationProfileCtrl', function($scope) {

})

.controller('myEventsCtrl', function($scope) {

})

.controller('editProfileCtrl', function($scope){
	
})

.controller('myEventsCtrl', [
    '$scope',
    '$state',
    'eventService',
    function ($scope, $state, eventService) {
		$scope.events = [];
		$scope.newEvents = [];
		$scope.index = 0;
      $scope.loadNext = function () {
        eventService.getNext($scope.index).then(function (events) {
		  $scope.index += 5;
		  $scope.newEvents = events;
		  $scope.events = $scope.events.concat($scope.newEvents);
		  $scope.$broadcast('scroll.infiniteScrollComplete');
        }).finally(function () {
          $scope.$broadcast('scroll.infiniteScrollComplete');
        });
      };
	  
	$scope.moreDataCanBeLoaded = function(){
		//hardcoded to be amount of dummy data will change once db hookups are in
		if($scope.index > 6){
			return false;
		}else{
			return true;
		}
	};
	}
	  ])
   
>>>>>>> 2d2f58c6ceed3835911ea43cc10e1477d0121e97
.controller('settingsCtrl', function($scope) {

})
 