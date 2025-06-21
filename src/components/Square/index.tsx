import xImg from "../../assets/x.webp";
import oImg from "../../assets/o.webp";

interface SquareProps {
  value: string | null;
  onClick: () => void;
  index: number;
  selectedSkill: "delete" | "convert" | "sweep" | null;
  playerSymbol: "X" | "O";
  sweepTargetEnemyIndex: number | null;
  grid: number;
}

const Square = ({
  value,
  onClick,
  selectedSkill,
  playerSymbol,
  sweepTargetEnemyIndex,
  grid,
}: SquareProps) => {
  const opponentSymbol = playerSymbol === "X" ? "O" : "X";
  const isTargetForDelete =
    selectedSkill === "delete" && value === opponentSymbol;
  const isTargetForConvert =
    selectedSkill === "convert" && value === opponentSymbol;
  const isSweepEnemy =
    selectedSkill === "sweep" &&
    value === opponentSymbol &&
    sweepTargetEnemyIndex === null;
  const isSweepPlayer =
    selectedSkill === "sweep" &&
    sweepTargetEnemyIndex !== null &&
    value === playerSymbol;

  const getHoverClass = () => {
    if (value === null) return "";
    if (isTargetForDelete) return "hover:bg-red-200";
    if (isTargetForConvert) return "hover:bg-blue-200";
    if (isSweepEnemy || isSweepPlayer) return "hover:bg-green-200";
    return "";
  };

  const getExtraClass = () => {
    if (
      isTargetForDelete ||
      isTargetForConvert ||
      isSweepEnemy ||
      isSweepPlayer
    ) {
      return "cursor-pointer ring-2 ring-offset-1 ring-opacity-60 ring-gray-400";
    }
    return "";
  };

  const renderContent = () => {
    if (value === "X")
      return (
        <img
          src={xImg}
          alt="X"
          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
        />
      );
    if (value === "O")
      return (
        <img
          src={oImg}
          alt="O"
          className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
        />
      );
    return null;
  };

  const getTitle = () => {
    if (isTargetForDelete) return "Delete this mark";
    if (isTargetForConvert) return "Convert this mark";
    if (isSweepEnemy) return "Pick enemy mark to swap";
    if (isSweepPlayer) return "Pick your mark to swap";
    return "";
  };

  const getSize = () => {
    if (grid <= 3) return 56; // px (14 * 4)
    if (grid <= 5) return 48; // px (12 * 4)
    return 40; // default for larger grids
  };

  return (
    <button
      className={`bg-white border border-gray-300 flex items-center justify-center transition-colors duration-200 ${getHoverClass()} ${getExtraClass()}`}
      onClick={onClick}
      title={getTitle()}
      style={{
        width: getSize(),
        height: getSize(),
      }}
    >
      {renderContent()}
    </button>
  );
};

export default Square;
