import React, { useEffect, useState } from "react";
import xImage from "../../assets/x.webp";
import oImage from "../../assets/o.webp";
import { motion } from "motion/react";
import { iconVariants } from "../../lib/framer-motion";

// Fungsi posisi acak
function getRandomPosition() {
  return {
    top: `${Math.floor(Math.random() * 95)}%`,
    left: `${Math.floor(Math.random() * 95)}%`,
  };
}

// Fungsi cek jarak antar posisi
function isTooClose(
  pos1: { top: string; left: string },
  pos2: { top: string; left: string }
) {
  const top1 = parseInt(pos1.top);
  const left1 = parseInt(pos1.left);
  const top2 = parseInt(pos2.top);
  const left2 = parseInt(pos2.left);

  const distance = Math.sqrt((top1 - top2) ** 2 + (left1 - left2) ** 2);
  return distance < 10;
}

// Fungsi cari posisi yang belum dipakai
function generateUniquePosition(existing: { top: string; left: string }[]): {
  top: string;
  left: string;
} {
  let tries = 0;
  while (tries < 100) {
    const newPos = getRandomPosition();
    if (!existing.some((pos) => isTooClose(pos, newPos))) {
      return newPos;
    }
    tries++;
  }
  return getRandomPosition();
}

function getRandomSizeStyle(breakpoint: "sm" | "md" | "lg") {
  let sizes: number[];

  if (breakpoint === "lg") {
    sizes = [24, 28, 32, 36, 40];
  } else if (breakpoint === "md") {
    sizes = [20, 24, 28, 32, 36];
  } else {
    sizes = [16, 20, 24, 28, 32];
  }

  const size = sizes[Math.floor(Math.random() * sizes.length)];
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
}

interface XOBackgroundIconsProps {
  total?: number;
}

type IconData = {
  type: "X" | "O";
  top: string;
  left: string;
};

const STORAGE_KEY = "xo-background-icons";

const XOBackgroundIcons: React.FC<XOBackgroundIconsProps> = ({
  total = 10,
}) => {
  const [icons, setIcons] = useState<IconData[]>([]);
  const [breakpoint, setBreakpoint] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setBreakpoint("lg");
      else if (width >= 768) setBreakpoint("md");
      else setBreakpoint("sm");
    };

    handleResize(); // inisialisasi
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (saved) {
      const parsed = JSON.parse(saved);
      const age = now - parsed.timestamp;

      if (age < 1000 * 5) {
        setIcons(parsed.icons);
        return;
      }
    }

    const usedPositions: { top: string; left: string }[] = [];
    const generatedIcons: IconData[] = [];

    for (let i = 0; i < total; i++) {
      const pos = generateUniquePosition(usedPositions);
      usedPositions.push(pos);

      generatedIcons.push({
        type: Math.random() > 0.5 ? "X" : "O",
        top: pos.top,
        left: pos.left,
      });
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ timestamp: now, icons: generatedIcons })
    );
    setIcons(generatedIcons);
  }, [total]);

  return (
    <>
      {icons.map((icon, idx) => {
        const { width, height } = getRandomSizeStyle(breakpoint);

        return (
          <motion.img
            key={idx}
            src={icon.type === "X" ? xImage : oImage}
            alt={icon.type}
            className="absolute opacity-30 pointer-events-none z-0 object-contain"
            style={{
              top: icon.top,
              left: icon.left,
              width,
              height,
            }}
            variants={iconVariants}
            initial="hidden"
            animate="visible"
          />
        );
      })}
    </>
  );
};

export default XOBackgroundIcons;
