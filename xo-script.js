const cells = document.querySelectorAll('.cell');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const resetGameButton = document.getElementById('reset');
const resetScoreButton = document.getElementById('resetScore');
const turnIndicator = document.getElementById('turnIndicator');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let xScore = localStorage.getItem('xScore') ? parseInt(localStorage.getItem('xScore')) : 0;
let oScore = localStorage.getItem('oScore') ? parseInt(localStorage.getItem('oScore')) : 0;

updateScoreDisplay();
updateTurnIndicator();

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetGameButton.addEventListener('click', resetGame);
resetScoreButton.addEventListener('click', resetScores);

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    if (gameBoard[index] === '' && !checkForWin()) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkForWin()) {
            if (currentPlayer === 'X') {
                xScore++;
                localStorage.setItem('xScore', xScore);
                alert('Player 1 wins!');
                currentPlayer = 'O'; // Player 2 starts next
            } else {
                oScore++;
                localStorage.setItem('oScore', oScore);
                alert('Player 2 wins!');
                currentPlayer = 'X'; // Player 1 starts next
            }
            updateScoreDisplay();
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

function checkForWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        return condition.every(index => {
            return gameBoard[index] === currentPlayer;
        });
    });
}

function updateScoreDisplay() {
    scoreXDisplay.textContent = xScore;
    scoreODisplay.textContent = oScore;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    // Reset the current player to start based on who lost last
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTurnIndicator();
}

function resetScores() {
    xScore = 0;
    oScore = 0;
    localStorage.setItem('xScore', xScore);
    localStorage.setItem('oScore', oScore);
    updateScoreDisplay();
}

function updateTurnIndicator() {
    turnIndicator.textContent = `Current Turn: Player ${currentPlayer === 'X' ? '1' : '2'}`;
}
