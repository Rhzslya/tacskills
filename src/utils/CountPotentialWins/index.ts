export default function countPotentialWins(
  board: (string | null)[],
  player: "X" | "O",
  grid: number
): number {
  const lines: number[][] = [];
  let count = 0;

  // Buat kombinasi semua 3-cell line (atau 4 jika grid 4)
  const winLength = grid === 3 ? 3 : 4;

  // Horizontal
  for (let row = 0; row < grid; row++) {
    for (let col = 0; col <= grid - winLength; col++) {
      const start = row * grid + col;
      lines.push(Array.from({ length: winLength }, (_, k) => start + k));
    }
  }

  // Vertical
  for (let col = 0; col < grid; col++) {
    for (let row = 0; row <= grid - winLength; row++) {
      const start = row * grid + col;
      lines.push(Array.from({ length: winLength }, (_, k) => start + k * grid));
    }
  }

  // Diagonal \
  for (let row = 0; row <= grid - winLength; row++) {
    for (let col = 0; col <= grid - winLength; col++) {
      const start = row * grid + col;
      lines.push(
        Array.from({ length: winLength }, (_, k) => start + k * (grid + 1))
      );
    }
  }

  // Diagonal /
  for (let row = 0; row <= grid - winLength; row++) {
    for (let col = winLength - 1; col < grid; col++) {
      const start = row * grid + col;
      lines.push(
        Array.from({ length: winLength }, (_, k) => start + k * (grid - 1))
      );
    }
  }

  for (const line of lines) {
    const values = line.map((i) => board[i]);
    const playerCount = values.filter((v) => v === player).length;
    const emptyCount = values.filter((v) => v === null).length;

    if (playerCount === winLength - 1 && emptyCount === 1) {
      count++;
    }
  }

  return count;
}
