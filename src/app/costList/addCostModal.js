app.controller("costModalCtrl", [
  "$scope",
  "backend",
  "$uibModalInstance",
  function($scope, backend, $uibModalInstance) {
    $scope.currencies = ["$", "€", "£"];
    $scope.currency = $scope.currencies[0];
    $scope.addCost = function() {
      var payload = {};
      payload.title = $scope.title;
      payload.desc = $scope.desc;
      payload.category = parseInt($scope.category);
      payload.price = $scope.price;
      payload.currency = $scope.currency;
      var date = new Date($scope.date).getTime() / 1000;
      var time = new Date($scope.time).getTime() / 1000;
      payload.date = date + time;
      backend.post(
        "cost",
        payload,
        function(response) {
          if (response.status == 200) {
            console.log("success");
          } else {
            console.log("fail");
          }
          $uibModalInstance.close();
        },
        "Successful added entry"
      );
    };
  }
]);
