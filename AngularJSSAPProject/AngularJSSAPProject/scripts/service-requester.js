/// <reference path="angular.js" />
/// <reference path="jquery-2.1.3.min.js" />

var serviceRequester = (function () {
    function getAllAds($scope, $http) {

        var headers;
        if (sessionStorage.getItem('access_token') != null) {
            headers = { Authorization: 'Bearer ' + sessionStorage.getItem('access_token') };

            $.ajax({
                type: 'GET',
                url: 'http://localhost:1337/api/user/ads',
                contentType: "application/json",
                headers: headers,
                success: function (data) {
                    alert("done!");
                    $scope.data = data;
                    console.log(data);
                },
                error: function (e) {
                    alert(e.error());
                    console.log(e.error());
                }
            });
        }
        else {
            $http.get('http://localhost:1337/api/ads').
            success(function (data, status, headers, config) {
                $scope.data = data;
                console.log("Ads loaded successfully!");
            }).
            error(function (data, status, headers, config) {
                console.log("Ad loading failed!");
            });
        }
    }

    function login() {
        var un = $('#login-view-username').val();
        var pass = $('#login-view-password').val();
        var btnLogin = $('#login-view-btn');
        var dt = JSON.stringify({ username: un, password: pass });

        $.ajax({
            type: 'POST',
            url: 'http://localhost:1337/api/user/Login',
            contentType: "application/json",
            data: dt,
            success: function (data) {
                saveData(data);
                console.log(data);
            },
            error: function (e) {
                alert(e.error());
                console.log(e.error());
            }
        });
        // window.location.href = '/index.html#/home';
    }

    function register() {
        var username = $("#register-view-username").val();
        var password = $("#register-view-password").val();
        var repeatPassword = $("#register-view-repeat-password").val();
        var name = $("#register-view-name").val();
        var email = $("#register-view-email").val();
        var phone = $("#register-view-phone").val();
        var town = $("#register-view-towns").val();

        var dt = JSON.stringify({
            username: username,
            password: password,
            confirmPassword: repeatPassword,
            name: name,
            email: email,
            phone: phone,
            townId: town
        });

        $.ajax({
            type: 'POST',
            url: 'http://localhost:1337/api/user/register',
            contentType: "application/json",
            data: dt,
            success: function (data) {
                saveData(data);
                console.log(data);
            },
            error: function (e) {
                alert(e.error());
                console.log(e.error());
            }
        });
    }

    function logout() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("username");
    }

    function saveData(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('access_token', data.access_token);
    }

    return {
        getAds: getAllAds,
        login: login,
        register: register,
        logout: logout
        //saveData: saveData
    };
}());