﻿/// <reference path="angular.js" />
/// <reference path="jquery-2.1.3.min.js" />

var serviceRequester = (function () {
    var defaultPageSize = 4;
    var baseUrl = "http://localhost:1337";

    function getAllAds($scope, $http) {
        $http.get(baseUrl + '/api/ads').
        success(function (data, status, headers, config) {
            $scope.data = data;
            console.log("Ads loaded successfully!");
        }).
        error(function (data, status, headers, config) {
            console.log("Ad loading failed!");
        });
    }

    function getAdsByPageAndNumber($scope, $http, startPage) {
        $http.get(baseUrl + '/api/ads?pagesize=' + defaultPageSize + '&startpage=' + startPage)
            .success(function (data, status, headers, config) {
                $scope.data = data;
                var pageButtonsData = [];

                for (var i = 1; i < data.numPages + 1; i++) {
                    pageButtonsData.push({
                        value: i
                    });
                }

                $scope.pageButtonsData = pageButtonsData;
                console.log("Ads loaded successfully!");
            }).
            error(function (data, status, headers, config) {
                console.log("Ad loading failed!");
            });
    }

    function getAdsByPageAndFilers($scope, $http, startPage, categoryId, townId) {
        var categoryStr = "";
        var townStr = "";
        if (categoryId != undefined) {
            categoryStr = "&categoryId=" + categoryId;
        }

        if (townId != undefined) {
            townStr = "&townId=" + townId;
        }

        $http.get(baseUrl + '/api/ads?pagesize=' + defaultPageSize + '&startpage=' + startPage + categoryStr + townStr)
            .success(function (data, status, headers, config) {
                $scope.data = data;
                var pageButtonsData = [];

                for (var i = 1; i < data.numPages + 1; i++) {
                    pageButtonsData.push({
                        value: i
                    });
                }

                $scope.pageButtonsData = pageButtonsData;
                console.log("Ads loaded successfully!");
            }).
            error(function (data, status, headers, config) {
                console.log("Ad loading failed!");
            });
    }

    function getUserAds($scope, $http) {
        headers = { Authorization: 'Bearer ' + sessionStorage.getItem('access_token') };


        $http.get(baseUrl + '/api/user/ads', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("access_token")
            }
        }).
            success(function (data, status, headers, config) {
                $scope.data = data;
                console.log("Ads loaded successfully!");
            }).
            error(function (data, status, headers, config) {
                console.log("Ad loading failed!");
            });
    }

    function getUserProfile($scope, $http) {
        $http.get(baseUrl + '/api/user/profile',
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("access_token")
                }
            })
            .success(function (data, status, headers, config) {
                $scope.user = data;
                $scope.userForInfo = {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber
                };
                console.log(data);
                console.log("User profile info recieved successfully!");
            })
            .error(function (data, status, headers, config) {
                console.log("Retrieving user profile info failed!");
            });
    }

    function editAd($scope, $http, data, id, editPanel) {
        $http.put(baseUrl + '/api/user/ads/' + id,
            data,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("access_token")
                }
            })
            .success(function (data, status, headers, config) {
                getUserAds($scope, $http);
                alertify.success("Ad edited successfully!");
                editPanel.hide();
            })
            .error(function (data, status, headers, config) {
                alertify.error("Failed to edit ad.");
            });
    }

    function deleteAd($scope, $http, id) {
        $http.delete(baseUrl + '/api/user/ads/' + id,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("access_token")
                }
            })
            .success(function (data, status, headers, config) {
                alertify.success("Ad deleted successfully!");
                getUserAds($scope, $http);
                editPanel.hide();
            })
            .error(function (data, status, headers, config) {
                alertify.error("Failed to delete ad.");
            });
    }

    function login($scope, $http, data) {
        $http.post(baseUrl + '/api/user/login', data)
            .success(function (data, status, headers, config) {
                alertify.success("Login successful! Welcome, " + data.username + "!");
                $scope.data = data;
                saveData(data);
                window.location.href = '/index.html#/home';
            })
            .error(function (data, status, headers, config) {
                console.log("User login failed!");
                alertify.error("Incorrect username or password!");
            });
    }

    function register($scope, $http, data) {
        $http.post(baseUrl + '/api/user/register', data)
            .success(function (data, status, headers, config) {
                alertify.success("Registration successful! Welcome, " + data.username + "!");
                $scope.data = data;
                saveData(data);
                console.log("User registered successfully!");
                window.location.href = '/index.html#/login';
            })
            .error(function (data, status, headers, config) {
                alertify.error("Registration failed.");
                console.log("User register failed!");
            });
    }

    function changePassword($scope, $http, data) {
        $http.put(baseUrl + '/api/user/changepassword/',
            data,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("access_token")
                }
            })
            .success(function (data, status, headers, config) {
                getUserProfile($scope, $http);
                alertify.success("Password changed successfully!");
            })
            .error(function (data, status, headers, config) {
                alertify.error("Failed to change password. Please make sure that the information is correct.");
            });
    }

    function editPersonalInfo($scope, $http, data) {
        $http.put(baseUrl + '/api/user/profile/',
            data,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("access_token")
                }
            })
            .success(function (data, status, headers, config) {
                getUserProfile($scope, $http);
                alertify.success("User personal info changed successfully!");
            })
            .error(function (data, status, headers, config) {
                alertify.error("Failed to edit user personal info.");
            });
    }

    function logout() {
        alertify.log("Logout successful!");
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("username");
        window.location.href = '/index.html#/home';
    }

    function adAdd($scope, $http, data) {
        $http.post(baseUrl + '/api/user/ads',
            data, {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("access_token")
                }
            })
            .success(function (data, status, headers, config) {
                alertify.success("Ad published successfully!");
                $scope.data = data;
                console.log("Ad published successfully!");
                window.location.href = '/index.html#/user/ads';
            })
            .error(function (data, status, headers, config) {
                alertify.error("Ad publishing failed!");
                console.log("Ad publishing failed!");
            });
    }

    function getTowns($scope, $http) {
        $http.get(baseUrl + '/api/towns').
                success(function (data, status, headers, config) {
                    $scope.towns = data;
                    console.log("Towns loaded successfully!");
                }).
                error(function (data, status, headers, config) {
                    console.log("Towns loading failed!");
                });
    }

    function getCategories($scope, $http) {
        $http.get(baseUrl + '/api/categories').
                success(function (data, status, headers, config) {
                    $scope.categories = data;
                    console.log("Categories loaded successfully!");
                    console.log(data[0]);
                }).
                error(function (data, status, headers, config) {
                    console.log("Categories loading failed!");
                });
    }

    function getAdsWithCategoryFilter($scope, $http) {
        var categoryId = window.categoryId;

        $http.get(baseUrl + '/api/ads?categoryid=' + categoryId + '&pagesize=5&startpage=1')
                    .success(function (data, status, headers, config) {
                        $scope.data = data;
                        console.log(data);
                        console.log("Ads with category filters loaded successfully!");
                    })
                    .error(function (data, status, headers, config) {
                        console.log("Ad with category filters loading failed!");
                    });
    }

    function getAdsWithTownFilter($scope, $http) {
        var townId = window.townId;

        $http.get(baseUrl + '/api/ads?townId=' + townId + '&pagesize=5&startpage=1')
                    .success(function (data, status, headers, config) {
                        $scope.data = data;
                        console.log(data);
                        console.log("Ads with category filters loaded successfully!");
                    })
                    .error(function (data, status, headers, config) {
                        console.log("Ad with category filters loading failed!");
                    });
    }

    function saveData(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('access_token', data.access_token);
    }

    return {
        getAds: getAllAds,
        getUserAds: getUserAds,
        login: login,
        register: register,
        changePassword: changePassword,
        editPersonalInfo: editPersonalInfo,
        logout: logout,
        adAdd: adAdd,
        editAd: editAd,
        getTowns: getTowns,
        getCategories: getCategories,
        getAdsByPageAndNumber: getAdsByPageAndNumber,
        getAdsWithCategoryFilter: getAdsWithCategoryFilter,
        getAdsWithTownFilter: getAdsWithTownFilter,
        getAdsByPageAndFilers: getAdsByPageAndFilers,
        getUserProfile: getUserProfile,
        deleteAd: deleteAd
    };
}());