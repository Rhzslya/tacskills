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
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
      />

      {playerMode === "1p" && (
        <div className="flex gap-4 items-center mt-2 z-10">
          <span className="text-sm font-medium text-[#7F8CAA]">Skills:</span>

          <button
            disabled={hasUsedDeletedSkill}
            onClick={() => setSelectedSkill("delete")}
            className={`text-xs font-semibold px-2 py-1 rounded border transition ${
              hasUsedDeletedSkill
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : selectedSkill === "delete"
                ? "text-white bg-red-500 border-red-600"
                : "text-red-500 border-red-300"
            }`}
          >
            Delete O {hasUsedDeletedSkill && "(used)"}
          </button>

          <button
            disabled={hasUsedConvertSkill}
            onClick={() => setSelectedSkill("convert")}
            className={`text-xs font-semibold px-2 py-1 rounded border transition ${
              hasUsedConvertSkill
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : selectedSkill === "convert"
                ? "text-white bg-blue-500 border-blue-600"
                : "text-blue-500 border-blue-300"
            }`}
          >
            Convert O to X {hasUsedConvertSkill && "(used)"}
          </button>

          <button
            disabled={hasUsedSweepSkill}
            onClick={() => setSelectedSkill("sweep")}
            className={`text-xs font-semibold px-2 py-1 rounded border transition ${
              hasUsedSweepSkill
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : selectedSkill === "sweep"
                ? "text-white bg-green-500 border-green-600"
                : "text-green-500 border-green-300"
            }`}
          >
            Sweep Mark {hasUsedSweepSkill && "(used)"}
          </button>
        </div>
      )}

      <XOBackgroundIcons total={10} />
    </div>
  );
};

export default GamePage;
