app.controller('categoriesCtrl', ['$scope', 'backend', function ($scope, backend) {
  $scope.refresh = function () {
    backend.get('category/all', function (response) {
      if (response.status == 200) {
        console.log(response.data);
        $scope.categories = response.data;
      }
    });
  }
  $scope.refresh();

  $scope.delete = function (id) {
    backend.delete('category/' + id, function (response) {
      if (response.status == 200) {
        $scope.refresh();
      }
    });

  }
}]);