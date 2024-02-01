function getComputerChoice () {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(4);
     let computerChoice = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);

        (function () {
    
        switch(computerChoice){
            case 1 :
                return 'rock'
            break
            case 2 :
                return "paper" 
                break
            case 3 : 
                return "scissors"
             break
             default:
                console.error("Choice was not between values 1 to 3")  
                break         
        }    
    }())
}


function playRound(playerSelection, computerSelection){
    console.log('You chose ' + playerSelection)
    console.log('Computer chose ' + computerSelection)
    
   switch (playerSelection){
    case'rock':
        return (computerSelection === 'rock'? "Draw!":computerSelection === 'paper'? 'Paper! You loose!':computerSelection === 'scissors'? 'Scissors! You win!':"error, check console")
    break
    case 'paper':
        return (computerSelection === 'paper'? "Draw!":computerSelection === 'scissors'? 'scissors! You loose!':computerSelection === 'rock'? 'Rock! You win!':"error, check console")
    break
    case 'scissors':
        return (computerSelection === 'scissors'? "Draw!":computerSelection === 'rock'? 'Rock! You loose!':computerSelection === 'paper'? 'Paper! You win!':"error, check console")
    break   
    default:
        return "You didn't choose any valid option!"
        break 
   }

}

let playerSelection = prompt("Rock, paper or scissors?").toLowerCase()




function playGame(){
    playerSelection = prompt("Rock, paper or scissors?").toLowerCase()
    computerSelection = getComputerChoice()

    console.log(playRound(playerSelection, computerSelection));

}
