import { useEffect, useState } from "react";
import { calculateWinner } from "../../utils/CalculateWinners";
import Square from "../Square";
import { findBestMove } from "../../utils/Minimax";

interface BoardProps {
  mode: "1p" | "2p";
  difficulty?: "easy" | "medium" | "hard";
}

const Board = ({ mode, difficulty }: BoardProps) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(squares);

  function handleClick(index: number) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  useEffect(() => {
    if (mode === "1p" && !isXNext && !winner) {
      const timeout = setTimeout(() => {
        let bestMove: number | null;

        // AI behavior based on difficulty
        if (difficulty === "easy") {
          const available = squares
            .map((v, i) => (v === null ? i : null))
            .filter((i) => i !== null) as number[];
          bestMove = available[Math.floor(Math.random() * available.length)];
        } else {
          // medium/hard bisa pakai Minimax
          bestMove = findBestMove(squares, difficulty); // pasang logic ini
        }

        if (bestMove !== null) {
          const nextSquares = [...squares];
          nextSquares[bestMove] = "O";
          setSquares(nextSquares);
          setIsXNext(true);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isXNext, mode, difficulty, squares, winner]);

  let status = "Next Player: " + (isXNext ? "X" : "O");
  if (winner) status = "Winner: " + winner;
  else if (squares.every(Boolean)) status = "Draw!";

  return (
    <div className="flex flex-col items-center mt-4 space-y-4 z-10">
      <div className="text-lg font-medium">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => {
              if (mode === "1p" && !isXNext) return;
              handleClick(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
