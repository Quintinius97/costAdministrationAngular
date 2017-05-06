'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version','ui.router','ngStorage'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
app.config(function($stateProvider) {
  var helloState = {
    name: 'hello',
    url: '/hello',
    templateUrl: 'view1/view1.html'
  }
  var loginState={
    name: 'login',
    url: '/login',
    templateUrl: 'login/login.html'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>Its the UI-Router hello world app!</h3>'
  }

  $stateProvider.state(loginState);
  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});
