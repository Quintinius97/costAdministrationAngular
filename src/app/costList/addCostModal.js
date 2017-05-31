app.controller('costModalCtrl', ['$scope', 'backend', '$uibModalInstance', function ($scope, backend, $uibModalInstance) {
    $scope.addCost = function () {
        var payload = {};
        payload.title = $scope.title;
        payload.desc = $scope.desc;
        payload.category = $scope.category;
        payload.price = $scope.price;
        payload.currency = $scope.currency;
        payload.date = new Date($scope.date).getTime() / 1000;
        backend.post('cost', payload, function (response) {
            if (response.status == 200) {
                console.log('success');
            }
            else {
                console.log('fail');
            }
            $uibModalInstance.close();
        })
    }
}]);