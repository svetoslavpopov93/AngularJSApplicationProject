/// <reference path="angular.js" />
/// <reference path="controller.js" />
/// <reference path="jquery-2.1.3.min.js" />
/// <reference path="service-requester.js" />

(function () {
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
        .when('/user/ads/publish',
        {
            controller: 'UserPublishNewAdController',
            templateUrl: '/views/add-ad-view.html'
        })
        .when('/user/profile', {
            controller: 'EditUserController',
            templateUrl: '/views/edit-user-view.html'
        })
        .otherwise({ redirectTo: '/' });
    }]);

    adsApp.controller('HeaderController', ['$scope', function ($scope) {
        $scope.logout = function () {
            $scope.logout = serviceRequester.logout();
        }
    }]);

    adsApp.controller('PageController', ['$scope', '$http', function ($scope, $http) {
        var pagesCount = 0;

        $scope.data = serviceRequester.getAdsByPageAndNumber($scope, $http, 1);

        $scope.isLogged = function () {
            if (sessionStorage.length > 0) {
                return false;
            }

            return true;
        }

        //TODO: FIX PAGING
        $scope.numbs = function () {
            var numbers = { nums: [] };

            for (var i = 0; i < window.numPages; i++) {
                var a = { n: (i + 1) };
                numbers.nums.push(a);
            }

            $scope.numbs = numbers;

        }
        
        $scope.getPage = function (num) {
            serviceRequester.getAdsByPageAndNumber($scope, $http, 1);
        }

        serviceRequester.getCategories($scope, $http);

        serviceRequester.getTowns($scope, $http);
    }]);

    adsApp.controller('RegisterController', ['$scope', '$http', function ($scope, $http) {
        serviceRequester.getTowns($scope, $http);
        $scope.register = function (username, password, repeat, name, mail, phone, town) {
            var data = JSON.stringify({
                username: username,
                password: password,
                confirmPassword: repeat,
                name: name,
                email: mail,
                phone: phone,
                townId: town
            });

            serviceRequester.register($scope, $http, data);
        }
    }]);

    adsApp.controller('LoginController', ['$scope', '$http', '$location', function ($scope, $http) {
        $scope.login = function (username, password) {
            var dt = JSON.stringify({ username: username, password: password });
            serviceRequester.login($scope, $http, dt);
        };
    }]);

    adsApp.controller('UserAdsView', ['$scope', '$http', function ($scope, $http) {
        $scope.data = serviceRequester.getUserAds($scope, $http);
    }]);

    adsApp.controller('UserPublishNewAdController', function ($scope, $http, $rootScope, $location) {
        serviceRequester.getCategories($scope, $http);
        serviceRequester.getTowns($scope, $http);
        $scope.adData = { townId: null, categoryId: null };
        $scope.fileSelected = function (fileInputField) {
            delete $scope.adData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function () {
                    $scope.adData.imageDataUrl = reader.result;
                    $(".image-box").html("<img src='" + reader.result + "'>");
                };
                reader.readAsDataURL(file);
            } else {
                $(".image-box").html("<p>File type not supported!</p>");
            }
        };

        $scope.publishAd = function (adData) {
            serviceRequester.adAdd($scope, $http, adData);
        };
    });

    adsApp.controller('EditUserController', ['$scope', '$http', function ($scope, $http) {
        //TODO: implement edit user functionality

    }]);
}());