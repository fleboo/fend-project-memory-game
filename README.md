# Memory Game Project

The Memory Game is a simple game that lets the player match two cards at a time in a deck of sixteen cards. The user wins when all cards have been successfully matched.

## Instructions

* Launch the game
* Begin by click on any hidden card. The card will remain open until a second card is selected.
* Click on a second card. If the cards match, they'll be locked in the open position. Otherwise, both cards are hidden again.
* Continue the same process until all sixteen cards are paired.

## Dependencies and Acknowledgments

* Richard Kalehoff with Udacity for the initial HTML and CSS template.
* Fisher–Yates shuffle algorithm used to shuffle the cards: http://stackoverflow.com/a/2450976.
* Bootstrap and Font Awesome for the card icons.
* Google fonts

## How I Designed the Game

* Create a list of all cards
* Shuffle the cards with the Fisher–Yates shuffle
* Compare two cards at a time to determine if they match, and start the timer
* Lock the matched cards in the open position and remove the event listeners
* Show a popup modal with the fame summary when all cards are matched, and stop the timer
* Give the user the option to play the game again by clicking the 'Play Again' button

The cards are shuffled at the begin of the game, when the 'Play Again' button is clicked, or when the restart icon is clicked. 