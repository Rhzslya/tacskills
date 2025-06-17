import { useEffect, useState } from "react";
import { calculateWinner } from "../../utils/CalculateWinners";
import Square from "../Square";
import findBestMove from "../../utils/FindBestMove";
import findDangerousMove from "../../utils/FindDangerousMove";

interface BoardProps {
  mode: "1p" | "2p";
  difficulty?: "easy" | "medium" | "hard";
  grid: number;
  hasUsedDeletedSkill: boolean;
  setHasUsedDeletedSkill: (value: boolean) => void;
  hasUsedConvertSkill: boolean;
  setHasUsedConvertSkill: (value: boolean) => void;
  hasUsedSweepSkill: boolean;
  setHasUsedSweepSkill: (value: boolean) => void;
  selectedSkill: "delete" | "convert" | "sweep" | null;
  setSelectedSkill: (value: "delete" | "convert" | "sweep" | null) => void;
}

const Board = ({
  mode,
  difficulty,
  grid,
  hasUsedDeletedSkill,
  setHasUsedDeletedSkill,
  hasUsedConvertSkill,
  setHasUsedConvertSkill,
  hasUsedSweepSkill,
  setHasUsedSweepSkill,
  selectedSkill,
  setSelectedSkill,
}: BoardProps) => {
  const [squares, setSquares] = useState<(string | null)[]>([]);
  const [isXNext, setIsXNext] = useState(true);
  const [botUsedDeleteSkill, setBotUsedDeleteSkill] = useState(false);
  const [botUsedConvertSkill, setBotUsedConvertSkill] = useState(false);
  const [botUsedSweepSkill, setBotUsedSweepSkill] = useState(false);
  const [sweepTargetEnemyIndex, setSweepTargetEnemyIndex] = useState<
    number | null
  >(null);

  const winner = calculateWinner(squares, grid);

  useEffect(() => {
    setSquares(Array(grid * grid).fill(null));
    setIsXNext(true);
    setHasUsedDeletedSkill(false);
    setHasUsedConvertSkill(false);
    setHasUsedSweepSkill(false);
    setBotUsedDeleteSkill(false);
    setBotUsedConvertSkill(false);
    setBotUsedSweepSkill(false);
    setSelectedSkill(null);
  }, [
    grid,
    setHasUsedDeletedSkill,
    setHasUsedConvertSkill,
    setHasUsedSweepSkill,
    setSelectedSkill,
  ]);

  function handleClick(index: number) {
    if (squares[index] || winner) return;
    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  }

  function handleUseDeleteSkill(index: number) {
    const nextSquares = [...squares];
    nextSquares[index] = null;
    setSquares(nextSquares);
    setHasUsedDeletedSkill(true);
    setIsXNext(false);
  }

  function handleUseConvertSkill(index: number) {
    const nextSquares = [...squares];
    nextSquares[index] = "X";
    setSquares(nextSquares);
    setHasUsedConvertSkill(true);
    setIsXNext(false);
  }

  function handleSkillClick(index: number): boolean {
    if (selectedSkill === "sweep" && !hasUsedSweepSkill) {
      if (squares[index] === "O" && sweepTargetEnemyIndex === null) {
        setSweepTargetEnemyIndex(index);
        return true;
      }
      if (squares[index] === "X" && sweepTargetEnemyIndex !== null) {
        const nextSquares = [...squares];
        const enemyIndex = sweepTargetEnemyIndex;
        const selfIndex = index;
        const temp = nextSquares[enemyIndex];
        nextSquares[enemyIndex] = nextSquares[selfIndex];
        nextSquares[selfIndex] = temp;
        setSquares(nextSquares);
        setHasUsedSweepSkill(true);
        setSelectedSkill(null);
        setSweepTargetEnemyIndex(null);
        setIsXNext(false);
        return true;
      }
      return true;
    }

    if (
      selectedSkill === "delete" &&
      !hasUsedDeletedSkill &&
      squares[index] === "O"
    ) {
      handleUseDeleteSkill(index);
      setSelectedSkill(null);
      return true;
    }

    if (
      selectedSkill === "convert" &&
      !hasUsedConvertSkill &&
      squares[index] === "O"
    ) {
      handleUseConvertSkill(index);
      setSelectedSkill(null);
      return true;
    }

    return false;
  }

  useEffect(() => {
    if (mode === "1p" && !isXNext && !winner) {
      const timeout = setTimeout(() => {
        const nextSquares = [...squares];
        const dangerMove = findDangerousMove(nextSquares, "X", grid);
        const canDeleteX = nextSquares.includes("X");

        if (!botUsedDeleteSkill && dangerMove !== null) {
          nextSquares[dangerMove] = null;
          setSquares(nextSquares);
          setBotUsedDeleteSkill(true);
          setIsXNext(true);
          return;
        }

        if (!botUsedSweepSkill && Math.random() < 0.5) {
          const player = nextSquares.findIndex((v) => v === "X");
          const bot = nextSquares.findIndex((v) => v === "O");
          if (player !== -1 && bot !== -1) {
            [nextSquares[player], nextSquares[bot]] = [
              nextSquares[bot],
              nextSquares[player],
            ];
            setSquares(nextSquares);
            setBotUsedSweepSkill(true);
            setIsXNext(true);
            return;
          }
        }

        if (!botUsedConvertSkill && canDeleteX && Math.random() < 0.5) {
          const xIndexes = nextSquares
            .map((v, i) => (v === "X" ? i : null))
            .filter((i): i is number => i !== null);
          const target = xIndexes[Math.floor(Math.random() * xIndexes.length)];
          nextSquares[target] = "O";
          setSquares(nextSquares);
          setBotUsedConvertSkill(true);
          setIsXNext(true);
          return;
        }

        let bestMove: number | null = null;
        if (difficulty === "easy") {
          const available = nextSquares
            .map((v, i) => (v === null ? i : null))
            .filter((i): i is number => i !== null);
          bestMove = available[Math.floor(Math.random() * available.length)];
        } else {
          bestMove = findBestMove(nextSquares, difficulty, grid);
        }

        if (bestMove !== null) {
          nextSquares[bestMove] = "O";
          setSquares(nextSquares);
          setIsXNext(true);
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [
    isXNext,
    mode,
    difficulty,
    squares,
    winner,
    grid,
    botUsedDeleteSkill,
    botUsedConvertSkill,
    botUsedSweepSkill,
  ]);

  function handleReset() {
    setSquares(Array(grid * grid).fill(null));
    setIsXNext(true);
    setHasUsedDeletedSkill(false);
    setHasUsedConvertSkill(false);
    setHasUsedSweepSkill(false);
    setSelectedSkill(null);
    setBotUsedDeleteSkill(false);
    setBotUsedConvertSkill(false);
    setBotUsedSweepSkill(false);
    setSweepTargetEnemyIndex(null);
  }

  const status = winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? "Draw!"
    : mode === "1p"
    ? isXNext
      ? "Your Turn (X)"
      : "Enemy Turn (O)"
    : `Player Turn: ${isXNext ? "X" : "O"}`;

  return (
    <div className="flex flex-col items-center mt-4 space-y-4 z-10">
      <span className="text-lg font-bold text-[#7F8CAA]">{status}</span>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))` }}
      >
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onClick={() => {
              if (mode === "1p" && !isXNext) return;
              if (mode === "1p" && isXNext && handleSkillClick(i)) return;
              handleClick(i);
            }}
          />
        ))}
      </div>

      <div
        className={`button-play-again mt-6 z-10 group transition-opacity ${
          winner || squares.every(Boolean)
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={handleReset}
          className="bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md group-hover:bg-[#7F8CAA] group-hover:text-[#333446] duration-300"
        >
          Play Again
        </button>
      </div>
      {selectedSkill === "sweep" && (
        <div className="text-sm text-[#0a0909] italic mt-2">
          {sweepTargetEnemyIndex === null
            ? "Pick an enemy mark to swap."
            : "Pick one of your marks to swap with enemy mark."}
        </div>
      )}
    </div>
  );
};

export default Board;
