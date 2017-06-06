'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp',
    ['ngRoute', 'ui.router', 'ngStorage', 'ui.bootstrap', 'ui-notification'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
app.run(function($http, $rootScope, $localStorage) {
  $rootScope.loggedIn = false;
  //$http.defaults.headers.common.Authorization = $localStorage.currentJWT;
});
app.config(function($stateProvider, NotificationProvider) {
  $stateProvider
  .state({
    name: 'login',
    url: '/login',
    templateUrl: 'app/login/login.html'
  })
  .state({
    name: 'categories',
    url: '/cateories',
    templateUrl: 'app/categories/categories.html'
  })
  .state({
    name: 'list',
    url: '/list',
    templateUrl: 'app/costList/costList.html',
    controller: 'costListCtrl'
  });
  NotificationProvider.setOptions({
    delay: 4000,
    startTop: 10,
    startRight: 10,
    verticalSpacing: 10,
    horizontalSpacing: 10,
    positionX: 'right',
    positionY: 'bottom',
    closeOnClick: true,
    maxCount: 3
  });
});
app.filter('getCategoryName', function() {
  return function(input, id) {
    var i = 0;
    var len = input.length;

    for(; i < len; i++) {
      if(+input[i].id === +id) {
        return input[i].name;
      }
    }
    return null;
  };
});
