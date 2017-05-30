app.controller('costListCtrl', ['$scope', 'backend', function ($scope, backend) {
    $scope.refresh = function () {
        backend.get('cost/all', function (response) {
            if (response.status == 200) {
                console.log(response.data);
                $scope.costs = response.data;
            }
        });
    }
    $scope.refresh();
    $scope.addCost = function () {
        var payload = {};
        payload.title = "fefe";
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