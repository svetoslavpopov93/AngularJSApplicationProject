/// <reference path="angular.js" />
/// <reference path="controller.js" />

(function () {
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
        .otherwise({redirectTo: '/home'});
    }]);

    adsApp.controller('PageController', ['$scope', function ($scope) {
        
    }]);
}());