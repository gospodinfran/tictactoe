import { gameInterface } from './GamesMapped';

interface GameDisplayProps {
  index: number;
  handleOpenGame: (game: gameInterface) => void;
  game: gameInterface;
  user: string;
}

export default function GameDisplay({
  index,
  handleOpenGame,
  game,
  user,
}: GameDisplayProps) {
  return (
    <div
      className="w-2/3 h-10 rounded border-2 border-b-0 last:border-b-2 flex justify-between items-center hover:cursor-pointer hover:bg-cyan-300 px-4"
      key={index}
      onClick={() => handleOpenGame(game)}
    >
      <div>{`${
        game.player2
          ? `2/2 Players: ${game.player1}, ${game.player2}`
          : `1/2 Players: ${game.player1}`
      }`}</div>
      {(user === game.player1 || user === game.player2) && (
        <button className="h-full rounded bg-violet-500 text-white hover:scale-110 p-2">
          Join game
        </button>
      )}
    </div>
  );
}
