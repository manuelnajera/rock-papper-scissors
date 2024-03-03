let playerSelection;
let computerSelection;
let scoreHuman = 0;
let scoreComputer = 0;
let drawCount = 0;
let startBtn = document.querySelector('#startBtn');
let chooseLabel = document.querySelector('h3.choiceBtn');
let humanScoreLabel = document.querySelector('#humanScore');
let drawCountLabel = document.querySelector('#drawCount');
let humanChoiceLabel = document.querySelector('#humanChoice');
let computerChoiceLabel = document.querySelector('#computerChoice');
let computerScoreLabel = document.querySelector('#computerScore');
let resultLabel = document.querySelector('#resultLabel');
let choiceBtnClass = document.querySelectorAll('.choiceBtn');
let round = 1;

finishHumanChoice();

function finishHumanChoice (){
    for(let i = 0; i < choiceBtnClass.length; i++){
        choiceBtnClass[i].style.display = "none";
        choiceBtnClass[i].disabled = true;
    };
    startBtn.disabled = false;
    round = 1;
    scoreComputer = 0;
    scoreHuman = 0;
    drawCount = 0;
};


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
};

function getHumanChoice () {
    
    for(let i = 0; i < choiceBtnClass.length; i++){
        choiceBtnClass[i].style.display = "flex";
        choiceBtnClass[i].disabled = false;
    }; 

    chooseLabel.textContent = "Choose your move for the round " + round;
    humanScoreLabel.textContent = "Your score: " + scoreHuman;
    computerChoiceLabel.textContent = "";  
    humanChoiceLabel.textContent = "";
    computerScoreLabel.textContent = "Computer score: " + scoreComputer;  
    drawCountLabel.textContent = "Draw count: " + drawCount;
};

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
        return "You didn't choose any valid option!";
   };

};

document.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.id){
        case 'startBtn' :
            startBtn.disabled = true;
            resultLabel.textContent = "";
            getHumanChoice();
            break;
        case 'rockBtn' :
            playGame('rock');
            break;
        case 'paperBtn' :
            playGame('paper');
            break;
        case 'scissorsBtn' :
            playGame('scissors');
            break;            
    }
});

function playGame(playerSelection){
        computerSelection = getComputerChoice();
        let roundResult = playRound(playerSelection, computerSelection);
        computerChoiceLabel.textContent = "Computer chose " + computerSelection;  
        humanChoiceLabel.textContent = "You chose " + playerSelection;
        console.log(roundResult)

        switch(roundResult){
            case -1: 
                scoreComputer = scoreComputer + 1;

                highlightText(computerChoiceLabel,'Green');
                highlightText(computerScoreLabel,'Red');
                highlightText(humanChoiceLabel,'Red');
                highlightText(resultLabel, 'Red')
                resultLabel.textContent = 'Sorry, ' + computerSelection + ' beats ' + playerSelection;
            break;   
            case 0:
                drawCount = drawCount + 1;
                highlightText(drawCountLabel, 'Green');
                highlightText(humanChoiceLabel,'Red');
                highlightText(computerChoiceLabel,'Red');
                highlightText(resultLabel, 'Red')
                resultLabel.textContent = 'Draw! Best luck next time';
            break;    
            case 1:
                scoreHuman = scoreHuman + 1;
                highlightText(humanScoreLabel, 'Green');
                highlightText(humanChoiceLabel,'Green');
                highlightText(computerChoiceLabel,'Red');
                highlightText(resultLabel, 'Green')
                resultLabel.textContent = 'Congrats! ' + playerSelection + ' beats ' + computerSelection;
            break    
            default:
                resultLabel.textContent = "error, check console";
            break;
        }

    console.log( 'Your score is ' + scoreHuman);
    round = round + 1;
    humanScoreLabel.textContent = "Your score: " + scoreHuman;
    computerScoreLabel.textContent = "Computer score: " + scoreComputer;  
    drawCountLabel.textContent = "Draw count: " + drawCount;
    
    checkWinner();
    chooseLabel.textContent = "Choose your move for the round " + round;
}

function checkWinner (){
    if (scoreHuman === 5){
        resultLabel.textContent = 'Congrats! you won 5 rounds first!';
        finishHumanChoice();
        return;
    } else if (scoreComputer === 5){
        resultLabel.textContent = 'Sorry, computer won 5 rounds first, best luck next time';
        finishHumanChoice();
        return;
    };
}

function highlightText(element,color){
    element.classList.add('highlight' + color);

    setTimeout(function() {
        element.classList.remove('highlight' + color);
    },2000);
};
