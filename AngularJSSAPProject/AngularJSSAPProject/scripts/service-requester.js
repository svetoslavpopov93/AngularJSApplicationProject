﻿/// <reference path="angular.js" />
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

    //TODO: session 
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
                    console.log(data);
                },
                error: function (e) {
                    alert(e.error());
                    console.log(e.error());
                }
            });
        window.location.href = '/index.html#/home';
    }

    function register() {
        var username = $("#register-view-username").val();
        var password = $("#register-view-password").val();
        var repeatPassword = $("#register-view-repeat-password").val();
        var name = $("#register-view-name").val();
        var email = $("#register-view-email").val();
        var phone = $("#register-view-email").val();
        var town = $("register-view-towns").val();

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
            url: 'http://localhost:1337/api/user/Login',
            contentType: "application/json",
            data: dt,
            success: function (data) {
                console.log(data);
            },
            error: function (e) {
                alert(e.error());
                console.log(e.error());
            }
        });
    }

    return {
        getAds: getAllAds,
        login: login,
        register: register
    };
}());