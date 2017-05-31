app.controller('costModalCtrl', ['$scope', 'backend', function ($scope, backend) {
    $scope.addCost = function () {
        var payload = {};
        payload.title = $scope.title;
        payload.desc = $scope.desc;
        payload.category = $scope.category;
        payload.price = $scope.price;
        payload.currency = $scope.currency;
        payload.date = new Date($scope.date).getTime() / 1000;
        backend.post('cost', payload, function (response) {
            if (response.satus == 200) {
                console.log('success');
            }
            else {
                console.log('fail');
            }
        })
    }
}]);