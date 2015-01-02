/// <reference path="angular.js" />
/// <reference path="controller.js" />
/// <reference path="jquery-2.1.3.min.js" />
/// <reference path="service-requester.js" />

(function () {
    function loginUser() {
            serviceRequester.login();
    }

    function registerUser() {
            serviceRequester.register();
    }

    var adsApp = angular.module('adsApp', ["ngRoute"]);

    adsApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/',
        {
            controller: 'PageController',
            templateUrl: '/views/home-view.html'
        })
        .when('/login',
        {
            controller: 'LoginController',
            templateUrl: '/views/login-view.html'
        })
        .when('/register',
        {
            controller: 'RegisterController',
            templateUrl: '/views/register-view.html'
        })
        .when('/user/ads',
        {
            controller: 'UserAdsView',
            templateUrl: '/views/user-ads-view.html'
        })
        .otherwise({ redirectTo: '/' });
    }]);
    
    adsApp.controller('HeaderController', ['$scope', function ($scope) {
        alert("asdasd");
        //$scope.logout = serviceRequester.logout();
    }]);

    adsApp.controller('PageController', ['$scope', '$http', function ($scope, $http) {
        $scope.data = serviceRequester.getAds($scope, $http);
    }]);

    adsApp.controller('RegisterController', ['$scope', '$http', function ($scope, $http) {
        $scope.register = registerUser;
    }]);

    adsApp.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
        $scope.login = loginUser;
    }]);

    adsApp.controller('UserAdsView', ['$scope', '$http', function ($scope, $http) {
        $scope.data = serviceRequester.getUserAds($scope, $http);
    }]);
}());