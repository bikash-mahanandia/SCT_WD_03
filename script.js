    const boardEl = document.getElementById('board');
    const statusEl = document.getElementById('status');
    const modeEl = document.getElementById('mode');
    const themeToggle = document.getElementById('toggleTheme');

    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let gameOver = false;
    let mode = 'human';

    const winningCombos = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];

    function startGame() {
      board = Array(9).fill('');
      currentPlayer = 'X';
      gameOver = false;
      mode = modeEl.value;
      statusEl.textContent = `Player ${currentPlayer}'s turn`;
      renderBoard();
    }

    function renderBoard() {
      boardEl.innerHTML = '';
      board.forEach((val, i) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = val;
        cell.addEventListener('click', () => handleMove(i));
        boardEl.appendChild(cell);
      });
    }

    function handleMove(i) {
      if (board[i] !== '' || gameOver) return;
      board[i] = currentPlayer;
      renderBoard();
      if (checkWinner(currentPlayer)) {
        statusEl.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
      }
      if (board.every(cell => cell !== '')) {
        statusEl.textContent = "It's a draw!";
        gameOver = true;
        return;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusEl.textContent = `Player ${currentPlayer}'s turn`;

      if (!gameOver && mode === 'computer' && currentPlayer === 'O') {
        setTimeout(() => computerMove(), 400);
      }
    }

    function computerMove() {
      const empty = board.map((v, i) => v === '' ? i : null).filter(i => i !== null);
      const move = empty[Math.floor(Math.random() * empty.length)];
      handleMove(move);
    }

    function checkWinner(player) {
      return winningCombos.some(combo => combo.every(i => board[i] === player));
    }

    // Toggle theme
    themeToggle.addEventListener('change', () => {
      document.body.classList.toggle('dark');
      document.body.classList.toggle('light');
    });

    startGame();
