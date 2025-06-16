import { useState } from "react";
import XOBackgroundIcons from "./components/XOBackgrounds";
import ModalGameMode from "./components/ModalGameMode";
import { useNavigate } from "react-router-dom";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSelectMode = (mode: "1p" | "2p") => {
    navigate(`/game?mode=${mode}`);
    handleModalClose();
  };

  return (
    <section className="app relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute h-full inset-0 bg-grid-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_80%)] pointer-events-none z-0" />
      <XOBackgroundIcons total={10} />

      <h1 className="title-main text-5xl font-extrabold text-center z-10 mb-4">
        Tic Tac Toe
      </h1>

      <p className="text-lg max-w-xl z-10">
        Classic rules, modern skills. Tic Tac Toe has evolved.
      </p>

      <div className="button-start mt-6 z-10 group">
        <button
          onClick={handleModalOpen}
          className="bg-[#b8cfce] text-white font-semibold px-4 py-2 rounded-md group-hover:bg-[#7F8CAA] group-hover:text-[#333446] duration-300"
        >
          Start Game
        </button>
      </div>
      {isModalOpen && (
        <ModalGameMode
          handleModalClose={handleModalClose}
          onSelectMode={handleSelectMode}
        />
      )}
    </section>
  );
}

export default App;
