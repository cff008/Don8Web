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
		$state.go('tabsController.createEvent', $scope.temp);
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
	
	$rootScope.$on('$stateChangeSuccess', 
		function(){ 
		
		$scope.loadNext();});
	
	}
	  ])
   
.controller('settingsCtrl', function($rootScope, $scope, SettingsService, $state, $ionicPopup) {

  $scope.data = {};


  $scope.getSettings = function() {

  }

  $scope.updateSettings = function() {

  }

  $scope.logout = function(){
    //TODO: clear information about current user - iteration3?
    
    //change state to login screen
    $state.go('login');
  }

})
   
.controller('loginCtrl', function($scope, $rootScope, LoginService, $ionicPopup, $state) {

  //Login verifier
  $scope.data = {};
    $scope.login = function() {

      console.log("LOGIN user: " + $scope.data.email + " - PW: " + $scope.data.password); //TODO: This will need to be taken out for security reasons
        LoginService.loginUser($scope.data.email, $scope.data.password).success(function(data) {
            $state.go('tabsController.organizationProfile');
            console.log("Successful login.");
        }).error(function(data) {
          //TODO: do different things for invalid password and server errors
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: data
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

      SignupService.signupUser($scope.data.org_name, $scope.data.contact_first, $scope.data.contact_last, $scope.data.email, $scope.data.password).success(function(data) {
        console.log("Account Created: ORG: " + $scope.data.org_name + " primary contact: " + $scope.data.contact_first + " " + $scope.data.contact_last + " - EMAIL: " + $scope.data.email + " - PW: " + $scope.data.password); //TODO: remove this line for security reasons
        $state.go('tabsController.editProfile');
        $rootScope.userid = data.userid;
        var alertPopup = $ionicPopup.alert({
          title: 'Welcome to Don8!',
          template: 'Please fill out your user profile.'
        });
      })
      .error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Unable to create account',
          template: data
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
	'$rootScope',
	function ($scope, $stateParams, dataService,$state, $rootScope){
			  $scope.event = {userid:'', name:'',city:'',street:'',number:'', zip:'', state:''};
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
		
	 	$scope.submit = function() {
			info = {};
			info.id = $rootScope.userid;
			info.name =$scope.event.name;
			info.street = $scope.event.street;
			info.zip = $scope.event.zip;
			info.state = $scope.event.state;
			info.contact_first = $scope.event.first_name;
			info.contact_last = $scope.event.last_name;
			info.email = $scope.event.email;
			info.city = $scope.event.city;
			info.number = $scope.event.number;
			info.description = $scope.event.description;
			info.website = $scope.event.website;
			
			dataService.addEvent(info).then(function(){
	 			$state.go('tabsController.myEvents');
	 		});
		}
	}	
	// 	$scope.dataCheck = function(){
	// 		//maybe need later
	// 	};
	// };
	])
 
.controller('detailsCtrl', [
    '$scope',
    '$stateParams',
    '$window',
    '$ionicPopup',
    'dataService',
    function ($scope, $stateParams, $window, $ionicPopup, dataService) {

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