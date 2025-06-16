import { calculateWinner } from "../CalculateWinners";

export function findBestMove(
  squares: (string | null)[],
  difficulty: "easy" | "medium" | "hard" = "hard"
): number | null {
  if (difficulty === "easy" && Math.random() < 0.8) {
    return getRandomMove(squares);
  }

  if (difficulty === "medium" && Math.random() < 0.5) {
    return getRandomMove(squares);
  }

  if (difficulty === "hard" && Math.random() < 0.1) {
    return getRandomMove(squares);
  }

  let bestScore = -Infinity;
  let move: number | null = null;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = "O";
      const score = minimax(squares, 0, false);
      squares[i] = null;

      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  return move;
}

function getRandomMove(squares: (string | null)[]): number | null {
  const available = squares
    .map((v, i) => (v === null ? i : null))
    .filter((i) => i !== null) as number[];
  if (available.length === 0) return null;
  return available[Math.floor(Math.random() * available.length)];
}

function minimax(
  board: (string | null)[],
  depth: number,
  isMaximizing: boolean
): number {
  const winner = calculateWinner(board);
  if (winner === "O") return 10 - depth;
  if (winner === "X") return depth - 10;
  if (board.every((cell) => cell !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "X";
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}
