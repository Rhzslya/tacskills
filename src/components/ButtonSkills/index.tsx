interface ButtonSkillsProps {
  hasUsedDeletedSkill: boolean;
  hasUsedConvertSkill: boolean;
  hasUsedSweepSkill: boolean;
  selectedSkill: "delete" | "convert" | "sweep" | null;
  setSelectedSkill: (value: "delete" | "convert" | "sweep" | null) => void;
  playerSymbol: "X" | "O"; // siapa pemilik tombol ini
  currentPlayer: "X" | "O"; // siapa yang sedang bermain
}

const ButtonSkills = ({
  hasUsedDeletedSkill,
  hasUsedConvertSkill,
  hasUsedSweepSkill,
  selectedSkill,
  setSelectedSkill,
  playerSymbol,
  currentPlayer,
}: ButtonSkillsProps) => {
  const isDisabled = (used: boolean) => used || currentPlayer !== playerSymbol;

  const deleteLabel = playerSymbol === "O" ? "Delete X" : "Delete O";
  const convertLabel =
    playerSymbol === "O" ? "Convert X to O" : "Convert O to X";

  return (
    <div className="flex gap-4 items-center mt-2 z-10">
      <span className="text-sm font-medium text-[#7F8CAA]">Skills:</span>

      {/* Delete Skill */}
      <button
        disabled={isDisabled(hasUsedDeletedSkill)}
        onClick={() => setSelectedSkill("delete")}
        className={`text-xs font-semibold px-2 py-1 rounded border transition ${
          isDisabled(hasUsedDeletedSkill)
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : selectedSkill === "delete"
            ? "text-white bg-red-500 border-red-600"
            : "text-red-500 border-red-300"
        }`}
      >
        {deleteLabel} {hasUsedDeletedSkill && "(used)"}
      </button>

      {/* Convert Skill */}
      <button
        disabled={isDisabled(hasUsedConvertSkill)}
        onClick={() => setSelectedSkill("convert")}
        className={`text-xs font-semibold px-2 py-1 rounded border transition ${
          isDisabled(hasUsedConvertSkill)
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : selectedSkill === "convert"
            ? "text-white bg-blue-500 border-blue-600"
            : "text-blue-500 border-blue-300"
        }`}
      >
        {convertLabel} {hasUsedConvertSkill && "(used)"}
      </button>

      {/* Sweep Skill */}
      <button
        disabled={isDisabled(hasUsedSweepSkill)}
        onClick={() => setSelectedSkill("sweep")}
        className={`text-xs font-semibold px-2 py-1 rounded border transition ${
          isDisabled(hasUsedSweepSkill)
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : selectedSkill === "sweep"
            ? "text-white bg-green-500 border-green-600"
            : "text-green-500 border-green-300"
        }`}
      >
        Sweep Mark {hasUsedSweepSkill && "(used)"}
      </button>
    </div>
  );
};

export default ButtonSkills;
