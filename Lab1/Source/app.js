// 'use strict';
// Declare app level module which depends on views, and components
angular.module('myApp', [])
    .controller('View1Ctrl', function ($scope, $http) {
        // Create a array for the itemListElement
        $scope.entitiesList = new Array();
        $scope.clear = function () {
            $scope.entitiesList = [];
        }
        $scope.getEntities = function () {
            // Declare the how many entities to display
            var searchLimit = 10;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            $http.get("https://kgsearch.googleapis.com/v1/entities:search", {
                // The parameters for the knowledge search
                params: {
                    'query': searchQuery,
                    'limit': searchLimit,
                    'indent': true,
                    'key': 'AIzaSyB19XNZ4t7Z8MvE_dTXQZGWT87Vdg8lZKI',
                }
            })
            //This is the API that gives the list of entities based on the search query.
                .then(function (response) {
                    // Request completed successfully
                    // Check the response data. alert user if the data is empty
                    if (response.data.itemListElement.length == 0) {
                        alert("There is no entity match your query, please check your input")
                    } else {
                        // Store the itemListElement to the array
                        for (var i = 0; i < searchLimit; i++) {
                            $scope.entitiesList.push(response.data.itemListElement[i]);
                        }
                    }
                }, function (x) {
                    // Request error
                    alert("There was some error. Please check your code or try again later.");
                });
        }
    });