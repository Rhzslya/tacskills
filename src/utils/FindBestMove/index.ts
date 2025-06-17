import { calculateWinner } from "../CalculateWinners";
import findForkMove from "../FindForkMove";
import getRandomMove from "../GetRandomMove";
import minimax from "../Minimax";

export default function findBestMove(
  squares: (string | null)[],
  difficulty: "easy" | "medium" | "hard" = "hard",
  grid: number
): number {
  // Langkah menang langsung
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = "O";
      if (calculateWinner(squares, grid) === "O") {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }

  // Blok lawan kalau dia hampir menang
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = "X";
      if (calculateWinner(squares, grid) === "X") {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }

  // Deteksi fork
  const forkMove = findForkMove(squares, "O", grid);
  if (forkMove !== null) return forkMove;

  // Blok fork musuh
  const blockFork = findForkMove(squares, "X", grid);
  if (blockFork !== null) return blockFork;

  // Difficulty randomness
  if (difficulty === "easy" && Math.random() < 0.8) {
    return getRandomMove(squares);
  }
  if (difficulty === "medium" && Math.random() < 0.5) {
    return getRandomMove(squares);
  }
  if (difficulty === "hard" && Math.random() < 0.1) {
    return getRandomMove(squares);
  }

  // Minimax fallback
  let bestScore = -Infinity;
  let move: number | null = null;
  const maxDepth = grid <= 4 ? 9 : 3;

  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = "O";
      const score = minimax(squares, 0, false, grid, maxDepth);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }

  // ✅ Fallback: pakai langkah acak jika tidak ada langkah yang optimal
  return move !== null ? move : getRandomMove(squares);
}
