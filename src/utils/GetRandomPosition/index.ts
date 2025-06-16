export default function getRandomPosition() {
  const top = Math.floor(Math.random() * 100);
  const left = Math.floor(Math.random() * 100);
  return { top: `${top}%`, left: `${left}%` };
}
