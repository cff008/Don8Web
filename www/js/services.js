angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q, $http, $rootScope) {
  return {
      loginUser: function(email, pw) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          //TODO: replace these checks with calls to the server
          /*if (email == 'user' && pw == 'secret') {
              deferred.resolve('Welcome ' + email + '!');
          } else {
              deferred.reject('Wrong credentials.');
          }*/

          $http({
            method: 'GET',
            url: '/login',
            params: {email: email, password: pw}
          }).then(function successCallback(response) {
            //this callback will be called asynchronously when the response is available
            if(response.data.status == 'OK'){
              deferred.resolve('Welcome ' + email + '!');
              $rootScope.userid = response.data.userid;
            } else if(response.data.status == 'INVALID_REQUEST') {
              deferred.reject('Username or password is incorrect');
            } else if(response.data.status == 'UNKNOWN_ERROR') {
              deferred.reject('Something went wrong. Please try again.');
            } else {
              deferred.reject('This shouldn\'t happen');
            }
          }, function errorCallback(response) {
            //called asynchronously if an error occurs or server returns response with an error status
            deferred.reject('Server communication error');
          });
          promise.success = function(fn) {
              promise.then(fn);
              return promise;
          }
          promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
          }
          return promise;
      }
  }
})

.service('SignupService', function($q, $http, $rootScope) {
  return{
    signupUser: function(firstname, lastname, email, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method: 'GET',
        url: '/create_profile',
        params: {firstname: firstname, lastname: lastname, email: email, password: password}
      }).then(function successCallback(response) {
        //this callback will be called asynchronously when the response is available
        if(response.data.status == 'OK'){
          deferred.resolve('Welcome ' + firstname + ' ' + lastname + '!');
          $rootScope.userid = response.data.userid;
        } else if(response.data.status == 'UNKNOWN_ERROR') {
          deferred.reject('Something went wrong. Please try again.');
        } else if(response.data.status == 'INVALID_REQUEST'){
          deferred.reject('That email address is already taken');
        } else {
          deferred.reject('This shouldn\'t happen');
        }

        //TODO: Add cases for: username/email already exists, etc.
      }, function errorCallback(response) {
        //called asynchronously if an error occurs or the server returns response with an error status
        deferred.reject('Server communication error');
      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('SettingsService', function($q, $http, $rootScope){
  this.getSettings = function(){
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/get_settings',
      params: {id: $rootScope.userid}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Successfully attained stored settings');
        return response.data.settings;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        deferred.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        deferred.reject('Invalid userid');
      } else {
        deferred.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      deferred.reject('Server communication error');
    });
  }

  this.updateSettings = function(push, email, location){
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/update_settings',
      params: {userid: $rootScope.userid, push: push, email: email, location_access: location}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Successfully updated settings');
        return response.data.settings;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        deferred.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        deferred.reject('Invalid userid');
      } else {
        deferred.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      deferred.reject('Server communication error');
    });
  }
}).service('LoginService', function($q, $http, $rootScope) {
  return {
      loginUser: function(email, pw) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          //TODO: replace these checks with calls to the server
          /*if (email == 'user' && pw == 'secret') {
              deferred.resolve('Welcome ' + email + '!');
          } else {
              deferred.reject('Wrong credentials.');
          }*/

          $http({
            method: 'GET',
            url: '/login',
            params: {email: email, password: pw}
          }).then(function successCallback(response) {
            //this callback will be called asynchronously when the response is available
            if(response.data.status == 'OK'){
              deferred.resolve('Welcome ' + email + '!');
              $rootScope.userid = response.data.userid;
            } else if(response.data.status == 'INVALID_REQUEST') {
              deferred.reject('Username or password is incorrect');
            } else if(response.data.status == 'UNKNOWN_ERROR') {
              deferred.reject('Something went wrong. Please try again.');
            } else {
              deferred.reject('This shouldn\'t happen');
            }
          }, function errorCallback(response) {
            //called asynchronously if an error occurs or server returns response with an error status
            deferred.reject('Server communication error');
          });
          promise.success = function(fn) {
              promise.then(fn);
              return promise;
          }
          promise.error = function(fn) {
              promise.then(null, fn);
              return promise;
          }
          return promise;
      }
  }
})

.service('SignupService', function($q, $http, $rootScope) {
  return{
    signupUser: function(firstname, lastname, email, password) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      $http({
        method: 'GET',
        url: '/create_profile',
        params: {firstname: firstname, lastname: lastname, email: email, password: password}
      }).then(function successCallback(response) {
        //this callback will be called asynchronously when the response is available
        if(response.data.status == 'OK'){
          deferred.resolve('Welcome ' + firstname + ' ' + lastname + '!');
          $rootScope.userid = response.data.userid;
        } else if(response.data.status == 'UNKNOWN_ERROR') {
          deferred.reject('Something went wrong. Please try again.');
        } else if(response.data.status == 'INVALID_REQUEST'){
          deferred.reject('That email address is already taken');
        } else {
          deferred.reject('This shouldn\'t happen');
        }

        //TODO: Add cases for: username/email already exists, etc.
      }, function errorCallback(response) {
        //called asynchronously if an error occurs or the server returns response with an error status
        deferred.reject('Server communication error');
      });

      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
})

.service('SettingsService', function($q, $http, $rootScope){
  this.getSettings = function(){
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/get_settings',
      params: {id: $rootScope.userid}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Successfully attained stored settings');
        return response.data.settings;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        deferred.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        deferred.reject('Invalid userid');
      } else {
        deferred.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      deferred.reject('Server communication error');
    });
  }

  this.updateSettings = function(push, email, location){
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/update_settings',
      params: {userid: $rootScope.userid, push: push, email: email, location_access: location}
    }).then(function successCallback(response) {
      if(response.data.status == 'OK'){
        deferred.resolve('Successfully updated settings');
        return response.data.settings;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        deferred.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        deferred.reject('Invalid userid');
      } else {
        deferred.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      deferred.reject('Server communication error');
    });
  }
})
.service('dataService', [ '$http', '$q',
    function ($http, $q) { return {
      getEvents: function(){
		  return $http.get('/events/all').then(function(resp){
			if(typeof resp.data === 'object'){
			  this.events = resp.data.events;
				console.log(this.events);
			  return $q.resolve(this.events);
			}else{
			  return $q.reject(resp.data);
			}
		   
		  }, function(err){
			return $q.reject(resp.data);
		  });
		},
	getEvent: function(id){
		return $http({
      method: 'GET',
      url: '/event',
      params: {id: id}
    }).then(function successCallback(response) {
		if(response.data.status == 'OK'){
        return response.data.events;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        $q.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        $q.reject('Invalid userid');
      } else {
        $q.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      $q.reject('Server communication error');
    });
	  },
	getMyEvents: function(id){
		return $http({
      method: 'GET',
      url: '/event',
      params: {userid: id}
    }).then(function successCallback(response) {
		if(response.data.status == 'OK'){
        return response.data.events;
      } else if(response.data.status == 'UNKNOWN_ERROR'){
        $q.reject('Something went wrong. Please try again.')
      } else if(response.data.status == 'INVALID_REQUEST'){
        $q.reject('Invalid userid');
      } else {
        $q.reject('This shouldn\'t happen.');
      }
    }, function errorCallback(response){
      $q.reject('Server communication error');
    });
	  }
	  
  }
}
  ]);