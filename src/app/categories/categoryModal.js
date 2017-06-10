app.controller("categoryModalCtrl", [
  "$scope",
  "backend",
  "$uibModalInstance",
  "getID",
  function($scope, backend, $uibModalInstance, getID) {
    //check if new category or updated
    var id = "";
    if (getID) {
      id = getID;
      $scope.method = "Update";
      backend.get("category/" + getID, function(response) {
        if (response.status == 200) {
          console.log(response.data);
          $scope.color = response.data.color;
          $scope.desc = response.data.desc;
          $scope.name = response.data.name;
        }
      });
    } else {
      $scope.method = "Add";
    }
    $scope.color = randomColor({
      luminosity: "light",
      hue: "random"
    }); //init with random Color
    $scope.close = function() {
      $uibModalInstance.close();
    };
    $scope.addCategory = function() {
      var payload = {};
      var payload = {};
      payload.name = $scope.name;
      payload.desc = $scope.desc;
      payload.color = $scope.color;

      backend.post(
        "category/" + id,
        payload,
        function(response) {
          if (response.status == 200) {
            $uibModalInstance.close();
          }
        },
        "Succesful edited category"
      );
    };
  }
]);
