import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  modalHeaderContainerVariants,
  modalHeaderItemVariants,
  modeButtonsContainerVariants,
  modeButtonVariants,
} from "../../lib/framer-motion";
import BaseModal from "../BaseModal";

type DifficultyLevel = "easy" | "medium" | "hard";
type ModeType = "1p-easy" | "1p-medium" | "1p-hard" | "2p";

interface Props {
  handleModalClose: () => void;
  onSelectMode: (mode: ModeType, grid: number) => void;
}

const ModalGameMode: React.FC<Props> = ({ handleModalClose, onSelectMode }) => {
  const [step, setStep] = useState<"mode" | "grid" | "difficulty">("mode");
  const [tempMode, setTempMode] = useState<"1p" | "2p" | null>(null);
  const [selectedGrid, setSelectedGrid] = useState<number>(3);

  return (
    <BaseModal onClose={handleModalClose}>
      <motion.div
        className="flex justify-between items-center mb-4"
        variants={modalHeaderContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-base lg:text-xl font-bold"
          variants={modalHeaderItemVariants}
        >
          {step === "mode"
            ? "Select Game Mode"
            : step === "grid"
            ? "Select Grid Size"
            : "Select Difficulty"}
        </motion.h2>

        <motion.button
          variants={modalHeaderItemVariants}
          onClick={() => {
            if (step === "difficulty") {
              setStep("grid");
            } else if (step === "grid") {
              setStep("mode");
              setTempMode(null);
            } else {
              handleModalClose();
            }
          }}
          className="text-gray-500 hover:text-gray-800 text-lg font-bold"
        >
          ×
        </motion.button>
      </motion.div>

      {step === "mode" && (
        <motion.div
          className="space-y-4"
          variants={modeButtonsContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            className="w-full bg-[#b8cfce] text-white text-sm md:text-base font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
            variants={modeButtonVariants}
            onClick={() => {
              setTempMode("1p");
              setStep("grid");
            }}
          >
            1 Player
          </motion.button>

          <motion.button
            className="w-full bg-[#b8cfce] text-white text-sm md:text-base font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
            variants={modeButtonVariants}
            onClick={() => {
              setTempMode("2p");
              setStep("grid");
            }}
          >
            2 Player
          </motion.button>
        </motion.div>
      )}

      {step === "grid" && (
        <motion.div
          className="grid grid-cols-2 gap-3"
          variants={modeButtonsContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {[3, 4, 5, 6].map((size) => (
            <motion.button
              key={size}
              className={`bg-gray-300 text-gray-800 text-sm md:text-base font-semibold px-4 py-2 rounded-md hover:bg-gray-400 ${
                selectedGrid === size ? "bg-[#7F8CAA] text-white " : ""
              }`}
              variants={modeButtonVariants}
              onClick={() => {
                setSelectedGrid(size);
                if (tempMode === "1p") {
                  setStep("difficulty");
                } else if (tempMode === "2p") {
                  onSelectMode("2p", size);
                  handleModalClose();
                }
              }}
            >
              {size} x {size}
            </motion.button>
          ))}
        </motion.div>
      )}

      {step === "difficulty" && tempMode === "1p" && (
        <motion.div
          className="space-y-4"
          variants={modeButtonsContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {(["easy", "medium", "hard"] as DifficultyLevel[]).map((level) => {
            const mode: ModeType = `1p-${level}`;
            return (
              <motion.button
                key={level}
                className={`w-full text-sm md:text-base ${
                  level === "easy"
                    ? "bg-sky-700 hover:bg-sky-800"
                    : level === "medium"
                    ? "bg-indigo-700 hover:bg-indigo-800"
                    : "bg-slate-700 hover:bg-slate-800"
                } text-white font-semibold px-4 py-2 rounded-md`}
                variants={modeButtonVariants}
                onClick={() => {
                  onSelectMode(mode, selectedGrid);
                  handleModalClose();
                }}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </BaseModal>
  );
};

export default ModalGameMode;
