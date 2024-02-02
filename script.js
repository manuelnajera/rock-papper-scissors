let playerSelection
let computerSelection
let score = 0

function getComputerChoice () {
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(4);
     let computerChoice = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);

        switch(computerChoice){
            case 1 :
                return 'rock'
            case 2 :
                return "paper" 
            case 3 : 
                return "scissors"
             default:
                console.error("Choice was not between values 1 to 3")  
                break         
        }    
  
}


function playRound(playerSelection, computerSelection){
   
    console.log('You chose ' + playerSelection)
    console.log('Computer chose ' + computerSelection)
    
   switch (playerSelection){
    case'rock':
        return (computerSelection === 'rock'? 0 :computerSelection === 'paper'? -1 :computerSelection === 'scissors'? 1:"error, check console")
    case 'paper':
        return (computerSelection === 'paper'? 0:computerSelection === 'scissors'? -1:computerSelection === 'rock'? 1:"error, check console")
    case 'scissors':
        return (computerSelection === 'scissors'? 0:computerSelection === 'rock'? -1:computerSelection === 'paper'? 1:"error, check console")
    default:
        return "You didn't choose any valid option!"
   }



}



playGame()


function playGame(){
    

    for(i=1; i<5; i++){
        playerSelection = prompt("Rock, paper or scissors?").toLowerCase()
        computerSelection = getComputerChoice()
        let roundResult = playRound(playerSelection, computerSelection)
        
        console.log(roundResult)

        switch(roundResult){
            case -1: 
                score = score -1
                return ('Sorry, ' + computerSelection + ' beats ' + playerSelection)
            case 0:
                score = score
                return ('Draw! Best luck next time')
            case 1:
                score = score + 1
                return('Congrats! ' + playerSelection + ' beats ' + computerSelection)
            default:
            return ("error, check console")
    }

    
    }


switch(score){
    case score < 0:
        return ('Sorry, you lost for ' + (-score) + ' points')
    case score === 0:
        return ("It's a draw!")
    break
    case score > 0:
        return ('You won! for ' + score + ' points, congrats!')
    break          

}
    
}
