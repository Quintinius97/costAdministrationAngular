'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp',
  ['ngRoute', 'ui.router', 'ngStorage', 'ui.bootstrap', 'ui-notification'])
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');


  }]);
app.run(function ($http, $rootScope, $localStorage) {
  $rootScope.loggedIn = true;
  $http.defaults.headers.common.Authorization = $localStorage.currentJWT;
});
app.config(function ($stateProvider, NotificationProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      controller: 'loginCtrl',
      templateUrl: 'app/login/login.html'
    })
    .state({
      name: 'categories',
      url: '/cateories',
      controller: 'categoriesCtrl',
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

