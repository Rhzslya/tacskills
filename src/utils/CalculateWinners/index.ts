export const calculateWinner = (
  squares: (string | null)[],
  grid: number
): string | null => {
  // Tentukan jumlah simbol berturut-turut yang dibutuhkan untuk menang
  let winLength = 3;
  if (grid >= 5) winLength = 4;

  const checkLine = (start: number, step: number): string | null => {
    const player = squares[start];
    if (!player) return null;

    for (let i = 1; i < winLength; i++) {
      const next = start + i * step;

      // pastikan tidak keluar dari grid
      const nextRow = Math.floor(next / grid);
      const nextCol = next % grid;
      const startRow = Math.floor(start / grid);
      const startCol = start % grid;

      if (
        next < 0 ||
        next >= squares.length ||
        squares[next] !== player ||
        // validasi tambahan horizontal dan diagonal agar tidak lompat baris
        (step === 1 && nextRow !== startRow) ||
        (step === grid - 1 && nextCol >= startCol) ||
        (step === grid + 1 && nextCol <= startCol)
      ) {
        return null;
      }
    }

    return player;
  };

  // Horizontal
  for (let row = 0; row < grid; row++) {
    for (let col = 0; col <= grid - winLength; col++) {
      const start = row * grid + col;
      const winner = checkLine(start, 1);
      if (winner) return winner;
    }
  }

  // Vertical
  for (let col = 0; col < grid; col++) {
    for (let row = 0; row <= grid - winLength; row++) {
      const start = row * grid + col;
      const winner = checkLine(start, grid);
      if (winner) return winner;
    }
  }

  // Diagonal (\)
  for (let row = 0; row <= grid - winLength; row++) {
    for (let col = 0; col <= grid - winLength; col++) {
      const start = row * grid + col;
      const winner = checkLine(start, grid + 1);
      if (winner) return winner;
    }
  }

  // Diagonal (/)
  for (let row = 0; row <= grid - winLength; row++) {
    for (let col = winLength - 1; col < grid; col++) {
      const start = row * grid + col;
      const winner = checkLine(start, grid - 1);
      if (winner) return winner;
    }
  }

  return null;
};
