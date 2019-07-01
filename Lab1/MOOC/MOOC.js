// var userName = document.getElementById("input");
// var users = [];
// var currentUser="Guest";
// var currentIndex=users.indexOf("currentUser");
//
// function submit() {
//     currentUser=input.value;
//     users.push({name: input.value, clicker: false, basics: false, intermediate: false, puppy: false, leash: false, agility: false});
//     for (var i = 0; i < users.length; i++) {
//         console.log(users[i]);
//     }
//     document.getElementById('input').value='';
// }
//
// function updateStatus(page) {
//     if (value === "inProgress")
//     {
//         users[currentIndex].page=false;
//         for (var i = 0; i < users.length; i++) {
//             console.log(users[i]);
//         }
//
//     }
//     if (value === "completed")
//     {
//         users[currentIndex].page=true;
//     }
//
//
// }
var app = angular.module('app', []);

app.controller('MOOCController', ['$scope', function ($scope) {
    $scope.users = [{name: "Guest", clicker: false, basic: false, intermediate: false, puppy: false, leash: false, agility: false}];

    $scope.submit = function(){
        if ($scope.text){
            $scope.users.push({name:$scope.text, clicker: false, basic: false, intermediate: false, puppy: false, leash: false, agility: false});
            $scope.text='';
        }
    };

    $scope.complete = function (index) {
        if ($scope.items[index].done === false){
            $scope.items[index].done = true;
        }else if ($scope.items[index].done === true){
            $scope.items[index].done = false;
        }
    };

}]);