/*
GAME FUNCTIONS
---------------
- Player must guess a certain number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the current answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3,
  playerScore = 5

// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message'),
  guess = document.querySelector('.guess');

// Assing UI min, max and guess
minNum.textContent = min
maxNum.textContent = max
guess.textContent = guessesLeft;


// Play again event
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value)

  // Validate guess
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }
  // Check if won
  else if (guess === winningNum) {
    // Game over!
    gameOver(true, ` Bingo! 😀 ${winningNum} is correct`)
    addScore();
    fetchScore();
  } else {
    // Wrong number
    guessesLeft -= 1

    if (guessesLeft === 0) {
      // Game over!
      gameOver(false, `GameOver! ☹ The correct number is ${winningNum}`)
    } else {
      // Game continues, WRONG ANSWER!

      // Red border
      guessInput.style.borderColor = 'red'
      //Clear input
      guessInput.value = ''
      // Feedback!
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')
    }
  }
})

// Game over
function gameOver(won, msg) {
  let color
  won === true ? (color = 'green') : (color = 'red')
  // Disable input
  guessInput.disabled = true
  // Green border
  guessInput.style.borderColor = color
  // Text color
  message.style.color = color
  // Set message
  setMessage(msg)

  // Play again
  guessBtn.value = 'Play Again'
  guessBtn.className += 'play-again'
}

// Get winning num
function getRandomNum(min, max) {
  let calcRandom = Math.random() * (max - min + 1) + min
  console.log(Math.floor(calcRandom))
  return Math.floor(calcRandom)
}

// Set message
function setMessage(msg, color) {
  message.textContent = msg
  message.style.color = color
}

// add player score
function addScore() {
  let score = playerScore;

  if (localStorage.getItem('scores') === null) {
    let scores = [];
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
  } else {
    let scores = JSON.parse(localStorage.getItem('scores'));
    for (let i = 0; i < scores.length; i++){
      scores[i] = scores[i] + 5;
  }
    localStorage.setItem('scores', JSON.stringify(scores));
  }
}

// fetch score
function fetchScore() {
  let scores = JSON.parse(localStorage.getItem('scores'));

  // get output
  let scoresResult = document.getElementById('playerScore');

  // build output
  scoresResult.innerHTML='';

  if (localStorage.getItem('scores') === null) {

  }else {
    let score = scores[0]
    console.log(score)

    scoresResult.innerHTML += '<button class="button-primary">' + score + '</button>';
  }
}

