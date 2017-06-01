app.controller('categoryModalCtrl', ['$scope', 'backend', '$uibModalInstance', function ($scope, backend, $uibModalInstance) {
  $scope.color = randomColor({
    luminosity: 'bright',
    hue: 'random'
  }); //init with random Color
  $scope.addCategory = function () {
    var payload = {};
    var payload = {};
    payload.name = $scope.title;
    payload.desc = $scope.description;
    payload.color = $scope.color;

    backend.post('category', payload, function (response) {

      if (response.status == 200) {
        console.log('success');
      }
      else {
        console.log('fail');
      }
      $uibModalInstance.close();
    }, "Succesful added category");
  };
}]);