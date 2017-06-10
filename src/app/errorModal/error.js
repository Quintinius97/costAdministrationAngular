app.controller("errorCtrl", function($scope, $uibModalInstance) {
  //function to close modal
  $scope.close = function() {
    $uibModalInstance.close();
  };
});
