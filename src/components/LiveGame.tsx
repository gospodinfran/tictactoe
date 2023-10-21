import { doc, updateDoc } from 'firebase/firestore';
import { gameInterface } from './GamesMapped';
import TicTacToe from './TicTacToe';
import { db } from '../../lib/firebase';
import { useState } from 'react';

interface LiveGameInterface {
  gameProperties: gameInterface;
  user: string;
}

export default function LiveGame({ gameProperties, user }: LiveGameInterface) {
  const [properties, setProperties] = useState<gameInterface>(gameProperties);

  async function handleJoinGame() {
    if (user === properties.player1 || user === properties.player2) {
      return;
    }
    const gameRef = doc(db, 'games', properties.id!);
    await updateDoc(gameRef, { player2: user });
    setProperties((prev) => ({
      ...prev,
      player2: user,
    }));
  }

  async function handleTileClick() {
    // check if user is in this game
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-12">
        <h1 className="text-4xl">
          {properties.player2
            ? `${properties.player1} vs ${properties.player2}`
            : 'Waiting for another player!'}
        </h1>
        <div>
          <TicTacToe
            board={properties.boardState}
            onTileClick={handleTileClick}
          />
        </div>
        <div className="text-xl">
          {properties.player2
            ? `${
                properties.player1ToPlay
                  ? properties.player1
                  : properties.player2
              } to play!`
            : `${properties.player1} is waiting for an opponent.`}
        </div>
        {!properties.player2 && (
          <button
            onClick={handleJoinGame}
            className="h-full rounded bg-violet-500 text-white p-2"
          >
            Join game
          </button>
        )}
      </div>
    </div>
  );
}
