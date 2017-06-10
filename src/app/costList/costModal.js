app.controller("costModalCtrl", [
  "$scope",
  "backend",
  "$uibModalInstance",
  "getID",
  function($scope, backend, $uibModalInstance, getID) {
    $scope.currencies = ["$", "€", "£"]; //available currencies
    $scope.currency = $scope.currencies[0]; //default value for currency

    var id = ""; //holds either "" or id (prevent undefined)
    if (getID) {
      id = getID;
      $scope.method = "Update"; //displayed in modal header

      //if update (id exists) read all existing values for the cost
      backend.get("cost/" + getID, function(response) {
        if (response.status == 200) {
          $scope.title = response.data.title;
          $scope.desc = response.data.desc;
          $scope.category = String(response.data.category); //gets number but select is string
          $scope.price = response.data.price;
          $scope.currency = response.data.currency;
          var dateTime = new Date(response.data.date * 1000); //because of unix time, the date and time have to be split, but angular expects Date objects
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

    //update or add cost
    $scope.addCost = function() {
      var payload = {};
      payload.title = $scope.title;
      payload.desc = $scope.desc;
      payload.category = parseInt($scope.category);
      payload.price = $scope.price;
      payload.currency = $scope.currency;
      var date = new Date($scope.date).getTime() / 1000;
      var time = new Date($scope.time).getTime() / 1000;
      var offset = new Date().getTimezoneOffset() * 60; //in seconds
      payload.date = date + time - offset + 60 * 60; //angular bug needs correction of 1 hour (60m*60s)

      //"cost/" and "cost/<id>" are handled differently in backend but for angular its the same
      backend.post(
        "cost/" + id,
        payload,
        function(response) {
          if (response.status == 200) {
            $uibModalInstance.close(); //only close autoimaticly if succesful
          }
        },
        "Successful added entry"
      );
    };

    //function to close modal by button
    $scope.close = function() {
      $uibModalInstance.close();
    };
  }
]);
