app.controller("loginCtrl", [
  "$scope",
  "$localStorage",
  "$state",
  "AuthenticationFactory",
  "$rootScope",
  function($scope, $localStorage, $state, AuthenticationFactory, $rootScope) {
    $scope.islogging = false; //can be used for loading bars

    //logs the user in
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
            $scope.islogging = false;
          }
        }
      );
    };

    //register a user
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
            $scope.islogging = false;
          }
        }
      );
    };
  }
]);
