import { SetStateAction } from 'react';

export default function Pagination({
  totalGames,
  gamesPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalGames: number;
  gamesPerPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="flex">
      {pages.map((page) => {
        return (
          <button
            key={page}
            className={`border h-10 w-10 ${
              currentPage === page ? 'bg-cyan-400' : ''
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
