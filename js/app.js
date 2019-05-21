/*
 * Create a list that holds all of your cards
 */
/*
  * List of Global Variables used throughout the app.
*/
let deck = document.querySelector('.deck');
let openCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;
const TOTAL_PAIRS = 8;



/*
* Sets forth the event listener according to the user's action (in this case, the click).
*/
deck.addEventListener('click', evt => {
	const clickTarget = evt.target; 
	if (isClickValid(clickTarget)) {
    if (clockOff) {
      startClock();
      clockOff = false;
    }
		flipCards(clickTarget);
		addOpenCards(clickTarget);
		if (openCards.length === 2) {
			checkMatch(clickTarget);
			addMove();
			checkScore();
		}
	}
});

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') && !clickTarget.classList.contains('match') && openCards.length < 2 && !openCards.includes(clickTarget)
  );
}
//Flips each card in order to allow the game to begin.
function flipCards(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

/*
* Adds data to the openCards array defined as a global variable.
*/
function addOpenCards(clickTarget) {
  openCards.push(clickTarget);
  console.log(openCards);
}

//Creates a conditional statement in order to verify if the cards match.
function checkMatch() {
  if (openCards[0].firstElementChild.className === 
      openCards[1].firstElementChild.className) {
      openCards[0].classList.toggle('match');
      openCards[1].classList.toggle('match');
      openCards = [];
      matched++;
      if (matched === TOTAL_PAIRS) {
       win()
      }
  } else {
      setTimeout(() => {
         flipCards(openCards[0]);
         flipCards(openCards[1]);
         openCards = [];
  }, 1000)}; 
}


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Shuffles the deck and appends each card to new deck.
function shuffleDeck () {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  let shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
      deck.appendChild(card);
  }
}
shuffleDeck();

//Increases a move each time the player flips two cards.
function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
}

function checkScore() {
   if (moves === 10 || moves === 20) {
     hideStar();
   }
}

function hideStar() {
    const StarList = document.querySelectorAll('.stars li');
    for (let star of StarList) {
        if (star.style.display !== 'none') {
           star.style.display = 'none';    
           break;
        }  
    }
}


function startClock() {
        clockId = setInterval(() => {
        time++;
        displayTime();
        console.log(time);
    }, 1000);
}


function displayTime() {
    const clock = document.querySelector('.clock');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
      clock.innerHTML = `${minutes}:0${seconds}`;
    } else {
      clock.innerHTML = `${minutes}:${seconds}`;
    }
  console.log(clock);
}

function stopClock() {
  clearInterval(clockId);
}

function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

//Inserts data in the Modal
function runModalStats() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const starStat = document.querySelector('.modal_stars');
  const stars = countStars();
  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starStat.innerHTML = `Stars = ${stars}`;
}

function countStars() {
  const stars = document.querySelectorAll('.stars li');
  starCounter = 0;
  for (let star of stars) {
     if (star.style.display !== 'none') {
       starCounter++;
     }  
  }
console.log(starCounter);
return starCounter;
}

function resetGame() {
   resetClockAndTime();
   resetMoves();
   resetStars();
   shuffleDeck();
   resetCards();
}

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
      star.style.display = 'inline';
  }
}

function win() {
   stopClock();
   runModalStats();
   toggleModal();
}

function replayGame() {
   resetGame();
   toggleModal();
}

function resetCards() {
   const cards = document.querySelectorAll('.deck li');
   for (let card of cards) {
       card.className = 'card';
   }
}
resetCards();

//Creates functionality to the buttons
document.querySelector('.modal_cancel').addEventListener('click', () => {
   toggleModal();
});
document.querySelector('.modal_replay').addEventListener('click', replayGame);

document.querySelector('.restart').addEventListener('click', resetGame);


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */