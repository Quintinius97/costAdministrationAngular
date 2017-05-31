app.controller('categoriesCtrl', ['$scope', 'backend', '$uibModal', function ($scope, backend, $uibModal) {
  $scope.refresh = function () {
    backend.get('category/all', function (response) {
      if (response.status == 200) {
        console.log(response.data);
        $scope.categories = response.data;
      }
    });
  }
  $scope.refresh();

  $scope.openCategoryModal = function () {
    modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'app/categories/addCategoryModal.html',
      size: 'lg',
      controller: 'categoryModalCtrl'
    }).closed.then(function () {
      $scope.refresh();
    });
  };

  $scope.delete = function (id) {
    backend.delete('category/' + id, function (response) {
      if (response.status == 200) {
        $scope.refresh();
      }
    });
  }

}]);