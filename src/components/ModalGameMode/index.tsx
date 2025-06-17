import React, { useState } from "react";

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
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={handleModalClose}
      />

      <div className="fixed z-30 bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {step === "mode"
              ? "Select Game Mode"
              : step === "grid"
              ? "Select Grid Size"
              : "Select Difficulty"}
          </h2>
          <button
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
          </button>
        </div>

        {step === "mode" && (
          <div className="space-y-4">
            <button
              className="w-full bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
              onClick={() => {
                setTempMode("1p");
                setStep("grid");
              }}
            >
              1 Player
            </button>
            <button
              className="w-full bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
              onClick={() => {
                setTempMode("2p");
                setStep("grid");
              }}
            >
              2 Player
            </button>
          </div>
        )}

        {step === "grid" && (
          <div className="grid grid-cols-2 gap-3">
            {[3, 4, 5, 6].map((size) => (
              <button
                key={size}
                className={`bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md hover:bg-gray-400 ${
                  selectedGrid === size ? "bg-[#7F8CAA] text-white" : ""
                }`}
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
              </button>
            ))}
          </div>
        )}

        {step === "difficulty" && tempMode === "1p" && (
          <div className="space-y-4">
            {(["easy", "medium", "hard"] as DifficultyLevel[]).map((level) => {
              const mode: ModeType = `1p-${level}`;
              return (
                <button
                  key={level}
                  className={`w-full ${
                    level === "easy"
                      ? "bg-green-500 hover:bg-green-600"
                      : level === "medium"
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white font-semibold px-4 py-2 rounded-md`}
                  onClick={() => {
                    onSelectMode(mode, selectedGrid);
                    handleModalClose();
                  }}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default ModalGameMode;
