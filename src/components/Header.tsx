import { useState } from 'react';

interface HeaderProps {
  user: null | string;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  onFetchGames: () => void;
}

export default function Header({
  user,
  setUser,
  setLoginForm,
  onFetchGames,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function handleMouseEnter() {
    setDropdownOpen(true);
  }

  function handleMouseLeave() {
    setDropdownOpen(false);
  }

  return (
    <div className="h-14 bg-violet-600 text-white text-xl shadow-xl flex justify-between items-center mb-16 rounded-b-3xl">
      {user && (
        <div className="ml-5 text-xl flex gap-10 items-center">
          <div className="text-2xl">Tic-Tac-Toe</div>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="h-14 border-transparent border-b-[3px] hover:border-white">
              Games
            </button>
            <ul
              className={`absolute flex justify-evenly items-center w-60 h-14 bg-violet-600 text-xl shadow-xl rounded-b-xl ${
                dropdownOpen ? 'block' : 'hidden'
              }`}
            >
              <li className="h-14 hover:text-orange-400 hover:cursor-pointer">
                <button className="h-full" onClick={onFetchGames}>
                  All Games
                </button>
              </li>
              <li className="h-full hover:text-orange-400 hover:cursor-pointer">
                <button className="h-full">Create a game</button>
              </li>
            </ul>
          </div>
          <button className="h-14 border-transparent border-b-[3px] hover:border-white">
            Leaderboards
          </button>
        </div>
      )}
      {user ? (
        <button className="mr-6" onClick={() => setUser(null)}>
          Log out
        </button>
      ) : (
        <button className="mr-6" onClick={() => setLoginForm(true)}>
          Login
        </button>
      )}
    </div>
  );
}
