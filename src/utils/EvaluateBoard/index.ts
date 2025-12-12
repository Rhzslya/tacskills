export default function evaluateBoard(
  board: (string | null)[],
  grid: number
): number {
  let score = 0;

  const lines: number[][] = [];

  // Center preference
  const center = Math.floor(board.length / 2);
  if (board[center] === "O") score += 15;

  // Corner preference
  const corners = [0, grid - 1, board.length - grid, board.length - 1];
  for (const i of corners) {
    if (i >= 0 && i < board.length) {
      if (board[i] === "O") score += 10;
      else if (board[i] === "X") score -= 10;
    }
  }

  // Horizontal
  for (let row = 0; row < grid; row++) {
    for (let col = 0; col <= grid - 3; col++) {
      const start = row * grid + col;
      lines.push([start, start + 1, start + 2]);
    }
  }

  // Vertical
  for (let col = 0; col < grid; col++) {
    for (let row = 0; row <= grid - 3; row++) {
      const start = row * grid + col;
      lines.push([start, start + grid, start + 2 * grid]);
    }
  }

  // Diagonal 
  for (let row = 0; row <= grid - 3; row++) {
    for (let col = 0; col <= grid - 3; col++) {
      const start = row * grid + col;
      lines.push([start, start + grid + 1, start + 2 * (grid + 1)]);
    }
  }

  // Diagonal 
  for (let row = 0; row <= grid - 3; row++) {
    for (let col = 2; col < grid; col++) {
      const start = row * grid + col;
      lines.push([start, start + grid - 1, start + 2 * (grid - 1)]);
    }
  }

  // Nilai berdasarkan jumlah O dan X dalam setiap line
  for (const line of lines) {
    const values = line.map((i) => board[i]);
    const oCount = values.filter((v) => v === "O").length;
    const xCount = values.filter((v) => v === "X").length;

    if (oCount > 0 && xCount === 0) {
      score += Math.pow(10, oCount);
    } else if (xCount > 0 && oCount === 0) {
      score -= Math.pow(10, xCount);
    }
  }

  return score;
}
