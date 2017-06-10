app.controller("categoriesCtrl", [
  "$scope",
  "backend",
  "$uibModal",
  function($scope, backend, $uibModal) {
    //refresh category List for user
    $scope.refresh = function() {
      backend.get("category/all", function(response) {
        if (response.status == 200) {
          console.log(response.data);
          $scope.categories = response.data;
        }
      });
    };
    $scope.refresh(); //refresh on load

    //opens the category modal to add(no id) or update a category
    // and refresh after the modal is closed
    $scope.openCategoryModal = function(id) {
      modalInstance = $uibModal
        .open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "app/categories/categoryModal.html",
          size: "lg",
          controller: "categoryModalCtrl",
          resolve: {
            //make the id of the category available in modal
            getID: function() {
              return id;
            }
          }
        })
        .result.then(
          function() {
            $scope.refresh(); //if closed by button (save)
          },
          function() {
            //catch backdrop click
          }
        );
    };

    //function to delete given category
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
