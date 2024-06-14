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
  board[cellIndex] = currentPlayer;
  document.getElementById('board').children[cellIndex].innerText = currentPlayer;
  const winner = checkWinner();
  if (winner) {
    if (winner === 'draw') {
      document.getElementById('result').innerText = 'It\'s a draw!';
    } else {
      document.getElementById('result').innerText = `Player ${winner} wins!`;
    }
  } else {
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
