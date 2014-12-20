/// <reference path="angular.js" />
/// <reference path="controller.js" />

(function () {
    var mainModule = angular.module('mainModule', []);

    mainModule.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/', {
            templateUrl: 'views/home-view.html',
            controller: 'PublicScreenView'
        }).
        when('/login', {
            templateUrl: 'views/login-view.html',
            controller: 'PublicScreenView'
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);


    function PublicScreenView($scope) {
        $scope.asd = 'asdadad';
    }

    mainModule.controller('PublicScreenView', PublicScreenView);
}());