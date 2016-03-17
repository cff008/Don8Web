angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('eventService', [
    '$q',
    '$timeout',
    'dataService',
    function ($q, $timeout, dataService) {
		
      function check(currentEvent, satTrans, wheelChair, wheelChairLift) {
        if (satTrans && wheelChair && wheelChairLift) {
          if (!currentEvent.satTrans || !currentEvent.wheelChair || !currentEvent.wheelChairLift) {
            return false;
          }
        } else if (satTrans && wheelChair) {
          if (!currentEvent.satTrans || !currentEvent.wheelChair) {
            return false;
          }
        } else if (wheelChair && wheelChairLift) {
          if (!currentEvent.wheelChair || !currentEvent.wheelChairLift) {
            return false;
          }
        } else if (satTrans && wheelChairLift) {
          if (!currentEvent.satTrans || !currentEvent.wheelChairLift) {
            return false;
          }
        } else if (satTrans && !currentEvent.satTrans) {
          return false;
        } else if (wheelChair && !currentEvent.wheelChair) {
          return false;
        } else if (wheelChairLift && !currentEvent.wheelChairLift) {
          return false;
        }

        return true;
      }

	//, satTrans, wheelChair, wheelChairLift
      this.search = function (searchString) {
        var events = dataService.events,
            deferred = $q.defer(),
            founds = [],
            currentEvent,
            i = 0;
		
        for (i; i < events.length; i = i + 1) {
          currentEvent = events[i];
          if (currentEvent.name && currentEvent.name.indexOf(searchString) !== -1 || currentEvent.city && currentEvent.city.indexOf(searchString) !== -1 || currentEvent.district && currentEvent.district.indexOf(searchString) !== -1   || currentEvent.organization && currentEvent.organization.indexOf(searchString) !== -1){
//$filter('lowercase')(currentEvent.name)==$filter('lowercase')(searchString)||$filter('lowercase')(currentEvent.organization)==$filter('lowercase')(searchString) ||$filter('lowercase')(currentEvent.city)==$filter('lowercase')(searchString)){
           // if (check(currentEvent, satTrans, wheelChair, wheelChairLift)) {
              currentEvent.thumb = 'http://lorempixel.com/200/200/sports/?' + ((new Date()).getTime() + i);
              founds.push(currentEvent);
           // }
          }
        }
        // simulate asynchronous requests
        $timeout(function () {
          deferred.resolve(angular.copy(founds));
        }, 2000);

        return deferred.promise;
      };

      this.getNext = function (index) {
        var deferred = $q.defer(),
            events = [],
            i = index;

        for (i; i < dataService.events.length; i = i + 1) {
			if(i == index+5){
				break;
			}
          dataService.events[i].thumb = 'http://lorempixel.com/200/200/sports/?' + ((new Date()).getTime() + i);
          events.push(dataService.events[i]);
        }
		deferred.resolve(events);
        

        return deferred.promise;
      };

      this.getOne = function (id) {
        var deferred = $q.defer(),
            event,
            i = 0;

        for (i; i < dataService.events.length; i = i + 1) {
          if (dataService.events[i].id.toString() === id.toString()) {
            event = angular.copy(dataService.events[i]);
            event.image = 'http://lorempixel.com/620/480/sports/?' + ((new Date()).getTime() + i);
            break;
          }
        }

        $timeout(function () {
          if (event) {
            deferred.resolve(event);
          } else {
            deferred.reject();
          }
        }, 1000);

        return deferred.promise;
      };
    }
  ])
  .service('dataService', [
    function () {
      this.events = [{
        id: 1,
        name: 'Ski Swap',
        city: 'Madison',
        district: 'Downtown',
		organization: 'Hoofers',
		description: 'Need people to help with ski swap, help organize skis, and help people navigate swap',
        street: 'Bowen Ct',
        number: '1325',
        zip: '53715',
        lat: 43.067128,
        lng: -89.408266,
        dates: [
          'Monday: 9:00 AM',
          'Sunday: 9:00 AM'
        ],
        contact: {
          tel: '1234/56789',
          email: 'test@example.com'
        },
        website: 'http://example.com'
      }, {
        id: 2,
        name: 'Food Drive',
        city: 'Middleton',
        district: 'High School',
		organization: 'Middleton Football',
        street: 'Middleton High School Street',
		description: 'Food time',
        number: '13',
        zip: '53533',
        dates: [
          'Monday: 9:00 AM',
          'Sunday: 9:00 AM'
        ],
        lat: 51.163893,
        lng: 10.986114,
      
        contact: {
          tel: '1234/56789',
          email: 'test@example.com'
        },
        website: 'http://example.com'
      }, {
        id: 3,
        name: 'Education Night',
        city: 'Madison',
        district: 'Downtown',
		organization: 'Madison Children\'s Muesum',
		description: 'etc',
        street: 'N Hamilton St',
        number: '100',
        zip: '53703',
        dates: [
          'Monday: 9:00 AM',
          'Sunday: 9:00 AM'
        ],
        lat: 51.114004,
        lng: 10.933228,
        wheelchair: true,
        contact: {
          tel: '1234/56789',
          email: 'test@example.com'
        },
        website: 'http://example.com'
      }, {
        id: 4,
        name: 'Afterschool Tutors',
        city: 'Madison',
        district: 'West',
		organization: 'Madison Memorial',
        street: 'Madison Memorial',
		description: 'more',
        number: '17',
        zip: '41515',
        dates: [
          'Monday: 9:00 AM',
          'Sunday: 9:00 AM'
        ],
        satTrans: true,
        contact: {
          tel: '1234/56789',
          email: 'test@example.com'
        },
        website: 'http://example.com'
      },{
	  id: 5,
        name: 'Afterschool Tutors',
        city: 'Madison',
        district: 'West',
		organization: 'Madison Memorial',
        street: 'Madison Memorial',
		description: 'more',
        number: '17',
        zip: '41515',
        dates: [
          'Monday: 9:00 AM',
          'Sunday: 9:00 AM'
        ],
        satTrans: true,
        contact: {
          tel: '1234/56789',
          email: 'test@example.com'
        },
        website: 'http://example.com'
      },
	  {
	  id: 6,
        name: 'Afterschool Tutors',
        city: 'Madison',
        district: 'West',
		organization: 'Madison Memorial',
        street: 'Madison Memorial',
		description: 'more',
        number: '17',
        zip: '41515',
        dates: [
          'Monday: 9:00 AM',
          'Sunday: 9:00 AM'
        ],
        satTrans: true,
        contact: {
          tel: '1234/56789',
          email: 'test@example.com'
        },
        website: 'http://example.com'
      }
	  ];

      this.pages = [{
        alias: 'impress',
        content: '<h1>HTML Ipsum Presents</h1> <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p> <h2>Header Level 2</h2> <ol> <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li> <li>Aliquam tincidunt mauris eu risus.</li> </ol> <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote> <h3>Header Level 3</h3> <ul> <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li> <li>Aliquam tincidunt mauris eu risus.</li> </ul>',
        title: 'Impress',
        icon: 'ion-information-circled'
      }, {
        alias: 'contact',
        content: '<h1>HTML Ipsum Presents</h1> <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p> <h2>Header Level 2</h2> <ol> <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li> <li>Aliquam tincidunt mauris eu risus.</li> </ol> <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote> <h3>Header Level 3</h3> <ul> <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li> <li>Aliquam tincidunt mauris eu risus.</li> </ul>',
        title: 'Contact',
        icon: 'ion-paper-airplane'
      }];
    }
  ]);