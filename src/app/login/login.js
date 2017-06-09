app.controller("loginCtrl", [
  "$scope",
  "$localStorage",
  "$state",
  "AuthenticationFactory",
  "$rootScope",
  function($scope, $localStorage, $state, AuthenticationFactory, $rootScope) {
    $scope.islogging = false;
    $scope.login = function() {
      $scope.islogging = true;
      AuthenticationFactory.Login(
        $scope.loginUsername,
        $scope.loginPassword,
        function(response) {
          $scope.islogging = false;
          if (response.status >= 200 && response.status < 300) {
            $state.go("list");
          } else {
            console.log("login failed");
            $scope.islogging = false;
            //   $rootScope.alert = response.data.info;
            console.log($rootScope.alert);
          }
        }
      );
    };
    $scope.register = function() {
      $scope.islogging = true;
      AuthenticationFactory.Register(
        $scope.email,
        $scope.username,
        $scope.password,
        function(response) {
          $scope.islogging = false;
          if (response.status >= 200 && response.status < 300) {
            $state.go("list");
          } else {
            console.log("login failed");
            $scope.islogging = false;
            //   $rootScope.alert = response.data.info;
            console.log($rootScope.alert);
          }
        }
      );
    };
  }
]);
