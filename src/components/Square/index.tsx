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
        <img src={xImg} alt="X" className="w-full h-full object-contain " />
      );
    if (value === "O")
      return (
        <img src={oImg} alt="O" className="w-full h-full object-contain " />
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

  return (
    <button
      className={`w-full h-full p-1 aspect-square bg-white border border-gray-300 flex items-center justify-center transition-colors duration-200 ${getHoverClass()} ${getExtraClass()}`}
      onClick={onClick}
      title={getTitle()}
    >
      {renderContent()}
    </button>
  );
};

export default Square;
