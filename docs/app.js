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
  guessesLeft = 3

// UI Elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message')

// Assing UI min and max
minNum.textContent = min
maxNum.textContent = max

// Play again event
game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload()
  }
})

// Create score box
let scoreBox = document.createElement('button')
scoreBox.className = 'button-primary'
scoreBox.disabled = 'true'
scoreBox.style.fontSize = '20px'
game.appendChild(scoreBox)

// Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value)

  // Validate guess
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`please enter a number between ${min} and ${max}`, 'red')
  }
  // Check if won
  else if (guess === winningNum) {
    // Game over!
    gameOver(true, ` Bingo 😀 ${winningNum} is correct, YOU WIN!`)
  } else {
    // Wrong number
    guessesLeft -= 1

    if (guessesLeft === 0) {
      // Game over!
      gameOver(false, `GameOver ☹ YOU LOST! The correct number is ${winningNum}`)
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
  return Math.floor(calcRandom)
}

// Set message
function setMessage(msg, color) {
  message.textContent = msg
  message.style.color = color
}
