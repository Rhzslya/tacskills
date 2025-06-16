import React from "react";

interface Props {
  handleModalClose: () => void;
  onSelectMode: (mode: "1p" | "2p") => void;
}

const ModalGameMode: React.FC<Props> = ({ handleModalClose, onSelectMode }) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-20"
        onClick={handleModalClose}
      />

      <div className="fixed z-30 bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select Game Mode</h2>
          <button
            onClick={handleModalClose}
            className="text-gray-500 hover:text-gray-800 text-lg font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <button
            className="w-full bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
            onClick={() => onSelectMode("1p")}
          >
            1 Player
          </button>

          <button
            className="w-full bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#7F8CAA] duration-300"
            onClick={() => onSelectMode("2p")}
          >
            2 Player
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalGameMode;
