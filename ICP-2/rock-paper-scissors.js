var player = prompt("Rock, Paper, or Scissors?");
var computer = Math.random();

if (computer <= 0.33){
    computer = "Rock";
}else if (computer <= 0.66){
    computer = "Paper";
}else
    computer = "Scissors";

var shoot = function(player1, player2){
    if (player1===player2){
        return "Tie";
    }
    else if(player1==="Rock"){
        if(player2==="Scissors"){
            return "Rock wins";
        }
        else{
            return "Paper wins";
        }
    }
    else if(player1==="Paper"){
        if(player2==="Rock"){
            return "Paper wins";
        }
        else{
            return "Scissors wins";
        }
    }
    else if (player1==="Scissors"){
        if (player2==="Rock"){
            return "Rock wins"
        }
        else{
            return "Scissors wins";
        }
    }
    else{
        return "Did you enter Rock, Paper, or Scissors?"
    }
};
shoot(player, computer);