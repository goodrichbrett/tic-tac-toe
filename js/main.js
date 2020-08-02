/*------Constants------*/

const colors = {
	"1": "#f2d53c",
	"-1": "#c80e13",
	null: "#7d3cff",
};

/* all possible winning square indexes*/
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

/*------Variables (state)------*/

let board, turn, winner;
/*------Cached Element References------*/

const resetBtn = document.querySelector("#resetButton");
const status = document.querySelector("#status");
const squares = document.querySelectorAll(".square");

/*------Event Listeners------*/

resetBtn.addEventListener("click", init);
for (const square of squares) {
	square.addEventListener("click", handleClick);
}

/*------Functions------*/

init();

function init() {
	// remove all 'x' and 'o' classes
	for (const square of squares) {
		square.classList.remove("x");
		square.classList.remove("o");
	}
	board = [null, null, null, null, null, null, null, null, null];
	turn = 1;
	winner = null;
	render();
}

// Function to handle click events on the squares
function handleClick(e) {
	//  get index of clicked square
	const clickedSquareIdx = parseInt(e.target.classList[1]);
	// if square is already marked or there is a winner, return
	if (board[clickedSquareIdx]) return;
	if (winner) return;
	if (e.target.classList[2] === "x" || e.target.classList[2] === "o") {
		return;
	}
	// add class list 'x' or 'o' depending on turn
	if (turn === 1) {
		e.target.style.color = colors[turn];
		e.target.classList.add("x");
	} else {
		e.target.style.color = colors[turn];
		e.target.classList.add("o");
	}
	//update board array, change turns
	board[clickedSquareIdx] = turn;
	turn *= -1;
	winner = checkForWinner();
	render();
}

// Compares current board to winningCombos to decide if there is a winner
function checkForWinner() {
	//
}

// Render function:
// Displays the current state of the board on the page, updating the elements to reflect either X or O depending on whose turn it is
function render() {}
