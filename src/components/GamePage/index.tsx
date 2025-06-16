import { useSearchParams } from "react-router-dom";
import Board from "../Board";
import XOBackgroundIcons from "../XOBackgrounds";

const GamePage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") as "1p" | "2p";

  return (
    <div className="min-h-screen relative flex items-center justify-center flex-col gap-4 text-center bg-[#eaefef] text-white">
      <h1 className="text-4xl font-bold z-10">
        Game Mode: {mode === "1p" ? "1 Player" : "2 Player"}
      </h1>
      <Board mode={mode} />
      <XOBackgroundIcons total={10} />
    </div>
  );
};

export default GamePage;
