/*------Constants------*/

const colors = {
	"1": "#ccff2d",
	"-1": "#ff2d2d",
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
	// set the status to waiting for player
	status.innerText = "X = King ♔ // O = Queen ♕";
	status.style.color = "#545454";
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
	// Call addClassList to switch between x/o and designated colors
	addClassList(e.target);
	// Call updateBoardArray to update board and change turns
	updateBoardArray(clickedSquareIdx);
}

// Compares current board to winningCombos to decide if there is a winner
function checkForWinner() {
	const squaresArray = Array.from(squares);
	let xSquares = [];
	let oSquares = [];
	for (const square of squaresArray) {
		if (square.classList[2] === "x") {
			xSquares.push(parseInt(square.classList[1]));
		} else if (square.classList[2] === "o") {
			oSquares.push(parseInt(square.classList[1]));
		}
	}
	let checkedX = checkForWinningCombo(xSquares);
	let checkedO = checkForWinningCombo(oSquares);
	if (checkedX === 1) return 1;
	if (checkedO * -1 === -1) return -1;
	if (board.includes(null)) {
		return null;
	} else {
		return "T";
	}
}

function addClassList(e) {
	if (turn === 1) {
		e.style.color = colors[turn];
		e.classList.add("x");
	} else {
		e.style.color = colors[turn];
		e.classList.add("o");
	}
}

function updateBoardArray(clickedSquareIdx) {
	board[clickedSquareIdx] = turn;
	turn *= -1;
	winner = checkForWinner();
	render();
}

function checkForWinningCombo(arr) {
	for (let i = 0; i < winningCombos.length; i++) {
		if (JSON.stringify(arr).includes(JSON.stringify(winningCombos[i]))) {
			return 1;
		}
	}
}

// Change the status to display turn, add corresponding color to status
// Change status to display the winner with the correct color text
function render() {
	if (turn === 1) {
		status.innerHTML = "Make your move, King ♔";
		status.style.color = "#ccff2d";
	} else if (turn === -1) {
		status.innerText = "Make your move, Queen ♛";
		status.style.color = "#ff2d2d";
	}
	if (winner === 1) {
		status.style.color = "#ccff2d";
		status.innerText = "The King wins!";
		status.className = "animated bounce";
		setTimeout(function () {
			status.classList.remove("animated", "bounce");
		}, 1000);
	} else if (winner === -1) {
		status.style.color = "#ff2d2d";
		status.innerText = "The Queen wins!";
		status.className = "animated bounce";
		setTimeout(function () {
			status.classList.remove("animated", "bounce");
		}, 1000);
	} else if (winner === "T") {
		status.style.color = "#545454";
		status.innerText = "Tie game!";
	}
}
