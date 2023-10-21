import {
  collection,
  doc,
  getDoc,
  increment,
  updateDoc,
} from 'firebase/firestore';
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
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    refreshState();
    const intervalId = setInterval(() => {
      if (properties.id) {
        refreshState();
      }
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
          updateWinner(player1);
          return;
        } else if (boardState[a] === 'O') {
          updateWinner(player2);
          return;
        }

        return;
      }
    }
  }, [properties.boardState]);

  async function refreshState() {
    console.log('refreshing');
    const gameRef = doc(db, 'games', properties.id!);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
      const updated = gameSnap.data() as gameInterface;
      setProperties(updated);
    }
  }

  async function updateWinner(player: string) {
    if (completed) return;
    const gameRef = doc(db, 'games', properties.id!);
    const leaderboardsRef = collection(db, 'leaderboards');
    const playerLeaderboardsDoc = doc(leaderboardsRef, user);
    await updateDoc(gameRef, { winner: player });
    await updateDoc(playerLeaderboardsDoc, { wins: increment(1) });
    setProperties((prev) => ({
      ...prev,
      winner: player,
    }));
    setCompleted(true);
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
    if (user !== properties.player1 && user !== properties.player2) return;

    if (!properties.id) {
      console.log('properties ID is undefined');
      return;
    }
    const currentPlayer = properties.player1ToPlay
      ? properties.player1
      : properties.player2;
    if (user !== currentPlayer) return;

    const newBoardState = [...properties.boardState];
    if (newBoardState[tileIndex] !== '' || played) return;

    setPlayed(true);
    newBoardState[tileIndex] = currentPlayer === properties.player1 ? 'X' : 'O';

    const gameRef = doc(db, 'games', properties.id!);
    await updateDoc(gameRef, {
      boardState: newBoardState,
      player1ToPlay: !properties.player1ToPlay,
    });

    setProperties((prev) => ({
      ...prev,
      boardState: newBoardState,
      player1ToPlay: !prev.player1ToPlay,
    }));

    refreshState();
    setPlayed(false);
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-12">
        <h1 className="text-4xl">
          {properties.player2
            ? `${properties.player1}(X) vs ${properties.player2}(O)`
            : 'Waiting for another player!'}
        </h1>
        <div>
          <TicTacToe
            board={properties.boardState}
            onTileClick={handleTileClick}
          />
        </div>

        {!properties.winner && (
          <div className="text-xl">
            {properties.player2
              ? properties.player1ToPlay && properties.player1 === user
                ? 'Your turn!'
                : properties.player1ToPlay
                ? `${properties.player1}'s turn to play. Wait for your opponent to make a move.`
                : properties.player2 === user
                ? 'Your turn!'
                : `${properties.player2}'s turn to play. Wait for your opponent to make a move.`
              : `${properties.player1} is waiting for an opponent.`}
          </div>
        )}
        {!properties.player2 && (
          <button
            onClick={handleJoinGame}
            className="h-full rounded bg-violet-500 text-white p-2"
          >
            Join game
          </button>
        )}
        {properties.winner && (
          <h1 className="text-4xl">{properties.winner} has won!</h1>
        )}
      </div>
    </div>
  );
}
