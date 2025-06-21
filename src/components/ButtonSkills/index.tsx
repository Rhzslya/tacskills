import { motion } from "framer-motion";
import { buttonSkillVariant } from "../../lib/framer-motion";

interface ButtonSkillsProps {
  hasUsedDeletedSkill: boolean;
  hasUsedConvertSkill: boolean;
  hasUsedSweepSkill: boolean;
  selectedSkill: "delete" | "convert" | "sweep" | null;
  setSelectedSkill: (value: "delete" | "convert" | "sweep" | null) => void;
  playerSymbol: "X" | "O";
  currentPlayer: "X" | "O";
  squares: (string | null)[];
}

const ButtonSkills = ({
  hasUsedDeletedSkill,
  hasUsedConvertSkill,
  hasUsedSweepSkill,
  selectedSkill,
  setSelectedSkill,
  playerSymbol,
  currentPlayer,
  squares,
}: ButtonSkillsProps) => {
  const isDisabled = (used: boolean) => used || currentPlayer !== playerSymbol;
  const opponentSymbol = playerSymbol === "X" ? "O" : "X";
  const hasOpponentSymbol = squares.includes(opponentSymbol);
  const hasPlayerSymbol = squares.includes(playerSymbol);

  const canUseSweepSkill = hasPlayerSymbol && hasOpponentSymbol;

  const deleteLabel = playerSymbol === "O" ? "Delete X" : "Delete O";
  const convertLabel =
    playerSymbol === "O" ? "Convert X to O" : "Convert O to X";

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-2 md:gap-4 items-center mt-2 z-10 text-nowrap"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Delete Skill */}
      <motion.button
        variants={buttonSkillVariant}
        disabled={isDisabled(hasUsedDeletedSkill) || !hasOpponentSymbol}
        onClick={() => setSelectedSkill("delete")}
        className={`w-full md:w-fit text-xs font-semibold px-2 py-1 rounded border transition ${
          isDisabled(hasUsedDeletedSkill) || !hasOpponentSymbol
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : selectedSkill === "delete"
            ? "text-white bg-red-500 border-red-600"
            : "text-red-500 border-red-300"
        }`}
      >
        {deleteLabel}{" "}
        {hasUsedDeletedSkill
          ? "(used)"
          : !hasOpponentSymbol
          ? "(no target)"
          : ""}
      </motion.button>

      {/* Convert Skill */}
      <motion.button
        variants={buttonSkillVariant}
        disabled={isDisabled(hasUsedConvertSkill) || !hasOpponentSymbol}
        onClick={() => setSelectedSkill("convert")}
        className={`w-full md:w-fit text-xs font-semibold px-2 py-1 rounded border transition ${
          isDisabled(hasUsedConvertSkill) || !hasOpponentSymbol
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : selectedSkill === "convert"
            ? "text-white bg-blue-500 border-blue-600"
            : "text-blue-500 border-blue-300"
        }`}
      >
        {convertLabel}{" "}
        {hasUsedConvertSkill
          ? "(used)"
          : !hasOpponentSymbol
          ? "(no target)"
          : ""}
      </motion.button>

      {/* Sweep Skill */}
      <motion.button
        variants={buttonSkillVariant}
        disabled={isDisabled(hasUsedSweepSkill) || !canUseSweepSkill}
        onClick={() => setSelectedSkill("sweep")}
        className={`w-full md:w-fit text-xs font-semibold px-2 py-1 rounded border transition ${
          isDisabled(hasUsedSweepSkill) || !canUseSweepSkill
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : selectedSkill === "sweep"
            ? "text-white bg-green-500 border-green-600"
            : "text-green-500 border-green-300"
        }`}
      >
        Sweep Mark{" "}
        {hasUsedSweepSkill ? "(used)" : !canUseSweepSkill ? "(no target)" : ""}
      </motion.button>
    </motion.div>
  );
};

export default ButtonSkills;
