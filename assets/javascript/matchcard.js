const continueBtn = document.querySelector('.matchcard__cont');
const gameButtons = document.querySelector('.matchcard__btn');
const boxCards = document.querySelector('.box__card');
const menuGame = document.querySelector('.menuGame');
const digital = document.querySelector('.digital');
const panel = document.querySelector('.panel');

//__________NEW GAME__________\\
window.addEventListener('click', function (e) {
   if (e.target.closest('.matchcard__newGame')) {
      boxCards.classList.remove('animate__animated', 'animate__bounceOutUp');
      menuGame.classList.remove('menuGame--fadeOutT');
      menuGame.classList.add('menuGame--fadeInT');
      gameButtons.classList.add('hidden');
      digital.classList.add('hidden');
      showOverlay(menuGame);
      panel.classList.add('show');
      boxCards.classList.add('show');
   }
});

//__________CONTINUE GAME__________\\
continueBtn.addEventListener('click', function () {
   boxCards.classList.remove('animate__animated', 'animate__bounceOutUp', 'animate__fast');
   gameButtons.classList.add('hidden');
   digital.classList.add('hidden');
   panel.classList.add('show');
   boxCards.classList.add('show');
});

//__________BACK TO LOBBY__________\\
window.addEventListener('click', function (e) {
   if (e.target.closest('.back__lobby')) {
      if (gamePlay) continueBtn.classList.add('show');
      else continueBtn.classList.remove('show');
      boxCards.classList.add('animate__animated', 'animate__bounceOutUp', 'animate__fast');
      menuGame.classList.remove('menuGame--fadeInT');
      menuGame.classList.add('menuGame--fadeOutT');
      hiddenOverlay(menuGame);
      stopClock();
      setTimeout(() => {
         boxCards.classList.remove('show');
         panel.classList.remove('show');
         digital.classList.remove('hidden');
         gameButtons.classList.remove('hidden');
      }, 500);
   }
});

//__________MATCHING CARD GAME__________\\
var cards = [
   'hearts',
   'hearts',
   'diamonds',
   'diamonds',
   'clubs',
   'clubs',
   'spade',
   'spade',
   'star1',
   'star1',
   'bubbles',
   'bubbles',
   'honeycomb',
   'honeycomb',
   'cups',
   'cups',
];
var openCards = [];
var matchCards = [];
var clockOff = true;
var gamePlay = false;
var timeClock;
var time = 0;
var moves = 0;

//__________CLOCK & MOVES__________\\
const controlsClock = document.querySelector('.panel__controls-btn');
const minutesBox = document.querySelector('.panel__times-minutes');
const secondsBox = document.querySelector('.panel__times-seconds');
const panelMoves = document.querySelector('.panel__moves');

function updateMoves() {
   panelMoves.innerHTML = moves < 10 ? '0' + moves : moves;
}

function updateClock() {
   let mn = Math.floor(time / 60);
   let sc = time % 60;
   minutesBox.innerHTML = mn < 10 ? '0' + mn : mn;
   secondsBox.innerHTML = sc < 10 ? '0' + sc : sc;
}

function startClock() {
   timeClock = setInterval(function () {
      time++;
      updateClock();
   }, 1000);
   clockOff = false;
   gamePlay = true;
   boxCards.classList.remove('disabled');
   controlsClock.innerHTML = `<i class="fa-regular fa-circle-pause"></i>`;
}

function stopClock() {
   clearInterval(timeClock);
   clockOff = true;
   boxCards.classList.add('disabled');
   controlsClock.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
}

controlsClock.addEventListener('click', function () {
   if (clockOff) startClock();
   else stopClock();
});

//__________RESTART THE GAME__________\\
function restart() {
   controlsClock.innerHTML = `<i class="fa-regular fa-circle-play"></i>`;
   boxCards.classList.remove('disabled');
   matchCards = [];
   openCards = [];
   gamePlay = false;
   clockOff = true;
   moves = 0;
   time = 0;
   updateMoves();
   updateClock();
   clearInterval(timeClock);
}

//__________CREATE CARD__________\\
function createCard(name) {
   let card = document.createElement('div');
   card.classList.add('card');
   card.innerHTML = `<div class="card__front"></div>
				<div class="card__back" style="background-image: url(./assets/img/match-card/card_${name}.png)"></div>`;
   return card;
}

//__________SHUFFLE CARDS__________\\
function shuffle(array) {
   let max = array.length - 1;
   let randomPosition;
   for (let i = 0; i < max; i++) {
      let min = i + 1;
      randomPosition = Math.floor(Math.random() * (max - min + 1)) + min;
      [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
   }
   return array;
}

//__________CLEAR BOX CARD__________\\
function clearBoxCards() {
   boxCards.replaceChildren();
}

//__________SPREAD CARDS__________\\
function spreadCards() {
   clearBoxCards();
   shuffle(cards);
   cards.forEach(function (card) {
      boxCards.appendChild(createCard(card));
   });
}

//__________FLIP CARD__________\\
function flipCard(card) {
   card.classList.toggle('card--flip');
   card.classList.toggle('card--disabled');
}

//__________EVALUATE CLICK__________\\
function evaluateClick(clickTarget) {
   return clickTarget.classList.contains('card__front') && openCards.length < 2;
}

//__________CHECK CARD MATCH__________\\
function checkCardMatch() {
   let firstCard = openCards[0].style.backgroundImage;
   let secondCard = openCards[1].style.backgroundImage;
   if (firstCard === secondCard) {
      openCards[0].classList.add('card__back--correct');
      openCards[1].classList.add('card__back--correct');
      matchCards.push(openCards[0].parentElement);
      matchCards.push(openCards[1].parentElement);
      openCards = [];
   } else {
      openCards[0].classList.add('card__back--wrong');
      openCards[1].classList.add('card__back--wrong');
      setTimeout(() => {
         openCards[0].classList.remove('card__back--wrong');
         openCards[1].classList.remove('card__back--wrong');
         flipCard(openCards[0].parentElement);
         flipCard(openCards[1].parentElement);
         openCards = [];
      }, 1000);
   }
}

//__________PLAY GAME__________\\
boxCards.addEventListener('click', function (e) {
   let clickTarget = e.target;
   let parentClickTarget = clickTarget.parentElement;
   if (evaluateClick(clickTarget)) {
      if (clockOff) startClock();
      flipCard(parentClickTarget);
      openCards.push(parentClickTarget.lastChild);

      if (openCards.length == 2) {
         checkCardMatch();
         moves++;
         updateMoves();

         if (cards.length === matchCards.length) {
            gamePlay = false;
            stopClock();
            reward();
         }
      }
   }
});

//__________START & RESTART GAME__________\\
const restartGameBtn = document.querySelector('.panel__controls-restart');
const startGameBtn = document.querySelector('.start__game');
startGameBtn.addEventListener('click', function () {
   hiddenOverlay(menuGame);
   restart();
   spreadCards();
});
restartGameBtn.addEventListener('click', function () {
   restart();
   spreadCards();
});

//__________REWARD__________\\
function reward() {
   let coin = randomRange(1, 500);
   Alert({
      type: 'congrats',
      title: 'Congratulations!',
      text: 'You have successfully passed the game!<br>You earned: ',
      buttonLeft: 'Back to lobby',
      classButtonLeft: 'back__lobby',
      buttonRight: 'New game',
      classButtonRight: 'matchcard__newGame',
      coin: coin,
   });
   if (getItem('coin') !== '') saveItem('coin', getItem('coin') + coin);
   else saveItem('coin', coin);
}
