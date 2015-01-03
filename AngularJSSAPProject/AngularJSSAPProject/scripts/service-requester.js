/// <reference path="angular.js" />
/// <reference path="jquery-2.1.3.min.js" />

var serviceRequester = (function () {
    function getAllAds($scope, $http) {
        $http.get('http://localhost:1337/api/ads').
        success(function (data, status, headers, config) {
            $scope.data = data;
            console.log("Ads loaded successfully!");
        }).
        error(function (data, status, headers, config) {
            console.log("Ad loading failed!");
        });
    }

    function getUserAds($scope, $http) {
        headers = { Authorization: 'Bearer ' + sessionStorage.getItem('access_token') };


        $http.get('http://localhost:1337/api/user/ads', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("access_token")
            }
        }).
            success(function (data, status, headers, config) {
                $scope.data = data;
                console.log("Ads loaded successfully!");
            }).
            error(function (data, status, headers, config) {
                console.log("Ad loading failed!");
            });
    }

    function login(dt) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:1337/api/user/Login',
            contentType: "application/json",
            data: dt,
            success: function (data) {
                saveData(data);
                console.log(data);
                 window.location.href = '/index.html#/home';
            },
            error: function (e) {
                alert(e.error());
                console.log(e.error());
            }
        });
    }

    function register($scope, $http, data) {
        $http.post('http://localhost:1337/api/user/register', data)
            .success(function (data, status, headers, config) {
                $scope.data = data;
                saveData(data);
                console.log("User registered successfully!");
                window.location.href = '/index.html#/login';
            })
            .error(function (data, status, headers, config) {
                console.log("User register failed!");
            });
    }

    function logout() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("username");
        window.location.href = '/index.html#/home';
    }

    function adAdd($scope, $http, data) {
        $http.post('http://localhost:1337/api/user/ads',
            data, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("access_token")
            }
        })
            .success(function (data, status, headers, config) {
                $scope.data = data;
                console.log("Ad published successfully!");
                window.location.href = '/index.html#/user/ads';
            })
            .error(function (data, status, headers, config) {
                console.log("Ad publishing failed!");
            });
    }

    function saveData(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('access_token', data.access_token);
    }

    return {
        getAds: getAllAds,
        getUserAds: getUserAds,
        login: login,
        register: register,
        logout: logout,
        adAdd: adAdd
    };
}());