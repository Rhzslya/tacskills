import { useEffect, useState } from "react";
import { calculateWinner } from "../../utils/CalculateWinners";
import Square from "../Square";
import findBestMove from "../../utils/FindBestMove";
import findDangerousMove from "../../utils/FindDangerousMove";
import ButtonSkills from "../ButtonSkills";
import BaseModal from "../BaseModal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getRandomMessage, type GameStatus } from "../../utils/RandomMessages";

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
  playerOUsedDeleteSkill: boolean;
  setPlayerOUsedDeleteSkill: (value: boolean) => void;
  playerOUsedConvertSkill: boolean;
  setPlayerOUsedConvertSkill: (value: boolean) => void;
  playerOUsedSweepSkill: boolean;
  setPlayerOUsedSweepSkill: (value: boolean) => void;
  selectedSkill: "delete" | "convert" | "sweep" | null;
  setSelectedSkill: (value: "delete" | "convert" | "sweep" | null) => void;
  playerMode: string;
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
  playerOUsedDeleteSkill,
  setPlayerOUsedDeleteSkill,
  playerOUsedConvertSkill,
  setPlayerOUsedConvertSkill,
  playerOUsedSweepSkill,
  setPlayerOUsedSweepSkill,
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
  const playerSymbol = mode === "1p" ? "X" : isXNext ? "X" : "O";
  const winner = calculateWinner(squares, grid);
  const shouldShowResultModal = !!winner || squares.every(Boolean);
  const navigate = useNavigate();

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

  const handleExit = () => {
    navigate("/");
  };

  function handleUseDeleteSkill(index: number) {
    const nextSquares = [...squares];
    nextSquares[index] = null;
    setSquares(nextSquares);
    if (isXNext) {
      setHasUsedDeletedSkill(true);
    } else {
      setPlayerOUsedDeleteSkill(true);
    }
    setIsXNext(!isXNext);
  }

  function handleUseConvertSkill(index: number) {
    const nextSquares = [...squares];
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    if (isXNext) {
      setHasUsedConvertSkill(true);
    } else {
      setPlayerOUsedConvertSkill(true);
    }
    setIsXNext(!isXNext);
  }

  function handleSkillClick(index: number): boolean {
    const self = isXNext ? "X" : "O";
    const enemyPlayer = isXNext ? "O" : "X";

    if (
      selectedSkill === "sweep" &&
      !(isXNext ? hasUsedSweepSkill : playerOUsedSweepSkill)
    ) {
      if (squares[index] === enemyPlayer && sweepTargetEnemyIndex === null) {
        setSweepTargetEnemyIndex(index);
        return true;
      }
      if (squares[index] === self && sweepTargetEnemyIndex !== null) {
        const nextSquares = [...squares];
        const enemyIndex = sweepTargetEnemyIndex;
        const selfIndex = index;
        [nextSquares[enemyIndex], nextSquares[selfIndex]] = [
          nextSquares[selfIndex],
          nextSquares[enemyIndex],
        ];
        setSquares(nextSquares);
        if (isXNext) {
          setHasUsedSweepSkill(true);
        } else {
          setPlayerOUsedSweepSkill(true);
        }
        setSelectedSkill(null);
        setSweepTargetEnemyIndex(null);
        setIsXNext(!isXNext);
        return true;
      }
      return true;
    }

    if (
      selectedSkill === "delete" &&
      !(isXNext ? hasUsedDeletedSkill : playerOUsedDeleteSkill) &&
      squares[index] === enemyPlayer
    ) {
      handleUseDeleteSkill(index);
      setSelectedSkill(null);
      return true;
    }

    if (
      selectedSkill === "convert" &&
      !(isXNext ? hasUsedConvertSkill : playerOUsedConvertSkill) &&
      squares[index] === enemyPlayer
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
    setPlayerOUsedDeleteSkill(false);
    setPlayerOUsedConvertSkill(false);
    setPlayerOUsedSweepSkill(false);
  }
  const status = winner
    ? mode === "1p"
      ? winner === "X"
        ? "You Win!"
        : "You Lose!"
      : winner === "X"
      ? "Player X Win"
      : "Player O Win"
    : squares.every(Boolean)
    ? "Draw!"
    : mode === "1p"
    ? isXNext
      ? "Your Turn (X)"
      : "Enemy Turn (O)"
    : `Player Turn: ${isXNext ? "X" : "O"}`;

  const gameEndStatus: GameStatus | null =
    status === "You Win!" ||
    status === "You Lose!" ||
    status === "Draw!" ||
    status === "Player X Win" ||
    status === "Player O Win"
      ? status
      : null;

  const getMaxWidthClass = () => {
    if (grid >= 6) return "max-w-[400px] lg:max-w-[500px]";
    if (grid >= 4) return "max-w-[300px] md:max-w-[400px] lg:max-w-[500px]";
    return "max-w-[200px] md:max-w-[250px] lg:max-w-[300px]";
  };

  return (
    <div className="relative w-full flex flex-col items-center mt-4 space-y-4 z-10">
      {shouldShowResultModal && (
        <BaseModal>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-4"
          >
            <p
              className={`text-2xl font-bold flex justify-center items-center gap-2 ${
                status.includes("You Win")
                  ? "text-green-600"
                  : status.includes("You Lose")
                  ? "text-red-600"
                  : status.includes("Draw")
                  ? "text-yellow-600"
                  : status.includes("Player X")
                  ? "text-blue-600"
                  : status.includes("Player O")
                  ? "text-pink-600"
                  : "text-gray-800"
              }`}
            >
              {status === "You Win!"
                ? "🏆 You Win!"
                : status === "You Lose!"
                ? "😢 You Lose!"
                : status === "Draw!"
                ? "🤝 Draw!"
                : status === "Player Turn : X"
                ? "🔵 Player X's Turn"
                : status === "Player Turn : O"
                ? "🔴 Player O's Turn"
                : status === "Player X Win"
                ? "🏆 Player X Wins!"
                : status === "Player O Win"
                ? "🏆 Player O Wins!"
                : status}
            </p>

            <p className="text-sm text-gray-500">
              {gameEndStatus && getRandomMessage(gameEndStatus)}
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={handleReset}
                className="w-full bg-[#b8cfce] hover:bg-[#7F8CAA] text-white font-semibold px-5 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Play Again
              </button>
              <button
                onClick={handleExit}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
              >
                Exit
              </button>
            </div>
          </motion.div>
        </BaseModal>
      )}

      <div
        className={`grid gap-1 w-full mx-auto ${getMaxWidthClass()}`}
        style={{ gridTemplateColumns: `repeat(${grid}, minmax(0, 1fr))` }}
      >
        {squares.map((value, i) => (
          <Square
            key={i}
            value={value}
            index={i}
            onClick={() => {
              if (mode === "1p" && !isXNext) return;

              if (handleSkillClick(i)) return;

              handleClick(i);
            }}
            selectedSkill={selectedSkill}
            playerSymbol={playerSymbol}
            sweepTargetEnemyIndex={sweepTargetEnemyIndex}
            grid={grid}
          />
        ))}
      </div>

      {mode === "1p" || mode === "2p" ? (
        <ButtonSkills
          hasUsedDeletedSkill={
            playerSymbol === "X" ? hasUsedDeletedSkill : playerOUsedDeleteSkill
          }
          hasUsedConvertSkill={
            playerSymbol === "X" ? hasUsedConvertSkill : playerOUsedConvertSkill
          }
          hasUsedSweepSkill={
            playerSymbol === "X" ? hasUsedSweepSkill : playerOUsedSweepSkill
          }
          selectedSkill={selectedSkill}
          setSelectedSkill={setSelectedSkill}
          playerSymbol={playerSymbol}
          currentPlayer={isXNext ? "X" : "O"}
          squares={squares}
        />
      ) : null}

      {selectedSkill === "sweep" && (
        <div className="text-sm text-[#0a0909] italic mt-2">
          {sweepTargetEnemyIndex === null
            ? "Pick an enemy mark to swap."
            : "Pick one of your marks to swap with enemy mark."}
        </div>
      )}

      <div className="mt-2 text-sm font-medium text-gray-700">
        {mode === "1p" ? (
          isXNext ? (
            <span className="text-blue-600">🔵 Your Turn (X)</span>
          ) : (
            <span className="text-red-600">🔴 Enemy Turn (O)</span>
          )
        ) : isXNext ? (
          <span className="text-blue-600">🔵 Player X Turn</span>
        ) : (
          <span className="text-pink-600">🔴 Player O Turn</span>
        )}
      </div>
    </div>
  );
};

export default Board;
