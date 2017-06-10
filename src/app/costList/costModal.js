app.controller("costModalCtrl", [
  "$scope",
  "backend",
  "$uibModalInstance",
  "getID",
  function($scope, backend, $uibModalInstance, getID) {
    $scope.currencies = ["$", "€", "£"];
    $scope.currency = $scope.currencies[0];
    var id = "";
    if (getID) {
      id = getID;
      $scope.method = "Update";
      backend.get("cost/" + getID, function(response) {
        if (response.status == 200) {
          console.log(response.data);
          $scope.title = response.data.title;
          $scope.desc = response.data.desc;
          $scope.category = String(response.data.category);
          $scope.price = response.data.price;
          $scope.currency = response.data.currency;
          var dateTime = new Date(response.data.date * 1000);
          $scope.time = new Date(
            1970,
            0,
            1,
            dateTime.getUTCHours(),
            dateTime.getUTCMinutes(),
            0
          );
          $scope.date = new Date(
            dateTime.getUTCFullYear(),
            dateTime.getUTCMonth(),
            dateTime.getUTCDate(),
            0,
            0,
            0
          );
        }
      });
    } else {
      $scope.method = "Add";
    }

    $scope.addCost = function() {
      var payload = {};
      payload.title = $scope.title;
      payload.desc = $scope.desc;
      payload.category = parseInt($scope.category);
      payload.price = $scope.price;
      payload.currency = $scope.currency;
      var date = new Date($scope.date).getTime() / 1000;
      var time = new Date($scope.time).getTime() / 1000;
      var offset = new Date().getTimezoneOffset();
      payload.date = date + time - offset * 60 + 60 * 60; //angular bug needs correction of 1 hour
      backend.post(
        "cost/" + id,
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
