import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-3">
        {board.map((letter, index) => {
          return (
            <div
              className="h-16 w-16 border flex justify-center items-center"
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
