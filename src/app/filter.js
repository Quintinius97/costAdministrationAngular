app.filter('getCategoryName', function () {
  return function (input, id) {
    var i = 0;
    if (!input) {
      return null;
    }
    var len = input.length;

    for (; i < len; i++) {
      if (+input[i].id === +id) {
        return input[i].name;
      }
    }
    return null;
  };
});
app.filter('getCategoryColor', function () {
  return function (input, id) {
    var i = 0;
    if (!input) {
      return null;
    }
    var len = input.length;

    for (; i < len; i++) {
      if (+input[i].id === +id) {
        return input[i].color;
      }
    }
    return null;
  };
});