angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope) {

})
   
.controller('signupCtrl', function($scope) {

})
   
.controller('organizationProfileCtrl', function($scope) {

})


.controller('editProfileCtrl', function($scope){
	
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
		  $scope.index += events.length;
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
	  
.controller('detailsCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'eventService',
    function ($scope, $stateParams, $window, $ionicPopup, eventService) {
	  console.log($stateParams);	
      $scope.loading = true;
      eventService.getOne($stateParams.id).then(function (event) {
        $scope.event = event;
      }).finally(function () {
        $scope.loading = false;
      });

      $scope.reload = function () {
        eventService.getOne($stateParams.id).then(function (event) {
          $scope.event = event;
        }).finally(function () {
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.call = function () {
        $window.open('tel:' + $scope.event.contact.tel, '_system');
      };

      $scope.mail = function () {
        $window.open('mailto:' + $scope.event.contact.email, '_system');
      };

      $scope.website = function () {
        $window.open($scope.event.website, '_system');
      };

      $scope.map = function () {
        if (ionic.Platform.isIOS()) {
          $window.open('maps://?q=' + $scope.event.lat + ',' + $scope.event.lng, '_system');
        } else {
          $window.open('geo://0,0?q=' + $scope.event.lat + ',' + $scope.event.lng + '(' + $scope.event.name + '/' + $scope.event.city + ')&z=15', '_system');
        }
      };

      $scope.report = function () {
        $ionicPopup.prompt({
          scope: $scope,
          title: '<span class="energized">Report an issue</span>',
          subTitle: '<span class="stable">What\'s wrong or missing?</span>',
          inputType: 'text',
          inputPlaceholder: ''
        }).then(function (res) {
          if (res) {
            // here connect to backend and send report
          }
        });
      };
    }
  ])
   
.controller('settingsCtrl', function($scope) {

})
 