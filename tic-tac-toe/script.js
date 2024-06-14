let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

document.getElementById('vsComputer').addEventListener('click', () => {
  vsComputer = true;
  reset();
});

document.getElementById('vsPerson').addEventListener('click', () => {
  vsComputer = false;
  reset();
});

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      return board[a];
    }
  }
  if (!board.includes('')) {
    gameActive = false;
    return 'draw';
  }
  return null;
}

function makeMove(cellIndex) {
  if (!gameActive || board[cellIndex] !== '') return;

  // Player move
  board[cellIndex] = currentPlayer;
  document.getElementById('board').children[cellIndex].innerText = currentPlayer;

  // Check if the game is over
  const winner = checkWinner();
  if (winner) {
    if (winner === 'draw') {
      document.getElementById('result').innerText = 'It\'s a draw!';
    } else {
      document.getElementById('result').innerText = `Player ${winner} wins!`;
    }
    return; // Exit if the game is over
  } else {
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // If playing against the computer, make a computer move
    if (vsComputer && currentPlayer === 'O') {
      setTimeout(makeComputerMove, 500); // Delay to simulate thinking
    }
  }
}

function makeComputerMove() {
  if (!gameActive) return;

  // Check if the computer can win in the next move
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = currentPlayer;
      if (checkWinner() === currentPlayer) {
        document.getElementById('board').children[i].innerText = currentPlayer;
        gameActive = false;
        document.getElementById('result').innerText = `Player ${currentPlayer} wins!`;
        return;
      }
      board[i] = '';
    }
  }

  // Take the center if available
  if (board[4] === '') {
    board[4] = currentPlayer;
    document.getElementById('board').children[4].innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    return;
  }

  // Take one of the corners if available
  const corners = [0, 2, 6, 8];
  for (let i of corners) {
    if (board[i] === '') {
      board[i] = currentPlayer;
      document.getElementById('board').children[i].innerText = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      return;
    }
  }

  // Take any remaining cell
  let availableCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') availableCells.push(i);
  }
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  board[availableCells[randomIndex]] = currentPlayer;
  document.getElementById('board').children[availableCells[randomIndex]].innerText = currentPlayer;

  // Check if the game is over after the computer's move
  const winner = checkWinner();
  if (winner) {
    if (winner === 'draw') {
      document.getElementById('result').innerText = 'It\'s a draw!';
    } else {
      document.getElementById('result').innerText = `Player ${winner} wins!`;
    }
    return; // Exit if the game is over
  } else {
    // Switch back to the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function reset() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('result').innerText = '';
  const cells = document.getElementsByClassName('cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
  }
}
