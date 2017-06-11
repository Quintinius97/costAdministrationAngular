//defines the service for all backend request
//easier error handling
app.service("backend", function(
  $http,
  $uibModal,
  $rootScope,
  Notification,
  $location
) {
  //Backend URL for all requests
  var baseURL = "http://localhost:4000/";
  console.log(baseURL);

  //notifys the user about success if in the request a message was defined
  function success(successMessage) {
    console.log("success");
    if (typeof successMessage == "string") {
      Notification.success(successMessage);
    }
  }
   // gets called if error and no custom error handling
  function error(response) {
    //redirects user to login if unauthorized
    if (response.status == 401) {
      $location.path("login");
      $rootScope.loggedIn = false;
      Notification.error("You have to be logged in");
    } else {
      //shows modal with content returned by backend
      $rootScope.alert = response.data.error;
      $uibModal.open({
        animation: true,
        ariaLabelledBy: "modal-title",
        ariaDescribedBy: "modal-body",
        templateUrl: "app/errorModal/error.html",
        controller: "errorCtrl",
        size: "md"
      });
    }
  }
  // extention of http post
  // sends the payload to the baseurl+route and calls the callback function
  // if success message is defined it gets displayed as small notification on success
  // if customErrorhandling false the default error function gets called to display a modal
  this.post = function(
    route,
    payload,
    callback,
    successMessage,
    customErrorHandling
  ) {
    if (typeof callback === "undefined") {
      callback = function(response) {
        console.log(response);
      };
    }
    $http({
      method: "POST",
      url: baseURL + route,
      data: payload,
      //sets the data type to json
      headers: {
        "Content-Type": "application/json"
      },
      timeout: 10000
    }).then(
      function successCallback(response) {
        success(successMessage);
        callback(response);
        return response;
      },
      function errorCallback(response) {
        if (!customErrorHandling) {
          error(response);
        }
        callback(response);
        return response;
      }
    );
  };
  // same as post without payload and headers to prevent browser from caching (needed for ie)
  this.get = function(route, callback, successMessage, customErrorHandling) {
    if (typeof callback === "undefined") {
      callback = function(response) {
        console.log(response);
      };
    }
    $http({
      method: "GET",
      url: baseURL + route,
      headers: {
        "If-Modified-Since": "Mon, 26 Jul 1997 05:00:00 GMT",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache"
      },
      timeout: 5000
    }).then(
      function successCallback(response) {
        success(successMessage);
        callback(response);
        return response;
      },
      function errorCallback(response) {
        if (!customErrorHandling) {
          error(response);
        }
        callback(response);
        return false;
      }
    );
  };

  //like post
  this.put = function(route, callback, successMessage, customErrorHandling) {
    if (typeof callback === "undefined") {
      callback = function(response) {
        console.log(response);
      };
    }
    $http({
      method: "PUT",
      url: baseURL + route,
      timeout: 5000
    }).then(
      function successCallback(response) {
        success(successMessage);
        callback(response);
        return response;
      },
      function errorCallback(response) {
        if (!customErrorHandling) {
          error(response);
        }
        callback(response);
        return false;
      }
    );
  };
  //like post without payload
  this.delete = function(route, callback, successMessage, customErrorHandling) {
    if (typeof callback === "undefined") {
      callback = function(response) {
        console.log(response);
      };
    }
    $http({
      method: "DELETE",
      url: baseURL + route,
      timeout: 5000
    }).then(
      function successCallback(response) {
        success(successMessage);
        callback(response);
        return response;
      },
      function errorCallback(response) {
        if (!customErrorHandling) {
          error(response);
        }
        callback(response);
        return false;
      }
    );
  };
});
//factory to login,register, logout and handle authentication
app.factory("AuthenticationFactory", function(
  $rootScope,
  $localStorage,
  $http,
  backend
) {
  var service = {};
  service.Login = Login;
  service.Logout = Logout;
  service.Register = Register;
  return service;

  function Login(username, password, callback) {
    var payload = {
      username: username,
      password: password
    };

    backend.post("user/login", payload, function(response) {
      if (response.status >= 200 && response.status < 300) {
        console.log("Logged in success");
        if (response.data.jwt) {
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
      username: username,
      name: name,
      password: password
    };

    backend.post("user/register", payload, function(response) {
      if (response.status >= 200 && response.status < 300) {
        console.log("Registered in success");
        if (response.data.jwt) {
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
    $http.defaults.headers.common.Authorization = "";
    $rootScope.loggedIn = false;
  }
});
