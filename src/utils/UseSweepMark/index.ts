export default function applySweepSkill(
  squares: (string | null)[],
  currentPlayer: "X" | "O"
): (string | null)[] {
  const opponent = currentPlayer === "X" ? "O" : "X";
  const myIndexes = squares
    .map((val, idx) => (val === currentPlayer ? idx : null))
    .filter((i): i is number => i !== null);
  const enemyIndexes = squares
    .map((val, idx) => (val === opponent ? idx : null))
    .filter((i): i is number => i !== null);

  if (myIndexes.length === 0 || enemyIndexes.length === 0) return squares;

  const newSquares = [...squares];
  const myIndex = myIndexes[0];
  const enemyIndex = enemyIndexes[0];

  // Swap
  newSquares[myIndex] = opponent;
  newSquares[enemyIndex] = currentPlayer;

  return newSquares;
}
