import React from "react";
import xImage from "../../assets/x.webp";
import oImage from "../../assets/o.webp";

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

// Fungsi ukuran acak (20px s.d. 40px)
function getRandomSizeStyle() {
  const sizes = [20, 24, 28, 32, 36, 40];
  const size = sizes[Math.floor(Math.random() * sizes.length)];
  return {
    width: `${size}px`,
    height: `${size}px`,
  };
}

interface XOBackgroundIconsProps {
  total?: number;
}

const XOBackgroundIcons: React.FC<XOBackgroundIconsProps> = ({
  total = 10,
}) => {
  const usedPositions: { top: string; left: string }[] = [];

  const xIcons = Array.from({ length: total }, (_, i) => {
    const pos = generateUniquePosition(usedPositions);
    usedPositions.push(pos);
    const sizeStyle = getRandomSizeStyle();
    return (
      <img
        key={`x-${i}`}
        src={xImage}
        alt="X"
        className="absolute opacity-30 pointer-events-none z-0 object-contain"
        style={{ ...pos, ...sizeStyle }}
      />
    );
  });

  const oIcons = Array.from({ length: total }, (_, i) => {
    const pos = generateUniquePosition(usedPositions);
    usedPositions.push(pos);
    const sizeStyle = getRandomSizeStyle();
    return (
      <img
        key={`o-${i}`}
        src={oImage}
        alt="O"
        className="absolute opacity-30 pointer-events-none z-0 object-contain"
        style={{ ...pos, ...sizeStyle }}
      />
    );
  });

  return (
    <>
      {xIcons}
      {oIcons}
    </>
  );
};

export default XOBackgroundIcons;
