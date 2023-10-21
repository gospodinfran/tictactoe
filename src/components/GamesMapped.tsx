import Checkbox from './Checkbox';

export interface gameInterface {
  boardState: string[];
  player1: string;
  player2: string;
  player1ToPlay: boolean;
  winner: string;
}

interface gamesMappedProps {
  games: gameInterface[];
  showOpen: boolean;
  showInProgress: boolean;
  showMyGames: boolean;
  setShowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowInProgress: React.Dispatch<React.SetStateAction<boolean>>;
  setShowMyGames: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GamesMapped({
  games,
  showOpen,
  showInProgress,
  showMyGames,
  setShowOpen,
  setShowInProgress,
  setShowMyGames,
}: gamesMappedProps) {
  return (
    <div className="">
      {games && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl mb-8">Games</h1>
          <div className="flex gap-4">
            <Checkbox
              name="Open"
              checked={showOpen}
              onChange={() => setShowOpen((prev) => !prev)}
            />
            <Checkbox
              name="In progress"
              checked={showInProgress}
              onChange={() => setShowInProgress((prev) => !prev)}
            />
            <Checkbox
              name="My games"
              checked={showMyGames}
              onChange={() => setShowMyGames((prev) => !prev)}
            />
          </div>
          {games.map((game, index) => {
            return (
              <div className="w-2/3 border flex" key={index}>
                <div>{`${game.player2 ? '2/2' : '1/2'} `}players.</div>
                {`${game.player1}`}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
