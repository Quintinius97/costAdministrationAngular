'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp',
  ['ui.router', 'ngStorage',
    'mdColorPicker', 'ui.bootstrap', 'color.picker'])
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({ redirectTo: '/view1' });
  }]);
app.run(function ($http, $rootScope, $localStorage) {
  $rootScope.loggedIn = true;
  $http.defaults.headers.common.Authorization = $localStorage.currentJWT;
});
app.config(function ($stateProvider) {
  $stateProvider
    .state({
      name: 'login',
      url: '/login',
      templateUrl: 'login/login.html'
    })
    .state({
      name: 'categories',
      url: '/cateories',
      templateUrl: 'categories/categories.html'
    })
    .state({
      name: 'list',
      url: '/list',
      templateUrl: 'costList/costList.html',
      controller: 'costListCtrl'
    })
});
