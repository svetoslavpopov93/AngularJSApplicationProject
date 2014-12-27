/// <reference path="angular.js" />
/// <reference path="controller.js" />
/// <reference path="jquery-2.1.3.min.js" />
/// <reference path="service-requester.js" />

(function () {
    function defineLoginBtn() {
        var loginBtn = $("#login-btn");
        loginBtn.on('click', function () {
            serviceRequester.login();
        });
    }

    function defineRegisterBtn() {
        var registerBtn = $("#register_btn");
        registerBtn.on('click', function () {
            serviceRequester.register();
        });
    }

    var adsApp = angular.module('adsApp', ["ngRoute"]);

    adsApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/home',
        {
            controller: 'PageController',
            templateUrl: '/views/home-view.html'
        })
        .when('/login',
        {
            controller: 'PageController',
            templateUrl: '/views/login-view.html'
        })
        .when('/register',
        {
            controller: 'PageController',
            templateUrl: '/views/register-view.html'
        })
        .otherwise({ redirectTo: '/home' });
    }]);
    
    function displayAds($scope, $http) {
        $scope.data = serviceRequester.getAds($scope, $http);
    }

    adsApp.controller('PageController', ['$scope', '$http', function ($scope, $http) {
        //$scope.displayAds = displayAds($scope, $http);
        //$scope.lgn = serviceRequester.login();var loginBtn = $("#login-btn");
        defineLoginBtn();
        defineRegisterBtn();
    }]);
}());