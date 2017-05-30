// app.service('backend', function ($http, $uibModal, $rootScope, Notification, $location) {
app.service('backend', function($http, $rootScope, $location) {
  var baseURL = "http://localhost:3000/";
  console.log(baseURL);

  function success(successMessage) {
    console.log("success");
    console.log(typeof successMessage);
    if(typeof successMessage == 'string') {
      console.log(typeof successMessage);
      Notification.success(successMessage);
    }
  }

  function error(response) {
    console.log("error");
    console.log(response.status);
    if(response.status == 401) {
      $location.path("login");
    }
    $rootScope.alert = response.data.info;
    // var modalInstanceAdd = $uibModal.open({
    //     animation: true,
    //     ariaLabelledBy: 'modal-title',
    //     ariaDescribedBy: 'modal-body',
    //     templateUrl: 'errormodal.html',
    //     controller: 'modalerrorCtrl',
    //     size: 'md'
    // });
  }

  this.post = function(route, payload, callback, successMessage, customErrorHandling) {
    if(typeof callback === 'undefined') {
      callback = function(response) {
        console.log(response);
      };
    }
    $http({
      method: 'POST',
      url: baseURL + route,
      data: payload,
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 10000
    }).then(function successCallback(response) {
      success(successMessage);
      callback(response);
      return response;
    }, function errorCallback(response) {
      if(!customErrorHandling) {
        error(response);
      }
      callback(response);
      return response;
    });
  };
  this.get = function(route, callback, successMessage, customErrorHandling) {
    if(typeof callback === 'undefined') {
      callback = function(response) {
        console.log(response);
      };
    }

    $http({
      method: 'GET',
      url: baseURL + route,
      headers: {
        'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      timeout: 5000
    }).then(function successCallback(response) {
      success(successMessage);
      callback(response);
      return response;
    }, function errorCallback(response) {
      if(!customErrorHandling) {
        error(response);
      }
      callback(response);
      return false;
    });
  };
  this.put = function(route, callback, successMessage, customErrorHandling) {
    if(typeof callback === 'undefined') {
      callback = function(response) {
        console.log(response);
      };
    }
    $http({
      method: 'PUT',
      url: baseURL + route,
      timeout: 5000
    }).then(function successCallback(response) {
      success(successMessage);
      callback(response);
      return response;
    }, function errorCallback(response) {
      if(!customErrorHandling) {
        error(response);
      }
      callback(response);
      return false;
    });
  };
  this.delete = function(route, callback, successMessage, customErrorHandling) {
    if(typeof callback === 'undefined') {
      callback = function(response) {
        console.log(response);
      };
    }
    $http({
      method: 'DELETE',
      url: baseURL + route,
      timeout: 5000
    }).then(function successCallback(response) {
      success(successMessage);
      callback(response);
      return response;
    }, function errorCallback(response) {
      if(!customErrorHandling) {
        error(response);
      }
      callback(response);
      return false;
    });
  };
});
app.factory('AuthenticationFactory', function($rootScope, $localStorage, $http, backend) {
  var service = {};
  service.Login = Login;
  service.Logout = Logout;
  service.Register = Register;
  return service;

  function Login(username, password, callback) {
    var payload = {
      "username": username,
      "password": password
    };

    backend.post('user/login', payload, function(response) {
      if(response.status >= 200 && response.status < 300) {
        console.log("Logged in success");
        if(response.data.jwt) {
          $rootScope.username = username;
          $rootScope.loggedIn = true;
          $localStorage.currentJWT = response.data.jwt;
          $http.defaults.headers.common.Authorization = response.data.jwt;
          callback(response);
        } else {
          callback(response);
        }
      } else {
        callback(response);
      }
    });
  }

  function Register(name, username, password, callback) {
    var payload = {
      "username": username,
      "name": name,
      "password": password
    };

    backend.post('user/register', payload, function(response) {
      if(response.status >= 200 && response.status < 300) {
        console.log("Registered in success");
        if(response.data.jwt) {
          $rootScope.loggedIn = true;
          $rootScope.username = username;
          $localStorage.currentJWT = response.data.jwt;
          $http.defaults.headers.common.Authorization = response.data.jwt;
          callback(response);
        } else {
          callback(response);
        }
      } else {
        callback(response);
      }
    });
  }

  function Logout() {
    delete $localStorage.currentJWT;
    $http.defaults.headers.common.Authorization = '';
    $rootScope.loggedIn = false;
  }
});