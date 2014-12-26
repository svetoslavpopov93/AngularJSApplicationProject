/// <reference path="angular.js" />
/// <reference path="jquery-2.1.3.min.js" />
/// <reference path="service-requester.js" />

var UserController = (function () {
    function UserController($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
        setLoginControls();
    }

    function setLoginControls() {
        var username = $('#login-view-username');
        var password = $('#login-view-password');
        var btnLogin = $('#login-view-btn');
        
        function log(un, pass) {
            serviceRequester.login(this.$scope, this.$http, username.val(), password.val());
        }

        btnLogin.on("click", log);
    }

    function register() {

    }

    function logout() {

    }

    return UserController;
}());