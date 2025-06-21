import React, { type JSX } from "react";

export type GameStatus =
  | "You Win!"
  | "You Lose!"
  | "Draw!"
  | "Player X Win"
  | "Player O Win";

export function getRandomMessage(status: GameStatus): JSX.Element {
  const messages: Record<GameStatus, string[]> = {
    "You Win!": [
      "Too easy, right? 😎",
      "You made the bot cry 🤖💧",
      "Victory is yours, champion!",
      "The bot stood no chance!",
      "You crushed that AI like a pro!",
      "Not even close, bot. Not even close.",
      "You might be too good for this game.",
      "Are you secretly a developer?",
      "Bot.exe has stopped responding.",
      "This is why bots fear humans.",
      "You didn’t just win — you humiliated it!",
      "AI has officially surrendered 🔥",
    ],
    "You Lose!": [
      "The bot appreciates your training session.",
      "Ouch! Looks like the bot had its moment.",
      "Maybe next time… or maybe not? 😏",
      "Bot says that was child's play.",
      "Even a toaster might’ve done better 🫣",
      "Bot is adding this win to its resume.",
      "Practice might help next time 😬",
      "That was a nice warm-up for the bot!",
      "That round taught the bot nothing — too easy.",
      "You tried your best… probably.",
      "Even a rock might’ve lasted longer.",
      "Bot is now dreaming of esports glory.",
    ],
    "Draw!": [
      "You and the bot are equals... for now.",
      "A tie? Boring, but fair.",
      "Nobody wins, nobody loses. How poetic.",
      "Well... that was anticlimactic 😐",
      "Deadlock! Better bring your A-game next time.",
      "Balanced — just like the universe intended.",
      "That’s a neutral ending, but we move.",
      "Suspiciously peaceful ending, hmm.",
      "The bot is yawning. Are you?",
      "You both gave something... not sure what, though.",
    ],
    "Player X Win": [
      "Player X is on fire! 🔥",
      "Player O just got a reality check.",
      "X flexed, and O just vanished.",
      "X claimed the board like a true tactician.",
      "Player O might need some serious regrouping.",
      "X just delivered a tactical masterclass.",
      "That was domination by X!",
      "Player X proved who’s boss today.",
      "X walked in and took over the game.",
      "Is Player O okay after that match?",
      "X stands tall, undefeated.",
    ],
    "Player O Win": [
      "Player O dominates the arena!",
      "X just couldn’t keep up with that pace.",
      "O ran circles around X 💨",
      "What a stylish win by Player O.",
      "Player X is left rethinking strategies 😬",
      "O controlled every move beautifully.",
      "X gave it a shot, but it wasn’t enough.",
      "O just danced their way to victory.",
      "X looked confused the whole match.",
      "That was pure elegance from Player O!",
      "O proves who really runs this board.",
    ],
  };

  const pool = messages[status] || ["That was... something."];
  const message = pool[Math.floor(Math.random() * pool.length)];

  const highlighted = message
    .split(/(Player X|Player O|bot|Bot|X|O)/g)
    .map((part, index) => {
      if (part === "Player X" || part === "X") {
        return (
          <span key={index} className="text-blue-600 font-semibold">
            {part}
          </span>
        );
      }
      if (part === "Player O" || part === "O") {
        return (
          <span key={index} className="text-pink-600 font-semibold">
            {part}
          </span>
        );
      }
      if (part.toLowerCase() === "bot") {
        return (
          <span key={index} className="text-gray-700 font-semibold italic">
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });

  return <>{highlighted}</>;
}
