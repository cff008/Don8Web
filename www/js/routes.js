angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('tabsController.organizationProfile', {
    url: '/Profile',
    views: {
      'tab1': {
        templateUrl: 'templates/organizationProfile.html',
        controller: 'organizationProfileCtrl'
      }
    }
  })
  
   .state('tabsController.editProfile', {
    url: '/editProfile',
    views: {
      'tab1': {
        templateUrl: 'templates/editProfile.html',
        controller: 'editProfileCtrl'
      }
    }
  })

  .state('tabsController.myEvents', {
    url: '/MyEvents',
    views: {
      'tab2': {
        templateUrl: 'templates/myEvents.html',
        controller: 'myEventsCtrl'
      }
    }
  })
  
 .state('tabsController.detail', {
    url: '/detail/:id',
    views: {
      'tab2': {
        templateUrl: 'templates/detail.html',
        controller: 'detailsCtrl'
      }
    }
  })
  

  .state('tabsController.settings', {
    url: '/Settings',
    views: {
      'tab3': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page5')

  

});