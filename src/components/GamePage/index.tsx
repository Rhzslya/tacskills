import { useState } from "react";
import { capitalizeFirst } from "../../utils/Capitalize";
import Board from "../Board";
import XOBackgroundIcons from "../XOBackgrounds";

const GamePage = () => {
  const searchParams = new URLSearchParams(location.search);
  const mode = searchParams.get("mode");
  const grid = parseInt(searchParams.get("grid") || "3");
  const [hasUsedDeletedSkill, setHasUsedDeletedSkill] = useState(false);
  const [hasUsedConvertSkill, setHasUsedConvertSkill] = useState(false);
  const [hasUsedSweepSkill, setHasUsedSweepSkill] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<
    "delete" | "convert" | "sweep" | null
  >(null);

  const [playerOUsedDeleteSkill, setPlayerOUsedDeleteSkill] = useState(false);
  const [playerOUsedConvertSkill, setPlayerOUsedConvertSkill] = useState(false);
  const [playerOUsedSweepSkill, setPlayerOUsedSweepSkill] = useState(false);

  const [playerMode, difficulty] = mode?.split("-") ?? [];

  return (
    <div className="min-h-screen relative flex items-center justify-center flex-col gap-4 text-center bg-[#eaefef] text-white">
      <h1 className="text-4xl font-bold z-10 text-[#7F8CAA]">
        {playerMode === "1p"
          ? `1 Player (${capitalizeFirst(difficulty) || "normal"})`
          : "2 Player"}
      </h1>
      <Board
        mode={playerMode as "1p" | "2p"}
        difficulty={difficulty as "easy" | "medium" | "hard" | undefined}
        grid={grid}
        hasUsedDeletedSkill={hasUsedDeletedSkill}
        setHasUsedDeletedSkill={setHasUsedDeletedSkill}
        setHasUsedConvertSkill={setHasUsedConvertSkill}
        hasUsedConvertSkill={hasUsedConvertSkill}
        hasUsedSweepSkill={hasUsedSweepSkill}
        setHasUsedSweepSkill={setHasUsedSweepSkill}
        playerOUsedDeleteSkill={playerOUsedDeleteSkill}
        setPlayerOUsedDeleteSkill={setPlayerOUsedDeleteSkill}
        playerOUsedConvertSkill={playerOUsedConvertSkill}
        setPlayerOUsedConvertSkill={setPlayerOUsedConvertSkill}
        playerOUsedSweepSkill={playerOUsedSweepSkill}
        setPlayerOUsedSweepSkill={setPlayerOUsedSweepSkill}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
        playerMode={playerMode}
      />

      <XOBackgroundIcons total={10} />
    </div>
  );
};

export default GamePage;
