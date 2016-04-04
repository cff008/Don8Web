describe('myEventsCtrl', function() {
 var scope;

    // load the controller's module
 /*   beforeEach(module('app'));

    beforeEach(inject(function($controller, $q) {
        eventServiceMock = {
			search: jasmine.createSpy('search spy').and.returnValue('pie')
		};
		//mocking the state of the union
		stateMock = jasmine.createSpyObj('$state.spy', ['go']);
		
		//mock da scope
		
		
        controller = $controller('eventFeedCtrl', {'$scope': $scope, '$state': stateMock, 'eventService': eventServiceMock});
    }));*/

  
    it('Load ', function() {
		
		var mockEvent= [{id:1, name:'Test Event', organization:'test'}];
		var mockEvent2 = [{id:1, name:'Test Event', organization:'test'}, {id:1, name:'Test Event', organization:'test'}]
		module('app.controllers');

		inject(function($rootScope,$controller, $q) {
				$scope = $rootScope.$new()
				eventServiceMock = {
					getNext: jasmine.createSpy('getNext spy').and.returnValue('pie'),
				};
				  eventServiceMock.getNext = function(index) {
					var deferred = $q.defer();
					deferred.resolve(mockEvent);
					
					return deferred.promise;   
					}
				
				//mocking the state of the union
				stateMock = jasmine.createSpyObj('$state.spy', ['go']);
				
				//mock da scope
				
				
				controller = $controller('myEventsCtrl', {'$scope': $scope, '$state': stateMock, 'eventService': eventServiceMock});
			});
    
		debugger;
      $scope.loadNext();
	  $scope.$root.$digest();
      expect($scope.events).toEqual(mockEvent);
	  expect($scope.index).toEqual(1);
	  $scope.loadNext();
	  $scope.$root.$digest();
	  expect($scope.index).toEqual(2);
	  expect($scope.events).toEqual(mockEvent2);
    });
 
});
