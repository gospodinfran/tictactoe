import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(['X', '', '', '', '', '', '', '', 'O']);
  return (
    <div className="flex flex-col justify-center">
      <div className="">
        {board.map((piece, index) => {
          return (
            <div className="h-6 w-6 bg-red-300" key={index}>
              {piece}
            </div>
          );
        })}
      </div>
    </div>
  );
}
