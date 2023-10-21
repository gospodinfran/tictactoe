import { doc, updateDoc } from 'firebase/firestore';
import { gameInterface } from './GamesMapped';
import TicTacToe from './TicTacToe';
import { db } from '../../lib/firebase';
import { useEffect, useState } from 'react';

interface LiveGameInterface {
  gameProperties: gameInterface;
  user: string;
}

export default function LiveGame({ gameProperties, user }: LiveGameInterface) {
  const [properties, setProperties] = useState<gameInterface>(gameProperties);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const { boardState, player1, player2 } = properties;
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        if (boardState[a] === 'X') {
          console.log(`${player1} has won!`);
          updateWinner();
          return;
        } else if (boardState[a] === 'O') {
          console.log(`${player2} has won!`);
          updateWinner();
          return;
        }

        return;
      }
    }
  }, [properties.boardState]);

  async function updateWinner() {
    const gameRef = doc(db, 'games', properties.id!);
    await updateDoc(gameRef, { winner: user });
    setProperties((prev) => ({
      ...prev,
      winner: user,
    }));
  }

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

  async function handleTileClick(tileIndex: number) {
    // check if user is in this game
    if (!(user === properties.player1 || user === properties.player2)) return;

    if (
      (properties.player1ToPlay && user === properties.player1) ||
      (!properties.player1ToPlay && user === properties.player2)
    ) {
      // can make a move
      const gameRef = doc(db, 'games', properties.id!);
      const currentBoardState = properties.boardState;
      if (currentBoardState[tileIndex] === '' && !played) {
        setPlayed(true);
        currentBoardState[tileIndex] = properties.player1ToPlay ? 'X' : 'O';
        await updateDoc(gameRef, { boardState: currentBoardState });
        setProperties((prev) => ({
          ...prev,
          player1ToPlay: properties.player1 === user ? true : false,
          boardState: currentBoardState,
        }));
        setPlayed(false);
      }
    }
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
