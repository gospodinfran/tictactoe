import { addDoc, collection, getDocs, limit, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';
//import TicTacToe from './components/TicTacToe';
import './index.css';
import Header from './components/Header';
import useLocalStorage from './customHooks/useLocalStorage';
import GamesMapped, { gameInterface } from './components/GamesMapped';

function App() {
  const [user, setUser] = useLocalStorage();
  const [register, setRegister] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [games, setGames] = useState<gameInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOpen, setShowOpen] = useState(false);
  const [showInProgress, setShowInProgress] = useState(false);
  const [showMyGames, setShowMyGames] = useState(false);

  const GAMES_PER_PAGE = 10;

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const fetchGames = async () => {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, limit(GAMES_PER_PAGE));
    const qSnap = await getDocs(q);
    const gamesData = qSnap.docs.map((game) => game.data());
    setGames(gamesData as gameInterface[]);
  };

  const createNewGame = async () => {
    const gamesRef = collection(db, 'games');
    const newGameTemplate = {
      boardState: ['', '', '', '', '', '', '', '', ''],
      player1: user,
      player2: '',
      player1ToPlay: true,
      winner: '',
    };
    await addDoc(gamesRef, newGameTemplate);
    setGames((prevGames) => [...prevGames, newGameTemplate as gameInterface]);
  };

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        setLoginForm={setLoginForm}
        onFetchGames={fetchGames}
        createGame={createNewGame}
      />
      <div className="flex flex-col items-center mt-36">
        {user === null && loginForm && (
          <LoginForm
            register={register}
            setRegister={setRegister}
            setUser={setUser}
          />
        )}
        {user && (
          <h1 className="text-3xl">
            Welcome {`${user[0].toLocaleUpperCase()}${user.slice(1)}`}!
          </h1>
        )}
      </div>
      <div className="mt-20" />
      {user && (
        <GamesMapped
          games={games}
          showOpen={showOpen}
          showInProgress={showInProgress}
          showMyGames={showMyGames}
          setShowOpen={setShowOpen}
          setShowInProgress={setShowInProgress}
          setShowMyGames={setShowMyGames}
        />
      )}
    </>
  );
}

export default App;
