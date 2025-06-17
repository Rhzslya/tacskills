import { calculateWinner } from "../CalculateWinners";
import evaluateBoard from "../EvaluateBoard";

export default function minimax(
  board: (string | null)[],
  depth: number,
  isMaximizing: boolean,
  grid: number,
  maxDepth: number = 4,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  const winner = calculateWinner(board, grid);
  if (winner === "O") return 1000 - depth;
  if (winner === "X") return depth - 1000;
  if (board.every((cell) => cell !== null)) return 0;
  if (depth >= maxDepth) return evaluateBoard(board, grid);

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "O";
        const score = minimax(
          board,
          depth + 1,
          false,
          grid,
          maxDepth,
          alpha,
          beta
        );
        board[i] = null;
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = "X";
        const score = minimax(
          board,
          depth + 1,
          true,
          grid,
          maxDepth,
          alpha,
          beta
        );
        board[i] = null;
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  }
}
