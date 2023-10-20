export interface gameInterface {
  boardState: string[];
  player1: string;
  player2: string;
  player1ToPlay: boolean;
  winner: string;
  id: number;
}

export default function GamesMapped({ games }: { games: gameInterface[] }) {
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center w-full mx-12">
        {games.map((game) => {
          return (
            <div className="w-full border" key={game.id}>
              <p>{`${game.player2 ? '2/2' : '1/2'} `}players.</p>
              {game.player1}
            </div>
          );
        })}
      </div>
    </div>
  );
}
