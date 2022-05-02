function game () {
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    window.addEventListener('load', () => {
    let userChoice = '';

    //this is the users choice
    document.querySelectorAll('.user-choice .game-card').forEach ( card => {
        card.addEventListener('click', (ev) => {
            userChoice = getUserChoice (ev.target);
        console.log(userChoice);
            startGame();
        })
    })
})

//game starts after user makes their pick 
function startGame() {

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
function gatComputerChoice() {
    return actions[Math.floor(Math.random() * 5)];
}
}