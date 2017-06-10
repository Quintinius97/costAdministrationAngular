app.controller("categoryModalCtrl", [
  "$scope",
  "backend",
  "$uibModalInstance",
  "getID",
  function($scope, backend, $uibModalInstance, getID) {
    //init with random Color
    $scope.color = randomColor({
      luminosity: "light",
      hue: "random"
    });

    //check if new category or updated
    var id = ""; //holds either "" or id (prevent undefined)
    if (getID) {
      id = getID;
      $scope.method = "Update"; //displayed in modal header

      //if update (id exists) read all existing values for the category
      backend.get("category/" + id, function(response) {
        if (response.status == 200) {
          $scope.color = response.data.color;
          $scope.desc = response.data.desc;
          $scope.name = response.data.name;
        }
      });
    } else {
      $scope.method = "Add";
    }

    //adds or updates the category
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
            $uibModalInstance.close(); //close on success
          }
        },
        "Succesfully edited category"
      );
    };

    //function to close without saving
    $scope.close = function() {
      $uibModalInstance.close();
    };
  }
]);
