angular.module('app.controllers', [])
     
.controller('myProfileCtrl', function($scope) {

})
   
.controller('eventFeedCtrl', [
    '$scope',
    '$state',
	'dataService',
    function ($scope, $state, dataService) {
      $scope.search = {};
	  $scope.events = [];
	  $scope.event = {}
	  $scope.newEvents = [];
	  $scope.index = 0;
	  addFive = function(eventss,index){
		var tempevents = [], i = index;
		for (i; i < eventss.length; i = i + 1) {
            if(i == index+5){
				break;
			}
         tempevents.push(eventss[i]);
		}
		return tempevents;
		};
	  
      $scope.goToList = function () {
		$scope.temp = {search:$scope.search.string};
	
		
		
        $state.go('tabsController.results', $scope.temp );
		
      };}
	])
   
.controller('myEventsCtrl', [
    '$scope',
    '$state',
    'dataService',
	'$rootScope',
    function ($scope, $state, dataService, $rootScope) {
		$scope.events = [];
		$scope.newEvents = [];
		$scope.index = 0;
		$scope.event = {};
	 addFive = function(eventss,index){
		var tempevents = [], i = index;
		for (i; i < eventss.length; i = i + 1) {
            if(i == index+5){
				break;
			}
         tempevents.push(eventss[i]);
		}
		return tempevents;
		};
	  
	 $scope.goToEditEvent = function(){
		$scope.temp = -1;
		$state.go('tabsController.editEvent', $scope.temp);
	 }

	 $scope.loadNext = function () {
		if($scope.events.length == 0){
		dataService.getMyEvents($rootScope.userid).then(function(events){
			$scope.newEvents = events;
			// .then(function (events) {
			  if($scope.newEvents){
			  
			  if($scope.newEvents != $scope.events){
			  $scope.events = $scope.events.concat(addFive($scope.newEvents,$scope.index));
			  $scope.index += $scope.newEvents.length;
			  }
			  $scope.$broadcast('scroll.infiniteScrollComplete');
			}else{
			 $scope.events = [];
			}
		// .finally(function () 
			});
		}
		else{
			if($scope.newEvents != $scope.events){
			  $scope.events = $scope.events.concat(addFive($scope.newEvents,$scope.index));
			  $scope.index += $scope.newEvents.length;
			  }
			 $scope.$broadcast('scroll.infiniteScrollComplete');
		}
      };
	  
	$scope.moreDataCanBeLoaded = function(){
		if($scope.newEvents){
		if($scope.newEvents.length == $scope.index && $scope.newEvents.length != 0){
			return false;
		}else{
			return true;
		}}else {
			return true;
		}
	};
	}
	  ])
   
.controller('settingsCtrl', function($scope) {
  $scope.data = {};

  //TODO: Add functions(s) to update settings based on user input

})
   
.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state) {

	//Login verifier
	$scope.data = {};
    $scope.login = function() {
    	console.log("LOGIN user: " + $scope.data.email + " - PW: " + $scope.data.password);	//TODO: This will need to be taken out for security reasons
        LoginService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
            $state.go('tabsController.myProfile');
            console.log("Successful login");
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials! Username: user Password: secret'
            });
            console.log("Unsuccessful login");
        });
    }
})

.controller('forgotPasswordCtrl', function($scope) {
  $scope.data = {};

  $scope.submitEmail = function(){
    //TODO: call service to validate the email address

    //TODO: alert user to check email / of invalid email address
  }
})
   
.controller('signupCtrl', function($scope, SignupService, $ionicPopup, $state) {
  $scope.data = {};

    $scope.signup = function(){
      console.log("Account Created: NAME: " + $scope.data.username + " - EMAIL: " + $scope.data.email + " - PW: " + $scope.data.password); //TODO: remove this line for security reasons

      SignupService.signupUser($scope.data.username, $scope.data.email, $scope.data.password).success(function(data) {
        $state.go('tabsController.myProfile');
        var alertPopup = $ionicPopup.alert({
          title: 'Welcome to Don8!',
          template: 'Please fill out your user profile'
        });
      })
      .error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Unable to create account'
        });
      });
    }

})
   
.controller('editProfileCtrl', function($scope) {

})
.controller('organizationProfileCtrl', function($scope) {

})
.controller('detailCtrl', [
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

  
.controller('editEventCtrl', [
	'$scope',
	'$stateParams',
	'dataService',
	'$state',
	function ($scope, $stateParams, dataService,$state){
		$scope.event = {};
		var id = $stateParams;
		if(id != 0){
			$scope.loading = true;
			dataService.getEvent(id).then(function (event) {
			if(event){$scope.event = event;
			}
				$scope.loading = false;
			});
		}else{
		
		}
		
		/*$scope.submit = function() {
			dataService.addEvent().then{
				$state.go('tabsController.myEvents');
			};
		};
		
		$scope.dataCheck = function(){
			//maybe need later
		}'*/
	}
	])
 
.controller('detailsCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'dataService',
    function ($scope, $stateParams, $window, $ionicPopup, dataService) {
	  $scope.event = {};
	  var i = 0,
	  id = $stateParams.id;
	  console.log($stateParams);	
      $scope.loading = true;
	  dataService.getEvent(id).then(function(events){
		$scope.event = events;
      }).finally(function () {
        $scope.loading = false;

      });

      $scope.reload = function () {
		$scope.loading = true;
		//issues: being given a array from backend
        dataService.getEvent(id).then(function(events){
		$scope.event = events;
      }).finally(function () {
        $scope.loading = false;

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