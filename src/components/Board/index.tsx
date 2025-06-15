import { useState } from "react";
import { calculateWinner } from "../../utils/CalculateWinners";
import Square from "../Square";

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  function handleClick(index: number) {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "Draw!";
  } else {
    status = `Next Player: ${isXNext ? "X" : "O"}`;
  }
  return (
    <div className="flex flex-col items-center mt-8 mx-auto h-full space-y-4 py-8 max-w-[60%] bg-black">
      <div className="text-xl font-semibold">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {squares.map((value, i) => (
          <Square key={i} value={value} onClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
};

export default Board;
