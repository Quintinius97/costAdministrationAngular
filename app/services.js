//app.service('backend', function ($http, $uibModal, $rootScope, Notification, $location) {
app.service('backend', function ($http, $rootScope, $location) {
   var baseURL = "http://localhost:3000/";
    console.log(baseURL);

    function success(successMessage) {
        console.log("success");
        console.log(typeof successMessage);
        if (typeof successMessage == 'string') {
            console.log(typeof successMessage);
            Notification.success(successMessage);
        }
    }

    function error(response) {
        console.log("error");
        console.log(response.status);
        if (response.status == 401) {
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
    this.post = function (route, payload, callback, successMessage, customErrorHandling) {
        if (typeof callback === 'undefined') {
            callback = function (response) {
                console.log(response);
            };
        }
        $http({
            method: 'POST',
            url: baseURL + route,
            data: payload,
            headers: {
                "Content-Type":   "application/json"
            },
            timeout: 10000
        }).then(function  successCallback(response) {
            success(successMessage);
            callback(response);
            return response;
        },  function  errorCallback(response) {
            if (!customErrorHandling) {
                error(response);
            }
            callback(response);
            return response;
        });
    };
    this.get = function (route, callback, successMessage, customErrorHandling) {
        if (typeof callback === 'undefined') {
            callback = function (response) {
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
        }).then(function  successCallback(response) {
            success(successMessage);
            callback(response);
            return response;
        },  function  errorCallback(response) {
            if (!customErrorHandling) {
                error(response);
            }
            callback(response);
            return false;
        });
    };
    this.put = function (route, callback, successMessage, customErrorHandling) {
        if (typeof callback === 'undefined') {
            callback = function (response) {
                console.log(response);
            };
        }
        $http({
            method: 'PUT',
            url: baseURL + route,
            timeout: 5000
        }).then(function  successCallback(response) {
            success(successMessage);
            callback(response);
            return response;
        },  function  errorCallback(response) {
            if (!customErrorHandling) {
                error(response);
            }
            callback(response);
            return false;
        });
    };
    this.delete = function (route, callback, successMessage, customErrorHandling) {
        if (typeof callback === 'undefined') {
            callback = function (response) {
                console.log(response);
            };
        }
        $http({
            method: 'DELETE',
            url: baseURL + route,
            timeout: 5000
        }).then(function  successCallback(response) {
            success(successMessage);
            callback(response);
            return response;
        },  function  errorCallback(response) {
            if (!customErrorHandling) {
                error(response);
            }
            callback(response);
            return false;
        });
    };
});
app.factory('AuthenticationFactory', function ($rootScope, $localStorage, $http, backend) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;
    return service;

    function Login(username, password, callback) {
        var payload = {
            "username": username ,
                "password": password
            
        };
        
        backend.post('user/login', payload, function (response) {
            if (response.status >= 2000&&response.status < 300) {
                console.log("Logged in success");
                if (response.data.jwt) {
                    $localStorage.currentUser = response.data;
                    $rootScope.loggedIn = true;
                    $rootScope.isAdmin = $localStorage.currentUser.isAdmin;
                    $rootScope.firstLogin = $localStorage.currentUser.firstLogin;
                    $http.defaults.headers.common.Authorization = $localStorage.currentUser.jwt;

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
        backend.post('logout', undefined, undefined, "Sie wurdern erfolgreich abgemeldet");
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
        $rootScope.isAdmin = false;
        $rootScope.firstLogin = false;
        $rootScope.loggedIn = false;
    }
});