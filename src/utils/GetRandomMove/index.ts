export default function getRandomMove(squares: (string | null)[]): number {
  const availableMoves = squares
    .map((val, index) => (val === null ? index : null))
    .filter((val): val is number => val !== null);

  if (availableMoves.length === 0) return -1;

  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}
