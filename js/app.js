/* ------- Constants ------- */

// Indexes on board that win the game
const winningCombos = [
	[0, 1, 2],
	[0, 4, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 4, 6],
	[2, 5, 8],
	[3, 4, 5],
	[6, 7, 8],
];

// Colors to display for empty square, player 1, and player 2
const colors = {
	"1": "#f2d53c",
	"-1": "#c80e13",
	null: "#7d3cff",
};

/*  ------- Variables (state) ------- */

// winner can represent: player that won, a tie, or game in play
let board, winner, turn;

/* ------- Cached Element References ------- */

const message = document.querySelector("#message");
const squares = document.querySelectorAll(".cell");

/* ------- Event Listeners ------- */

/*  ------- Functions ------- */

function init() {
	// Initialize turn to player 1
	// Initiialize winner to null, starting game = no winner yet
	board = [null, null, null, null, null, null, null, null, null];
	turn = "1";
	winner = null;
}
