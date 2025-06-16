import Board from "../Board";
import XOBackgroundIcons from "../XOBackgrounds";

const GamePage = () => {
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode"); // e.g. "1p-easy"

  const [playerMode, difficulty] = mode?.split("-") ?? [];

  return (
    <div className="min-h-screen relative flex items-center justify-center flex-col gap-4 text-center bg-[#eaefef] text-white">
      <h1 className="text-4xl font-bold z-10">
        Game Mode:{" "}
        {playerMode === "1p"
          ? `1 Player (${difficulty || "normal"})`
          : "2 Player"}
      </h1>
      <Board
        mode={playerMode as "1p" | "2p"}
        difficulty={difficulty as "easy" | "medium" | "hard" | undefined}
      />
      <XOBackgroundIcons total={10} />
    </div>
  );
};

export default GamePage;
