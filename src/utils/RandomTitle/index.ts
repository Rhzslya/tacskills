export const getTitle = ({
  playerMode,
  difficulty,
}: {
  playerMode: "1p" | "2p";
  difficulty?: "easy" | "medium" | "hard";
}): string => {
  if (playerMode === "1p") {
    switch (difficulty) {
      case "easy":
        return "You're Up! · Relaxed Match";
      case "medium":
        return "You're Up! · Tactical Challenge";
      case "hard":
        return "You're Up! · Intense Battle";
      default:
        return "You're Up! · Ready to Play";
    }
  } else {
    return "Let's Duel · Player vs Player";
  }
};
