app.controller('loginCtrl', ['$scope', '$localStorage', '$location', 'AuthenticationFactory', '$rootScope', function ($scope, $localStorage, $location, AuthenticationFactory, $rootScope) {
    $scope.islogging = false;
    $scope.login = function () {
        $scope.islogging = true;
        console.log( $scope.username);
        console.log($scope.password);
        AuthenticationFactory.Login($scope.username, $scope.password, function (response) {
            if (response.status >= 200 &&response.status<300) {
                successful(response);
            } else {
                failed(response);
            }
        });


    };

    function successful(response) {
        console.log('login succesful')
        if ($localStorage.currentUser.isAdmin) {
            $location.path("/admin/carrier-management");
        } else {
            if ($localStorage.currentUser.firstLogin) {
                $location.path("/survey");
            } else {
                $location.path("/user/profil");
            }
        }
        $scope.islogging = false;
     //   $rootScope.alert = '';
        console.log( $scope.islogging);
    }
    function failed(response) {
        console.log('login failed');
        $scope.islogging = false;
     //   $rootScope.alert = response.data.info;
        console.log($rootScope.alert);
    }
}]);