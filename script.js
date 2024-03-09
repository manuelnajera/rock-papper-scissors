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
let resultScoreLabels = document.querySelectorAll('.resultLabel');
let round = 1;
let language; 


getLanguage();

function getLanguage() {
    (localStorage.getItem('language') == null) ? setLanguage('en') : false;
    $.ajax({ 
    url:  'language/' +  localStorage.getItem('language') + '.json', 
    dataType: 'json',
    success: function (lang) { 
        language = lang 
        applyLanguage();
    },
    error: function(xhr,status,error){
        console.error("Error fetching language file", error, status, xhr);
    } 

});
};

function setLanguage(lang) {
localStorage.setItem('language', lang);
$(document).ready(function(){
    getLanguage();
});
};

function applyLanguage(){
    $(document).attr("title" , language.title);
    $('#langBtn').text(language[localStorage.getItem('language') ])
    $('#esLang').text(language.es)
    $('#enLang').text(language.en)
    $('#title').text(language.title);
    $('#subtitle').text(language.subtitle);
    $('#startBtn').text(language.start);
    $('#choose-move').text(language['choose-move']);
};

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

function getRandomInt(min, max) {
    const randomArray = new Uint32Array(1);
    window.crypto.getRandomValues(randomArray);
    const range = max - min;
    return min + Math.floor(randomArray[0] % range);
}


function getComputerChoice () {
    const choices = [language.rock,language.paper,language.scissors];
    const randomIndex = getRandomInt(0,choices.length);
    console.log("random index: ", randomIndex);
     let computerChoice = randomIndex;

        switch(computerChoice){
            case 1 :
                return language.rock
            case 2 :
                return language.paper 
            case 0 : 
                return language.scissors
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

    chooseLabel.textContent = language['choose-move'] + round;
    humanScoreLabel.textContent = language['your-score'] + scoreHuman;
    computerChoiceLabel.textContent = "";  
    humanChoiceLabel.textContent = "";
    computerScoreLabel.textContent = language['comp-score'] + scoreComputer;  
    drawCountLabel.textContent = language['draw-count'] + drawCount;
    resetElementClass();
};

function playRound(playerSelection, computerSelection){
   
    console.log(language['you-chose'] + playerSelection)
    console.log(language['comp-chose'] + computerSelection)
    
   switch (playerSelection){
    case language.rock:
        return (computerSelection === language.rock? 0 :computerSelection === language.paper? -1 :computerSelection === language.scissors? 1:"error, check console")
    case language.paper:
        return (computerSelection === language.paper? 0:computerSelection === language.scissors? -1:computerSelection === language.rock? 1:"error, check console")
    case language.scissors:
        return (computerSelection === language.scissors? 0:computerSelection === language.rock? -1:computerSelection === language.paper? 1:"error, check console")
    default:
        return "You didn't choose any valid option!";
   };

};

document.addEventListener('click', (event) => {
    let target = event.target;

    switch(true){
        case target.id ==='startBtn' :
            startBtn.disabled = true;
            resultLabel.textContent = "";
            getHumanChoice();
            break;
        case target.id ==='rockBtn' || target.id === 'rockImg':
            playGame(language.rock);
            break;
        case target.id === 'paperBtn' || target.id === 'paperImg' :
            playGame(language.paper);
            break;
        case target.id === 'scissorsBtn' || target.id === 'scissorsImg':
            playGame(language.scissors);
            break;     
        case target.id === 'enLang':
            setLanguage('en');
            break;
        case target.id === 'esLang':
            setLanguage('es');
            break;
    }
});

function playGame(playerSelection){
    resetElementClass();
        computerSelection = getComputerChoice();
        let roundResult = playRound(playerSelection, computerSelection);
        computerChoiceLabel.textContent = language['comp-chose'] + computerSelection;  
        humanChoiceLabel.textContent = language['you-chose'] + playerSelection;
        console.log(roundResult)

        switch(roundResult){
            case -1: 
                scoreComputer = scoreComputer + 1;
                highlightText(computerChoiceLabel,'Green');
                highlightText(computerScoreLabel,'Red');
                highlightText(humanChoiceLabel,'Red');
                highlightText(resultLabel, 'Red')
                resultLabel.textContent = language.sorry + computerSelection + language.beats + playerSelection;
            break;   
            case 0:
                drawCount = drawCount + 1;
                highlightText(drawCountLabel, 'Green');
                highlightText(humanChoiceLabel,'Red');
                highlightText(computerChoiceLabel,'Red');
                highlightText(resultLabel, 'Red')
                resultLabel.textContent = language.draw;
            break;    
            case 1:
                scoreHuman = scoreHuman + 1;
                highlightText(humanScoreLabel, 'Green');
                highlightText(humanChoiceLabel,'Green');
                highlightText(computerChoiceLabel,'Red');
                highlightText(resultLabel, 'Green')
                resultLabel.textContent = language.congrats + playerSelection + language.beats + computerSelection;
            break    
            default:
                resultLabel.textContent = "error, check console";
            break;
        }

    console.log( language['your-score'] + scoreHuman);
    round = round + 1;
    humanScoreLabel.textContent = language['your-score']+ scoreHuman;
    computerScoreLabel.textContent = language['comp-score'] + scoreComputer;  
    drawCountLabel.textContent = language['draw-count']+ drawCount;
    
    checkWinner();
    chooseLabel.textContent = language['choose-move'] + round;
}

function checkWinner (){
    if (scoreHuman === 5){
        resultLabel.textContent = language['congrats'] + language['final-win'];
        finishHumanChoice();
        return;
    } else if (scoreComputer === 5){
        resultLabel.textContent = language['sorry'] + language['final-lost'];
        finishHumanChoice();
        return;
    };
}

function highlightText(element,color){
    element.classList.add('highlight' + color);
};

function resetElementClass(){
    resultScoreLabels.forEach(label => {
        if(label.classList.contains('highlightRed')){
            label.classList.remove('highlightRed');
        } else if (label.classList.contains('highlightGreen')){
            label.classList.remove('highlightGreen');
        };
    });
};
