let score = JSON.parse(localStorage.getItem('score')) || {
    win: 0,
    looses: 0,
    ties: 0
};

UpdateScoreElement();

/*
if(!score){
    score = {
        wins : 0,
        looses : 0,
        ties : 0
    }
}
*/
let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button').addEventListener('click', () => {
    autoPlay();
})

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000)
        isAutoPlaying = true;
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop playing'
    }
    else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play'
    }

}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
})
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors')
});
document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper')
});


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock')
    }
    else if (event.key === 'p') {
        playGame('paper');
    }
    else if (event.key === 's') {
        playGame('scissors');
    }
    else if (event.key === 'a') {
        autoPlay();
    }
    else if (event.key === 'Backspace') {
        infoBox.style.display = 'block';
    }
})

function playGame(playerMove) {
    computerMove = pickComputerMove();

    let result = '';
    if (playerMove === 'rock') {

        if (computerMove === 'rock') {
            result = 'Tie.';
        }
        else if (computerMove === 'paper') {
            result = 'You Loose.';
        }
        else if (computerMove == 'scissors') {
            result = 'You Win.';
        }

    }

    else if (playerMove === 'paper') {

        if (computerMove === 'rock') {
            result = 'You Win.'
        }
        else if (computerMove === 'paper') {
            result = 'Tie.'
        }
        else if (computerMove === 'scissors') {
            result = 'You Loose.'
        }

    }

    else if (playerMove === 'scissors') {

        if (computerMove === 'rock') {
            result = 'You Loose.'
        }
        else if (computerMove === 'paper') {
            result = 'You Win.'
        }
        else if (computerMove === 'scissors') {
            result = 'Tie.';
        }


    }
    if (result === 'You Win.') {
        score.win += 1;
    }
    else if (result === 'You Loose.') {
        score.looses += 1;
    }
    else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    UpdateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `  You
                <img src="images/${playerMove}-emoji.png" class="move-icon" alt="">

                <img src="images/${computerMove}-emoji.png" class="move-icon" alt="">
            computer`;

}

const infoBox = (document.querySelector('.js-info-box'));

document.querySelector('.js-reset-button').addEventListener('click', () => {
    infoBox.style.display = 'block';
})

document.querySelector('.yes-button').addEventListener('click', () => {
    score.win = 0;
    score.looses = 0;
    score.ties = 0;
    localStorage.removeItem('score')
    UpdateScoreElement();
    infoBox.style.display = 'none';

})

document.querySelector('.no-button').addEventListener('click', () => {
    infoBox.style.display = 'none';
})
function UpdateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Win : ${score.win}   Looses : ${score.looses}  Ties : ${score.ties}`
}

let computerMove = '';
function pickComputerMove() {
    const randomNumber = Math.round(Math.random() * 2);

    if (randomNumber === 0) {
        computerMove = 'rock'
    }
    else if (randomNumber === 1) {
        computerMove = 'paper'
    }
    else if (randomNumber === 2) {
        computerMove = 'scissors'
    }
    return computerMove;
}