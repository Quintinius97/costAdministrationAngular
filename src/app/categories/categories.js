app.controller('categoriesCtrl', ['$scope', 'backend', function($scope, backend) {

  $scope.refresh = function() {
    backend.get('category/all', function(response) {
      if(response.status == 200) {
        console.log(response.data);
        $scope.categories = response.data;
      }
    });
  }
  $scope.refresh();
  $scope.addCategory = function(titel, color, description) {
    var payload = {};
    payload.name = titel;
    payload.desc = description;
    if(color) {
      payload.color = color;
    }
    else {
      payload.color = randomColor({
        luminosity: 'bright',
        hue: 'random'
      });
    }
    backend.post('category', payload, function(response) {
      $scope.refresh();
    });
  }
}]);