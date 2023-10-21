import { gameInterface } from './GamesMapped';
import TicTacToe from './TicTacToe';

interface LiveGameInterface {
  gameProperties: gameInterface;
}

export default function LiveGame({ gameProperties }: LiveGameInterface) {
  return (
    <div>
      <TicTacToe />
    </div>
  );
}
