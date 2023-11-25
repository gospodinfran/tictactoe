import React, { useState } from 'react';
import { gameInterface } from './GamesMapped';

interface HeaderProps {
  user: null | string;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  setLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  onFetchGames: () => void;
  createGame: () => Promise<void>;
  onShowLeaderboards: React.Dispatch<React.SetStateAction<boolean>>;
  setBrowseGames: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentGame: React.Dispatch<React.SetStateAction<gameInterface | null>>;
}

export default function Header({
  user,
  setUser,
  setLoginForm,
  onFetchGames,
  createGame,
  onShowLeaderboards,
  setBrowseGames,
  setCurrentGame,
}: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  function handleMouseEnter() {
    setDropdownOpen(true);
  }

  function handleMouseLeave() {
    setDropdownOpen(false);
  }

  function handleLeaderboardsButton() {
    setBrowseGames(false);
    setCurrentGame(null);
    onShowLeaderboards(true);
  }

  return (
    <div className="h-16 bg-violet-600 text-white text-xl shadow-xl flex justify-between items-center mb-16 px-6 rounded-b-3xl">
      {user && (
        <div className="ml-5 text-xl flex gap-10 items-center">
          <div className="text-2xl">Tic-Tac-Toe</div>
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={onFetchGames}
              className="h-14 border-transparent border-b-[3px] hover:border-white"
            >
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
                <button
                  className="h-full"
                  onClick={() => {
                    createGame();
                  }}
                >
                  Create new game
                </button>
              </li>
            </ul>
          </div>
          <button
            className="h-14 border-transparent border-b-[3px] hover:border-white"
            onClick={handleLeaderboardsButton}
          >
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
