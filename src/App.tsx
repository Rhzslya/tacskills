import { useState } from "react";
import XOBackgroundIcons from "./components/XOBackgrounds";
import ModalGameMode from "./components/ModalGameMode";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  backgroundVariants,
  fadeIn,
  fadeInUp,
  logoVariants,
  popIn,
} from "./lib/framer-motion";
import logo from "./assets/logo.webp";
import { ColourfulText } from "./utils/ColorfulText";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleSelectMode = (
    mode: "2p" | "1p-easy" | "1p-medium" | "1p-hard",
    grid: number
  ) => {
    navigate(`/game?mode=${mode}&grid=${grid}`);
    handleModalClose();
  };

  return (
    <section className="app relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      <motion.div
        className="absolute h-full inset-0 bg-grid-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_80%)] pointer-events-none z-0"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      />
      <XOBackgroundIcons total={20} />

      <motion.div
        className="max-w-[150px] lg:max-w-[200px] z-10"
        variants={logoVariants}
        initial="hidden"
        animate="visible"
      >
        <img src={logo} alt="X" className="w-full h-full object-contain" />
      </motion.div>

      <motion.h1
        className="title-main font-bold text-center relative z-10 text-nowrap"
        style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        initial="hidden"
        animate="visible"
        variants={fadeIn(0.6)}
      >
        TacSkill
      </motion.h1>

      <motion.div
        className="font-medium text-xl leading-loose text-center relative z-10"
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={fadeInUp}
          style={{ fontSize: "clamp(1rem, 2vw, 18px)" }}
        >
          <ColourfulText text="Think Tic Tac Toe is simple? Try it with Skills!" />
        </motion.p>
      </motion.div>

      <motion.div
        className="button-container my-4 w-[50%] mx-auto group z-10"
        variants={popIn}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          onClick={handleModalOpen}
          className="bg-[#b8cfce] px-1 xs:px-2 lg:px-4 py-2 text-white font-semibold rounded-md group-hover:bg-[#7F8CAA] group-hover:text-[#333446] duration-300"
        >
          Start Game
        </motion.button>
      </motion.div>

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
