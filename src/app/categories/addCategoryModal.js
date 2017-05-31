app.controller('categoryModalCtrl', ['$scope', 'backend', function ($scope, backend) {
  $scope.addCategory = function (titel, color, description) {
    var payload = {};
    payload.name = titel;
    payload.desc = description;
    if (color) {
      payload.color = color;
    }
    else {
      payload.color = randomColor({
        luminosity: 'bright',
        hue: 'random'
      });
    }
    backend.post('category', payload, function (response) {
      $scope.refresh();
    });
  };
}]);