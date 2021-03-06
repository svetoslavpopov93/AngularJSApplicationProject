﻿/// <reference path="angular.js" />
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

        serviceRequester.getCategories($scope, $http);
        serviceRequester.getTowns($scope, $http);
        if (sessionStorage.length > 0) {
            serviceRequester.getUserProfile($scope, $http);
        }

        $scope.isLogged = function () {
            if (sessionStorage.length > 0) {
                return false;
            }

            return true;
        }
        $scope.getPage = function (num) {
            var categoryId = window.categoryId;
            var townId = window.townId;
            serviceRequester.getAdsByPageAndFilers($scope, $http, num, categoryId, townId);
        }

        $scope.applyCategoryFilter = function (id) {
            window.categoryId = id;

            getAdsWithFilter();
        }

        $scope.applyTownFilter = function (id) {
            window.townId = id;

            getAdsWithFilter();
        }

        $scope.clearFilters = function () {
            window.categoryId = undefined;
            window.townId = undefined;
            serviceRequester.getAdsByPageAndNumber($scope, $http, 1);
        }

        $scope.logout = function () {
            $scope.logout = serviceRequester.logout();
        }

        function getAdsWithFilter() {
            var categoryId = window.categoryId;
            var townId = window.townId;

            serviceRequester.getAdsByPageAndFilers($scope, $http, 1, categoryId, townId);;

        }
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
        serviceRequester.getUserProfile($scope, $http);
        serviceRequester.getCategories($scope, $http);
        serviceRequester.getTowns($scope, $http);

        var editPanel = $('#edit-panel');

        $scope.data = serviceRequester.getUserAds($scope, $http);
        $scope.logout = function () {
            $scope.logout = serviceRequester.logout();
        }

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
        $scope.editBtnClicked = function (data) {
            editPanel.show();
            $scope.adData.id = data.id;
            $scope.adData.title = data.title;
            $scope.adData.text = data.text;
            $scope.adData.imageDataUrl = data.imageDataUrl;
            for (var i = 0; i < $scope.towns.length; i++) {
                if ($scope.towns[i].name == data.townName) {
                    $scope.adData.townId = $scope.towns[i].id;
                    break;
                }
            }



            for (var i = 0; i < $scope.categories.length; i++) {
                if ($scope.categories[i].name == data.categoryName) {
                    $scope.adData.categoryId = $scope.categories[i].id;
                    break;
                }
            }
        }

        $scope.edit = function (ad) {
            var data = {
                title: ad.title,
                text: ad.text,
                categoryId: ad.categoryId,
                townId: ad.townId
            };

            if (ad.changeimage == "true") {
                data.changeimage = ad.changeimage;
                data.imageDataUrl = '' + $scope.adData.imageDataUrl;
            }

            serviceRequester.editAd($scope, $http, data, ad.id, editPanel);
        }

        $scope.delete = function (ad) {
            alertify.confirm(('Delete ad "' + ad.title + '"'), function (e) {
                if (e) {
                    serviceRequester.deleteAd($scope, $http, ad.id);
                } else {
                }
            });
        }

        $scope.closeEditor = function () {
            editPanel.hide();
        }
    }]);

    adsApp.controller('UserPublishNewAdController', function ($scope, $http, $rootScope, $location) {
        serviceRequester.getCategories($scope, $http);
        serviceRequester.getTowns($scope, $http);
        serviceRequester.getUserProfile($scope, $http);
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

        $scope.logout = function () {
            $scope.logout = serviceRequester.logout();
        }
    });

    adsApp.controller('EditUserController', ['$scope', '$http', function ($scope, $http) {
        //TODO: implement edit user functionality
        serviceRequester.getUserProfile($scope, $http);
        serviceRequester.getCategories($scope, $http);
        serviceRequester.getTowns($scope, $http);

        $scope.logout = function () {
            $scope.logout = serviceRequester.logout();
        }

        $scope.editPersonalInfo = function (name, email, phone, town) {
            var data = JSON.stringify({
                name: name,
                email: email,
                phoneNumber: phone
            });

            if (town != null | town != undefined) {
                data.townId = town
            }

            serviceRequester.editPersonalInfo($scope, $http, data);
        }
        $scope.changePassword = function (oldPassword, newPassword, confirmPassword) {
            var data = JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            });

            serviceRequester.changePassword($scope, $http, data);
        }
    }]);

    //app.run(["$rootScope", "$location", "AccountService", function ($rootScope, $location, AccountService) {
    //    $rootScope.$on("$locationChangeStart", function (e) {
        
    //    }}]))
}());