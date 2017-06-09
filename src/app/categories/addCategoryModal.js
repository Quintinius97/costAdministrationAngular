app.controller('categoryModalCtrl',
  ['$scope', 'backend', '$uibModalInstance', 'getID', function ($scope, backend, $uibModalInstance, getID) {
    if (getID) { //check if new category or updated
      console.log("success");
      backend.get('category/' + getID, function (response) {
        if (response.status == 200) {
          console.log(response.data);
          $scope.color = response.data.color;
          $scope.desc = response.data.desc;
          $scope.name = response.data.name;
        }
        else {
          console.log('fail');
        }
      })
    }
    else {
      console.log("test");
    }
    $scope.color = randomColor(); //init with random Color
    $scope.close = function () {
      $uibModalInstance.close();
    }
    $scope.addCategory = function () {
      var payload = {};
      var payload = {};
      payload.name = $scope.name;
      payload.desc = $scope.desc;
      payload.color = $scope.color;

      backend.post('category', payload, function (response) {
        if (response.status == 200) {
          console.log('success');
        } else {
          console.log('fail');
        }
        $uibModalInstance.close();
      }, "Succesful added category");
    };
  }]
);
