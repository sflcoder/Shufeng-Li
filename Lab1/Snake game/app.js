angular.module('snakeApp', [])

.controller('controller', function($scope, $timeout, $window) {
    let BOARD_SIZE=20;

    //codes for keyboard directions
    let directions = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
    };

    let colors = {
        LOST: '#ff0c02',
        FRUIT: '#e88d15',
        SNAKE_HEAD: '#137328',
        SNAKE_BODY: '#48ff48',
        BOARD: '#ffffff'
    };

    let snake= {
        direction: directions.DOWN ,
        body: [{
            x: -1,
            y: -1
        }]
    };

    let fruit = {
        x: -1,
        y: -1
    };

   let time = 150;
   let startDir = directions.DOWN;
   let isOver = false;

    $scope.score =0;
    $scope.bestScore = 0;
    $scope.difficulty= 1;

    $scope.setBackgroundColor = function(col, row) {
        if (isOver)  {
            return colors.LOST;
        }else if (fruit.x === row && fruit.y === col) {
            return colors.FRUIT;
        }
        else if (snake.body[0].x === row && snake.body[0].y === col) {
            return colors.SNAKE_HEAD;
        } else if ($scope.board[col][row] === true) {
            return colors.SNAKE_BODY;
        }
        return colors.BOARD;
    };
    $scope.setBorderRadius = function(col, row){
        if (fruit.x === row && fruit.y === col || $scope.board[col][row] === true){
            return '100%';
        } else{
            return 'none';

        }
    };
    //set image for fruit- not working?
    $scope.setBackgroundImage = function(col, row){
        if (fruit.x === row && fruit.y === col){
            return "url('icons/newCherry.png') no-repeat";
        } else{
            return "none";
        }
    };

    //set up game
    setUpBoard();

    //set key listeners
    $window.addEventListener("keyup", function(key) {
        switch(key.keyCode){
            case directions.LEFT:
                startDir = directions.LEFT;
                break;
            case directions.RIGHT:
                startDir = directions.RIGHT;
                break;
            case directions.UP:
                startDir = directions.UP;
                break;
            case directions.DOWN:
                startDir = directions.DOWN;
                break;
            default:
                break;
        }
    });

    //start game on click
    $scope.start = function(){
        $scope.score = 0;
        snake = {direction: directions.LEFT, body: []};

        //set up snake length
        for (let i = 0; i < 5; i ++){
            snake.body.push({x:10 + i, y:10});
        }
        resetFruit();
        update();
    };

    //sets up new board
    function setUpBoard(){
        $scope.board = [];
        for (let i =0; i < BOARD_SIZE; i++){
            $scope.board[i] = [];
            for (let j =0; j< BOARD_SIZE; j++){
                $scope.board[i][j] = false;
            }
        }
    }

    //generate new snake
    function newSnake(){
        let head = angular.copy(snake.body[0]);

       switch(startDir){
            case directions.LEFT:
                head.x-=1;
                break;
            case directions.RIGHT:
                head.x +=1;
                break;
            case directions.DOWN:
                head.y+=1;
                break;
            case directions.UP:
                head.y -=1;
                break;
            default:
                break;
        }
        return head;
    }

    //bool to check for crashes
    function crashed(snake){
        return snake.x === BOARD_SIZE || snake.x === -1 || snake.y === BOARD_SIZE || snake.y === -1 || $scope.board[snake.y][snake.x];
    }

    //bool if snake eats fruit
    function gotFruit(snake){
        return snake.x === fruit.x && snake.y === fruit.y;
    }

    //get new fruit
    function resetFruit(){
        let x = Math.floor(Math.random() * BOARD_SIZE);
        let y = Math.floor(Math.random() * BOARD_SIZE);

        if ($scope.board[y][x] === true){
            return resetFruit();
        }
        fruit = {x: x, y: y};
    }

    //add fruit score and grow snake tail
    function fruitPoint(){
        $scope.score++;

        let tail = angular.copy(snake.body[snake.body.length-1]);
        snake.body.push(tail);
        resetFruit();

        if ($scope.score % 10 === 0 ){
            time -= 20;
            $scope.difficulty++;
        }
    }

    //get scores and set up new game
    function gameOver(){
        isOver = true;

        $timeout(function(){
            isOver = false;
        }, 500);

        if ($scope.bestScore < $scope.score){
            $scope.bestScore = $scope.score;
        }
        time = 150;
        $scope.difficulty = 1;
        setUpBoard();
    }

    function update(){
        let head= newSnake();

        if (crashed(head)){
            return gameOver();
        } else if (gotFruit(head)){
            fruitPoint();
        }

        //remove tail
        let tail = snake.body.pop();
        $scope.board[tail.y][tail.x]= false;

        //pop to head
        snake.body.unshift(head);
        $scope.board[head.y][head.x]= true;

        //repeat
        snake.direction= startDir;
        $timeout(update, time);
    }
});