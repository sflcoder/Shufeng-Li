var angularTodo = angular.module('angularTodo', []);

angularTodo.controller('angularTodoC', ['$scope', function ($scope) {
    // define list of items
    $scope.list = [];
    $scope.items = [{todoText:'Call Dad', done:false}, {todoText: 'finish ICP', done: false}];
    // return new angularTodo(items);

    // Write code to push new item
    $scope.submitNewItem = function() {
            $scope.items.push({todoText:$scope.text, done:false});
            $scope.submitNewItem="";
            $scope.text="";


    };

    $scope.submit = function(){
        if ($scope.text){
            //$scope.list.push($scope.text);
            $scope.items.push({todoText:$scope.text, done: false});
            $scope.text='';
        }
    };


    // Write code to complete item
    $scope.completeItem = function (index) {
        if ($scope.items[index].done === false){
            $scope.items[index].done = true;
        }else if ($scope.items[index].done === true){
            $scope.items[index].done = false;
        }
    };

    // Write code to delete item

    $scope.deleteItem = function (index) {
        $scope.items.splice($scope.items.indexOf(index));
    };
}]);