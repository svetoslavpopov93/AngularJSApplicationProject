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
        .otherwise({ redirectTo: '/home' });
    }]);

    function displayAds($scope, $http) {
        $http.get('http://localhost:1337/api/ads').
    success(function (data, status, headers, config) {
        $scope.data = data;
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
            // this callback will be called asynchronously
            // when the response is available
        }).
    error(function (data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
    });
    }

    adsApp.controller('PageController', ['$scope', '$http', function ($scope, $http) {
        $scope.displayAds = displayAds($scope, $http);
    }]);
}());