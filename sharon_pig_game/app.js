"use strict";

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNewEl = document.querySelector(".btn--new");
const btnRollEl = document.querySelector(".btn--roll");
const btnHoldEl = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

let scores, currentScore, activePlayer, playing;

const startAfresh = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player1El.classList.remove("player--active");
};

startAfresh();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//if button is clicked we want a dice number
btnRollEl.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove("hidden");
    //  if the dice equals number display that dice img
    if (dice === 1) {
      diceEl.src = `./image/dice-1.png`;
    } else if (dice === 2) {
      diceEl.src = `./image/dice-2.png`;
    } else if (dice === 3) {
      diceEl.src = `./image/dice-3.png`;
    } else if (dice === 4) {
      diceEl.src = `./image/dice-4.png`;
    } else if (dice === 5) {
      diceEl.src = `./image/dice-5.png`;
    } else if (dice === 6) {
      diceEl.src = `./image/dice-6.png`;
    }

    // if dice if not 1 add total score
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // or if 1 switch player
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener("click", function () {
  if (playing) {
    //add current score to the active palyers score

    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if players score is >= 100 points
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //reset the game and switch player
      switchPlayer();
    }
  }
});

btnNewEl.addEventListener("click", startAfresh);
