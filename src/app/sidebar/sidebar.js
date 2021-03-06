app.controller("sidebarCtrl", [
  "$scope",
  "$rootScope",
  "backend",
  "$localStorage",
  "$http",
  function($scope, $rootScope, backend, $localStorage, $http) {
    //logout function
    $scope.logout = function() {
      delete $localStorage.currentJWT;
      $http.defaults.headers.common.Authorization = "";
      $rootScope.loggedIn = false;
    };
  }
]);
