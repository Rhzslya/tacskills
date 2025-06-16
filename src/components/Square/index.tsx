import xImg from "../../assets/x.webp";
import oImg from "../../assets/o.webp";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square = ({ value, onClick }: SquareProps) => {
  const renderContent = () => {
    if (value === "X") return <img src={xImg} alt="X" className="w-10 h-10" />;
    if (value === "O") return <img src={oImg} alt="O" className="w-10 h-10" />;
    return null;
  };

  return (
    <button
      className="w-20 h-20 bg-white border border-gray-300 flex items-center justify-center"
      onClick={onClick}
    >
      {renderContent()}
    </button>
  );
};

export default Square;
