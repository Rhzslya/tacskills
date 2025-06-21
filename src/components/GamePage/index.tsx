import { useState } from "react";
import { capitalizeFirst } from "../../utils/Capitalize";
import Board from "../Board";
import XOBackgroundIcons from "../XOBackgrounds";
import { motion } from "framer-motion";
import { fadeIn, popIn } from "../../lib/framer-motion";
import { Home } from "lucide-react";

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
    <div className="min-h-screen mx-3 md:mx-4 relative flex items-center justify-center flex-col gap-2 md:gap-4 text-center bg-[#eaefef] text-white">
      <motion.h1
        className="text-[#7F8CAA] font-bold text-2xl sm:text-3xl md:text-4xl"
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.6)}
      >
        {playerMode === "1p"
          ? `1 Player (${capitalizeFirst(difficulty) || "normal"})`
          : "2 Player"}
      </motion.h1>
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

      <XOBackgroundIcons total={20} />

      <motion.div
        className="absolute top-4 right-4 group z-10"
        variants={popIn}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="bg-[#b8cfce] p-2 text-white font-semibold rounded-sm group-hover:bg-[#7F8CAA] group-hover:text-[#333446] duration-300 flex items-center justify-center"
          title="Home"
        >
          <Home className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GamePage;
