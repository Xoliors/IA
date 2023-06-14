// Variables globales
const humanPlayer = 'X';
const aiPlayer = 'O';
let currentPlayer = humanPlayer;
let gameEnded = false;
let playerScore = 0;
let aiScore = 0;

// Evento click en las celdas del tablero
const cells = document.getElementsByTagName('td');
for (const cell of cells) {
  cell.addEventListener('click', () => {
    handleMove(cell);
  });
}

// Función para manejar los movimientos del jugador
function handleMove(cell) {
  if (!gameEnded && cell.innerText === '') {
    cell.innerText = humanPlayer;
    currentPlayer = aiPlayer;
    checkGameResult();

    if (!gameEnded) {
      setTimeout(makeAIMove, 500); // Retraso para simular pensamiento de la IA
    }
  }
}

// Función para que la IA realice un movimiento
function makeAIMove() {
  const emptyCells = getEmptyCells();
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[randomIndex];
  cell.innerText = aiPlayer;
  currentPlayer = humanPlayer;
  checkGameResult();
}

// Función para verificar el resultado del juego
function checkGameResult() {
  const board = getBoardState();

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      endGame(board[a] + ' gana!');
      updateScore(board[a]);
      return;
    }
  }

  if (!board.includes('')) {
    endGame('¡Empate!');
    updateScore(null);
  }
}

// Función para obtener el estado actual del tablero
function getBoardState() {
  const board = document.getElementById('board');
  const cells = board.getElementsByTagName('td');
  const boardState = Array.from(cells).map((cell) => cell.innerText);
  return boardState;
}

// Función para obtener las celdas vacías del tablero
function getEmptyCells() {
  const board = document.getElementById('board');
  const cells = board.getElementsByTagName('td');
  return Array.from(cells).filter((cell) => cell.innerText === '');
}

// Función para finalizar el juego
function endGame(message) {
  gameEnded = true;
  document.getElementById('result').innerText = message;
}

// Función para actualizar el marcador
function updateScore(winner) {
  if (winner === humanPlayer) {
    playerScore++;
  } else if (winner === aiPlayer) {
    aiScore++;
  }

  document.getElementById('player-score').innerText = playerScore;
  document.getElementById('ai-score').innerText = aiScore;
}

// Función para reiniciar el juego
function resetGame() {
  clearBoard();
  gameEnded = false;
  document.getElementById('result').innerText = '';
}

// Función para limpiar el tablero
function clearBoard() {
  const cells = document.getElementById('board').getElementsByTagName('td');
  for (const cell of cells) {
    cell.innerText = '';
  }
}

// Reiniciar juego al hacer clic en el botón de reinicio
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);
