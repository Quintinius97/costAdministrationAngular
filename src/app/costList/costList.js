app.controller("costListCtrl", [
  "$scope",
  "backend",
  "$uibModal",
  "$rootScope",
  function($scope, backend, $uibModal, $rootScope) {
    //function to refresh cost entries
    $scope.refresh = function() {
      backend.get("cost/all", function(response) {
        if (response.status == 200) {
          $scope.costs = response.data;
        }
      });
    };

    //function to load categories to display name and color depending on id
    $scope.loadCategories = function() {
      //get all categories with custom error handling
      backend.get(
        "category/all",
        function(response) {
          if (response.status == 200) {
            $rootScope.categories = response.data;
          }
        },
        null,
        true
      );
    };
    //load costs and categories on init
    $scope.refresh();
    $scope.loadCategories();

    //Modal to add or update costs
    $scope.openCostModal = function(id) {
      modalInstance = $uibModal
        .open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "app/costList/costModal.html",
          size: "lg",
          controller: "costModalCtrl",
          resolve: {
            //make the id of the cost available in modal
            getID: function() {
              return id;
            }
          }
        })
        .result.then(
          function() {
            $scope.refresh(); // refresh if closed by button (save)
          },
          function() {
            //catch backdrop click
          }
        );
    };

    //delete cost by id
    $scope.delete = function(id) {
      backend.delete(
        "cost/" + id,
        function(response) {
          if (response.status == 200) {
            $scope.refresh();
          }
        },
        "Succesfully deleted entry"
      );
    };
  }
]);
