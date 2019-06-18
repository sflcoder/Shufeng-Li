// 'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http) {
        // $scope.venueList = new Array();
        // $scope.mostRecentReview;
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            // var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "") {

                //This is the API that gives the list of venues based on the place and search query.
                // var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                //     "?client_id=P10R2DXYHINGUSA2SIRFCLYPA2AYHSZSLM24AVJS0WH5KX53" +
                //     "&client_secret=SPWC3KWQRTWIPIZBI0TVPPZ0WIT0HPSXZYC1VEQUDJWDUYSG" +
                //     "&v=20160215&limit=5" +
                //     "&near=" + placeEntered +
                //     "&query=" + searchQuery);
                var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate" +
                    "?key=trnsl.1.1.20190618T160558Z.5d3b88b394caa5e4.0fe024d56ba2c5a0b3438cf4bee68ebe095b76f0" +
                    "&text=" + placeEntered +
                    "&lang=es");
                    // "& [format=html]" +
                    // "& [options='1']");
                    // "& [callback=<name of the callback function>]
                handler.success(function (data) {
                        if (data != null){
                    // if (data != null && data.response != null && data.response != undefined && data.response != null) {
                        // Tie an array named "venueList" to the scope which is an array of objects.
                        // Each object should have key value pairs where the keys are "name", "id" , "location" and values are their corresponding values from the response
                        // Marks will be distributed between logic, implementation and UI
                        console.log(data.text[0]);
                            $scope.translation = data.text[0];
                        // for(i = 0; i < 5; i++){
                        //     // console.log(data.response.venues[i].name)
                        //     $scope.venueList.push({name: data.response.venues[i].name}, {id: data.response.venues[i].id}, {location: data.response.venues[i].location});
                        //     // console.log(data.response.venues[0].name);
                        //     console.log($scope.venueList);
                        // }
                    }
                    ;
                    handler.error(function (data) {
                        alert("There was some error processing your request. Please try after some time.");
                    });
                });
            }
        }
    });