app.controller('costListCtrl', ['$scope', 'backend', '$uibModal', function ($scope, backend, $uibModal) {
    $scope.refresh = function () {
        backend.get('cost/all', function (response) {
            if (response.status == 200) {
                console.log(response.data);
                $scope.costs = response.data;
            }
        });
    }
    $scope.addCostModal = function () {
        modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'app/costList/addCostModal.html',
            size: 'lg',
            controller: 'costModalCtrl'
        }).closed.then(function () {
            $scope.refresh();
        });
    };
    $scope.refresh();

    $scope.delete = function (id) {
        backend.delete('cost/' + id, function (response) {
            if (response.status == 200) {
                $scope.refresh();
            }
        });
    }

}]);