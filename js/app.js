/*
 * Create a list that holds all of your cards
 */
let cardList = [
'fa-diamond', 
'fa-paper-plane-o', 
'fa-anchor', 
'fa-bolt',
'fa-cube', 
'fa-leaf', 
'fa-bicycle',  
'fa-bomb'];

let doubleCardList = cardList.concat(cardList);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let deck = document.getElementsByClassName('deck')[0];
let cardClicked;
let listOpenCards = [];
let counter = 0;

//count matched cards
let matched = 0;

 // timer variables
let timeKeeper;
let timer = document.getElementById('timer');
let sec = 0;
let min = 0;
let hr = 0;
let timerStarted;

 // select number of moves HTML
let moves = document.querySelector('.moves');

// select stars
let stars = document.querySelector('.stars');

//final game time
let finalTime;

// declare and select popup modal
let modal = document.getElementById('box');

// declare and select close icon
let closeIcon = document.querySelector('.close');

// declare and select play again button
let playButton = document.getElementById('play-btn');

// Reset game button and event listener
let restBtn = document.querySelector('.restart');
restBtn.addEventListener('click', beginGame, false);

// Begin game on document load
beginGame();

function beginGame() {
	// Get shuffled cards
	var shuffledCards = shuffle(doubleCardList);

	// Loop through each card and add to HTML
	for (let i = 0; i < shuffledCards.length; i++) {
		deck.children[i].classList.remove('match', 'open', 'show', 'event');
		deck.children[i].children[0].className = '';
		deck.children[i].children[0].className = 'fa';
		deck.children[i].children[0].classList.add(shuffledCards[i]);
	}
	//reset moves and timer
	counter = 0;
	moves.textContent = counter;

	//reset matched cards
	matched = 0;

	// set timerStarted to false
	timerStarted = false;

	// reset timer
	hr = 0;
	min = 0;
	sec = 0;
	timer.textContent = "0" + min + ": " + "0" + sec;

	// reset stars
	for (let i = 0; i < 3; i++) {
		stars.children[i].style.visibility = "visible";
	}
	clearInterval(timeKeeper);
}

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

// Event listener for cards
deck.addEventListener('click', showCard, false);

// Function to show the card
function showCard(evt) {
	if (evt.target.nodeName === 'LI') {
		if (!timerStarted) {
			initTimer();
		}
		evt.target.classList.add("open", "show", "event");
		cardClicked = evt.target;
		openCards(cardClicked);
	}
}

// Function to add clicked cards to a list
function openCards(card) {
	listOpenCards.push(card);
	var numCards = listOpenCards.length;
	if (numCards === 2) {
		countMove();
		compareCards(listOpenCards);
		listOpenCards = [];
	}
}

// Function to compare cards
function compareCards(arr) {
	if (arr[0].children[0].classList[1] === arr[1].children[0].classList[1]) {
		console.log("They MATCH!!!");
		matchedCards(arr[0].children[0], arr[1].children[0]);
	} else {
		setTimeout(	function() {
			arr[0].children[0].parentElement.classList.remove("open", "show", "event");
			arr[1].children[0].parentElement.classList.remove("open", "show", "event");
		}, 500);
	}
}

// Lock matched cards in open position
function matchedCards(firstCard, secondCard) {
	firstCard.parentElement.classList.add("match");
	secondCard.parentElement.classList.add("match");

	matched++;

	firstCard.parentElement.classList.remove("open", "show");
	secondCard.parentElement.classList.remove("open", "show");

	if (matched === 8) {
		win();
	}
}

// Start timer and set timer HTML
function initTimer() {
	timerStarted = true;
	timeKeeper = setInterval(function(){
		if (sec < 10 && min < 10) {
			timer.textContent = "0" + min + ": " + "0" + sec
		} else if (sec < 10 && min >= 10) {
			timer.textContent = min + ": " + "0" + sec
		} else if (sec >= 10 && min < 10) {
			timer.textContent = "0" + min + ": " + sec
		}
		
		sec++
		if (sec === 60) {
			min++
			sec = 0;
		}
		if (min === 60) {
			hr++
			min = 0;
		}
	}, 1000);
}

// count the number of moves
function countMove() {
	counter++;
	console.log("Move Number: " + counter);
	moves.textContent = counter;

	if (counter <= 8) {
		stars.style.visibility = "visible";
	} else if (8 < counter && counter < 12) {
		stars.lastElementChild.style.visibility = "hidden";
	} else if (counter >= 12) {
		for (let i = 0; i < 1; i++) {
			stars.children[i].style.visibility = "hidden";			
		}
	
	}
}

// display popup when all cards are matched
function win() {
	console.log('You WON!!');
	clearInterval(timeKeeper);
	finalTime = timer.textContent;
	let rating = document.querySelector('.stars').innerHTML;

	modal.classList.add("reveal");

	document.getElementById("total-moves").textContent = counter;
	document.getElementById("total-time").textContent = finalTime;
	document.getElementById("star-rating").innerHTML = rating;

	// close popup
	clickIcon();
}

// Close icon event listener
let clickIcon = function () {
	closeIcon.addEventListener('click', closePopup, false);
}

// Function to close popup
let closePopup = function () {
		modal.classList.remove("reveal");
}

// Add event listener to the play again button
playButton.addEventListener('click', playAgain, false);

// Play again button function
function playAgain () {
	beginGame();
	closePopup();
}

