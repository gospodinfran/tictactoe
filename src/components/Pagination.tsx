import { SetStateAction } from 'react';

export default function Pagination({
  totalGames,
  setCurrentPage,
}: {
  totalGames: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalGames / 10); i++) {
    pages.push(i);
  }
  return (
    <div>
      {pages.map((page) => {
        return (
          <button
            key={page}
            className="border flex"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
