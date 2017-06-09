app.controller("categoriesCtrl", [
  "$scope",
  "backend",
  "$uibModal",
  function($scope, backend, $uibModal) {
    $scope.refresh = function() {
      backend.get("category/all", function(response) {
        if (response.status == 200) {
          console.log(response.data);
          $scope.categories = response.data;
        }
      });
    };
    $scope.refresh();

    $scope.openCategoryModal = function(id) {
      modalInstance = $uibModal
        .open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "app/categories/addCategoryModal.html",
          size: "lg",
          controller: "categoryModalCtrl",
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

    $scope.delete = function(id) {
      backend.delete(
        "category/" + id,
        function(response) {
          if (response.status == 200) {
            $scope.refresh();
          }
        },
        "Succesfully deleted category"
      );
    };
  }
]);
