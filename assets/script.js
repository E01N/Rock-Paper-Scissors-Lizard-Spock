function game () {
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults =['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors', 'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let compChoice = '';
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.pc-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const scoreCountElement = document.querySelector('.score-count');

    let currentScore = null;

    window.addEventListener('load', () => {
        retrieveScoreFromLocalStorage();

    //users + computer choice
    document.querySelectorAll('.user-choice .game-card').forEach ( card => {
        card.addEventListener('click', (ev) => {
            userChoice = getUserChoice (ev.target);
            compChoice = getComputerChoice ();

            startGame();
        });
    });

    resultElement.querySelector('button').addEventListener('click', tryAgain);
});

//game starts after user makes their pick 
function startGame() {
    calculateWinner(userChoice, compChoice);
    userChoiceElement.classList.add('hidden');
    pickedElement.classList.remove('hidden');
    clearResultBeforeAppend();
    buildChoiceElement(true, userChoice);
    buildChoiceElement(false, compChoice);
}

//pairs users click with corresponding choice
function getUserChoice(target) {
    console.log(target);
    if (target.nodeName === 'IMG') {
        return target.parentElement.classList[1];
    }
    return target.classList[1];
}

//generates random choice for computer
function getComputerChoice() {
    return actions[Math.floor(Math.random() * 5)];
}

//generates winner
function calculateWinner(user, comp) {
    if (user === comp) {
        resultTitleElement.innerText ='Draw';
    } else if (getUserWinStatus(user + comp)) {
        resultTitleElement.innerText ='You Win!';
        calculateScore(1);
    } else {
        resultTitleElement.innerText ='You Lose!';
        calculateScore(-1);
    }
}

function getUserWinStatus(result) {
    return userWinResults.some(winStr => winStr === result);
}

//show picked card
function buildChoiceElement(isItUserElement, className){
    Element = document.createElement('div');
    Element.classList = [`game-card ${className}`];
        Element.innerHTML = `<img src="images/icon-${className}.svg" alt="${className}">`;
    if (isItUserElement) {
        userPickElement.append(Element);
    }   else{
        pcPickElement.append(Element);
    }
}

//try again button
function tryAgain() {
    userChoiceElement.classList.remove('hidden');
    pickedElement.classList.add('hidden');
}

//clear previous results
function clearResultBeforeAppend() {
    userPickElement.innerHTML = '';
    pcPickElement.innerHTML = '';
}

//score counter
function calculateScore(roundResult){
    currentScore += roundResult;
    updateScoreBoard();
}

function retrieveScoreFromLocalStorage() {
    const score = +window.localStorage.getItem('gameScore') || 0;
    currentScore = score;
    updateScoreBoard();
}

function updateScoreBoard() {
    scoreCountElement.innerText = currentScore;
    window.localStorage.setItem('gameScore', currentScore);
}

//modal
const rulesBtn = document.querySelector('.rules-btn');
const modalBg = document.querySelector('.modal-bg');
const modal = document.querySelector('.modal');

rulesBtn.addEventListener('click', () =>{
    modal.classList.add('active');
    modalBg.classList.add('active');
});

document.querySelector('.close').addEventListener('click', hideModal);

function hideModal(){
    modal.classList.remove('active');
    modalBg.classList.remove('active');
}
}

game();
