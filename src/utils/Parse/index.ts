import type { Difficulty, PlayerMode } from "../../lib/utils/type";

export function parseMode(modeStr: string | null): {
  playerMode: PlayerMode;
  difficulty?: Difficulty;
} {
  const [playerModeRaw, difficultyRaw] = modeStr?.split("-") ?? [];

  const isValidMode = playerModeRaw === "1p" || playerModeRaw === "2p";
  const isValidDifficulty = ["easy", "medium", "hard"].includes(
    difficultyRaw || ""
  );

  return {
    playerMode: isValidMode ? (playerModeRaw as PlayerMode) : "1p",
    difficulty: isValidDifficulty ? (difficultyRaw as Difficulty) : undefined,
  };
}
