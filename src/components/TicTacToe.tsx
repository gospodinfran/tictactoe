import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(['', '', '', 'O', 'O', '', 'X', 'X', 'X']);
  return (
    <div className="flex flex-col justify-center items-center hover:cursor-pointer">
      <div className="grid grid-cols-3">
        {board.map((letter, index) => {
          return (
            <div
              className={`h-32 w-32 border-2 border-gray-300 flex justify-center items-center text-6xl ${
                index % 3 === 1 ? 'border-l-0 border-r-0' : ''
              } ${
                index > 2 && index < 6 ? 'border-t-0 border-b-0' : ''
              } hover:border-cyan-300`}
              key={index}
            >
              {letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}
