import { calculateWinner } from "../CalculateWinners";

export default function findDangerousMove(
  squares: (string | null)[],
  target: string,
  grid: number
): number | null {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) continue;

    const testSquares = [...squares];
    testSquares[i] = target;
    const result = calculateWinner(testSquares, grid);

    if (result === target) {
      const threatIndex = findThreatIndex(squares, target);
      return threatIndex;
    }
  }

  return null;
}

function findThreatIndex(
  squares: (string | null)[],
  target: string
): number | null {
  const indexes = squares
    .map((val, i) => (val === target ? i : null))
    .filter((i): i is number => i !== null);
  return indexes.length > 0
    ? indexes[Math.floor(Math.random() * indexes.length)]
    : null;
}
