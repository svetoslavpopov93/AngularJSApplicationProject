/// <reference path="angular.js" />
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

    function login($scope, $http, un, pass) {
        var dat = JSON.stringify({ username: un, password: pass });

        $http.post('http://localhost:1337/api/user/login', { "username": 'goshy', "password": '123' }).
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
  });



        //$http.post('http://localhost:1337/api/user/login', dat)
        //.success(function (data, status, headers, config) {
        //    //$scope.data = data;
        //    console.log("Login successful!");
        //    console.log(data);
        //}).
        //error(function (data, status, headers, config) {
        //    console.log("Login failed!");
        //});
        $window.location.href = '/home';
    }

    return {
        getAds: getAllAds,
        login: login
    };
}());