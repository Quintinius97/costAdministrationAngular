app.controller("errorCtrl", function ($scope, $uibModalInstance) {
    $scope.close = function () {
        $uibModalInstance.close();
    };
});