angular.module('CalculatorApp', [])
    .controller('CalculatorController', function ($scope) {
        // Write code simple calculator operations

        $scope.Outanswer ="0";
        $scope.equationArr = [];

        $scope.numLeft = "";
        $scope.numRight= "";
        $scope.isOperator = false;
        $scope.operator = "";


        $scope.getAnswer = function(){
            for (let i =0; i< $scope.equationArr.length; i++){
                let char = $scope.equationArr[i];
                if (char === parseInt(char, 10)){
                    if (!$scope.isOperator){
                      $scope.numLeft +=  char;
                    } else if ($scope.isOperator){
                        $scope.numRight += char;
                    }
                } else{
                    $scope.operator = char;
                    $scope.isOperator = true;
                }
            }
            $scope.numLeft = parseInt($scope.numLeft,10);
            $scope.numRight = parseInt($scope.numRight, 10);

            if ($scope.operator === '+') {
                $scope.Outanswer = $scope.numLeft + $scope.numRight;
            }
            if ($scope.operator === '-') {
                $scope.Outanswer = $scope.numLeft - $scope.numRight;
            }
            if ($scope.operator === '*') {
                $scope.Outanswer = $scope.numLeft * $scope.numRight;
            }
            if ($scope.operator === '/') {
                $scope.Outanswer = $scope.numLeft / $scope.numRight;
            }
            $scope.equationArr.length =0;
            $scope.numLeft = $scope.Outanswer;
            $scope.numRight = "";
            $scope.isOperator = false;
        };

        $scope.equationAdd = function(n){
            $scope.equationArr.push(n);
            if ($scope.Outanswer.length ===1 && $scope.Outanswer === "0"){
                $scope.Outanswer = n.toString();
            }else{
                $scope.Outanswer += n.toString();
            }

        };

        $scope.clearAll = function(){
            $scope.Outanswer = "0";
            $scope.equationArr.length =0;
            $scope.numLeft="";
            $scope.numRight="";
            $scope.isOperator = false;
            $scope.output = "0";
        };


    });