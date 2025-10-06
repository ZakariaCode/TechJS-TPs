let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();


 

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('rock');
  }
  else if(event.key === 'p'){
    playGame('paper');
  }
  else if(event.key === 's'){
    playGame('scissors')
  }

})

let result = document.querySelector('.js-result');
let moves = document.querySelector('.js-moves');
let autoPlay = document.querySelector('.autoplay-button');

let autoPlaying = false;
let idIntervall;

autoPlay.addEventListener('click', () => {
  if (!autoPlaying) {
    idIntervall = setInterval(() => playGame(pickComputerMove()), 2000);
    autoPlaying = true;
  } else {
    clearInterval(idIntervall);
    autoPlaying = false;
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  moves.innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  Computer <img src="images/${computerMove}-emoji.png" class="move-icon">
  `;

  if (
    (computerMove === "rock" && playerMove === "paper") ||
    (computerMove === "scissors" && playerMove === "rock") ||
    (computerMove === "paper" && playerMove === "scissors")
  ) {
    result.innerHTML = 'You win';
    score.wins += 1;
  } else if (
    (computerMove === "paper" && playerMove === "rock") ||
    (computerMove === "rock" && playerMove === "scissors") ||
    (computerMove === "scissors" && playerMove === "paper")
  ) {
    result.innerHTML = 'You lose';
    score.losses += 1;
  } else {
    result.innerHTML = 'Tie';
    score.ties += 1;
  }
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}