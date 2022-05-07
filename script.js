function game () {
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults =['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors', 'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let compChoice = '';
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');


    window.addEventListener('load', () => {

    //users + computer choice
    document.querySelectorAll('.user-choice .game-card').forEach ( card => {
        card.addEventListener('click', (ev) => {
            userChoice = getUserChoice (ev.target);
            compChoice = getComputerChoice ();

            startGame();
        })
    })
})

//game starts after user makes their pick 
function startGame() {
    calculateWinner(userChoice, compChoice);
    userChoiceElement.classList.add('hidden');
    pickedElement.classList.remove('hidden');
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
        console.log("Draw");
    } else if (getUserWinStatus(user + comp)) {
        console.log("You Win!");
    }
    else {
        console.log("You Lose!");
    }
}

function getUserWinsStatus(result) {
    return userWinResults.some(winStr => winStr === result);
}


}

game();