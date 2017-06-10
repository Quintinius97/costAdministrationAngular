app.controller("costListCtrl", [
  "$scope",
  "backend",
  "$uibModal",
  "$rootScope",
  "$filter",
  function($scope, backend, $uibModal, $rootScope, $filter) {
    $scope.refresh = function() {
      backend.get("cost/all", function(response) {
        if (response.status == 200) {
          $scope.costs = response.data;
        }
      });
      $scope.loadCategories();
    };
    $scope.loadCategories = function() {
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
            getID: function() {
              return id;
            }
          }
        })
        .result.then(
          function() {
            $scope.refresh();
          },
          function() {
            //catch backdrop click
          }
        );
    };
    $scope.refresh();

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
