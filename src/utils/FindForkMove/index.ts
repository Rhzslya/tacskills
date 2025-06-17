import countPotentialWins from "../CountPotentialWins";

export default function findForkMove(
  board: (string | null)[],
  player: "X" | "O",
  grid: number
): number | null {
  const potentialForks: number[] = [];

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = player;

      const forks = countPotentialWins(board, player, grid);
      if (forks >= 2) potentialForks.push(i);

      board[i] = null;
    }
  }

  return potentialForks.length ? potentialForks[0] : null;
}
