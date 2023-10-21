import { Timestamp } from 'firebase/firestore';
import Checkbox from './Checkbox';
import GameDisplay from './GameDisplay';

export interface gameInterface {
  boardState: string[];
  player1: string;
  player2: string;
  player1ToPlay: boolean;
  completed: boolean;
  winner: string;
  createdAt: Timestamp;
  id: string;
}

interface gamesMappedProps {
  games: gameInterface[];
  user: string;
  showOpen: boolean;
  showInProgress: boolean;
  showCompleted: boolean;
  showMyGames: boolean;
  setShowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMyGames: React.Dispatch<React.SetStateAction<boolean>>;
  setBrowseGames: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentGame: React.Dispatch<React.SetStateAction<gameInterface | null>>;
}

export default function GamesMapped({
  games,
  user,
  showOpen,
  showInProgress,
  showCompleted,
  showMyGames,
  setShowOpen,
  setShowInProgress,
  setShowCompleted,
  setShowMyGames,
  setBrowseGames,
  setCurrentGame,
}: gamesMappedProps) {
  function handleOpenGame(game: gameInterface) {
    setBrowseGames(false);
    setCurrentGame(game);
  }

  function handleOpenButton() {
    setShowCompleted(false);
    setShowOpen((prev) => !prev);
  }

  function handleProgressButton() {
    setShowCompleted(false);
    setShowInProgress((prev) => !prev);
  }

  function handleCompletedButton() {
    setShowOpen(false);
    setShowInProgress(false);
    setShowCompleted((prev) => !prev);
  }

  function handleMyGamesButton() {
    setShowMyGames((prev) => !prev);
  }

  return (
    <div className="">
      <div className="flex items-center justify-center mb-10">
        <h1 className="text-3xl">
          Welcome {`${user[0].toLocaleUpperCase()}${user.slice(1)}`}!
        </h1>
      </div>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl mb-5">Games</h1>
        <div className="flex gap-5 mb-6">
          <Checkbox
            name="Open"
            checked={showOpen}
            onChange={handleOpenButton}
          />
          <Checkbox
            name="In progress"
            checked={showInProgress}
            onChange={handleProgressButton}
          />
          <Checkbox
            name="Completed"
            checked={showCompleted}
            onChange={handleCompletedButton}
          />
          <Checkbox
            name="My games"
            checked={showMyGames}
            onChange={handleMyGamesButton}
          />
        </div>
        {games.map((game) => (
          <GameDisplay
            key={game.id}
            handleOpenGame={handleOpenGame}
            game={game}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
