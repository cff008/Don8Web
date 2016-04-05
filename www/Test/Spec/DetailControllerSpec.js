describe('detailsCtrl', function() {
	
	
	it('reload',  function() {
		module('app.controllers');

		inject(function($rootScope,$controller, $q) {
				var mockEvent= {id:1, name:'Test Event', organization:'test',  contact: {
          tel: '1234/56789',
          email: 'test@example.com'
        },};
				$scope = $rootScope.$new()
				eventServiceMock = {
					getNext: jasmine.createSpy('getNext spy').and.returnValue('pie'),
				};
				  eventServiceMock.getOne = function(index) {
				  //promise mock
					var deferred = $q.defer();
					deferred.resolve(mockEvent);
					
					return deferred.promise;   
					}
				
				//mocking the state
				stateMock = jasmine.createSpyObj('$state.spy', ['go']);
				
				//mock stateParams
				stateParams = [{id:'1'}];
				windowMock = {
				open: function(){
					var temp;
				}};
				spyOn(windowMock, 'open');
				ionicPopup = {};
				
				controller = $controller('detailsCtrl', {'$scope': $scope, '$state': stateMock, 'eventService': eventServiceMock, '$stateParams': stateParams, '$window': window, '$ionicPopup':ionicPopup});
			});
			$scope.reload();
			$scope.$root.$digest();
			$scope.mail();
			$scope.$root.$digest();
			$scope.website();
			$scope.$root.$digest();
			$scope.map();
			$scope.$root.$digest();
			$scope.call();
			$scope.$root.$digest();
			expect(windowMock.open).toHaveBeenCalled();
	});
});