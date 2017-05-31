app.controller('categoryModalCtrl', ['$scope', 'backend', function ($scope, backend) {
  $scope.addCategory = function (title, color, description) {
    var payload = {};
    payload.name = title;
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