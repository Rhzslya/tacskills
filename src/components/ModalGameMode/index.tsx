import React, { useState } from "react";

interface Props {
  handleModalClose: () => void;
  onSelectMode: (mode: "1p-easy" | "1p-medium" | "1p-hard" | "2p") => void;
}

const ModalGameMode: React.FC<Props> = ({ handleModalClose, onSelectMode }) => {
  const [step, setStep] = useState<"mode" | "difficulty">("mode");

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={handleModalClose}
      />

      <div className="fixed z-30 bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {step === "mode" ? "Select Game Mode" : "Select Difficulty"}
          </h2>
          <button
            onClick={() => {
              if (step === "difficulty") {
                setStep("mode");
              } else {
                handleModalClose();
              }
            }}
            className="text-gray-500 hover:text-gray-800 text-lg font-bold"
          >
            ×
          </button>
        </div>

        {step === "mode" ? (
          <div className="space-y-4">
            <button
              className="w-full bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
              onClick={() => setStep("difficulty")}
            >
              1 Player
            </button>

            <button
              className="w-full bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
              onClick={() => {
                onSelectMode("2p");
                handleModalClose();
              }}
            >
              2 Player
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button
              className="w-full bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600"
              onClick={() => {
                onSelectMode("1p-easy");
                handleModalClose();
              }}
            >
              Easy
            </button>

            <button
              className="w-full bg-yellow-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600"
              onClick={() => {
                onSelectMode("1p-medium");
                handleModalClose();
              }}
            >
              Medium
            </button>

            <button
              className="w-full bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600"
              onClick={() => {
                onSelectMode("1p-hard");
                handleModalClose();
              }}
            >
              Hard
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ModalGameMode;
