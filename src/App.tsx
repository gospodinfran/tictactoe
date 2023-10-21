import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';
//import TicTacToe from './components/TicTacToe';
import './index.css';
import Header from './components/Header';
import useLocalStorage from './customHooks/useLocalStorage';
import GamesMapped, { gameInterface } from './components/GamesMapped';
import Pagination from './components/Pagination';

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

  useEffect(() => {}, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    fetchGames();
  }, [currentPage]);

  async function fetchGames() {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('createdAt'));
    const qSnap = await getDocs(q);
    const gamesData = qSnap.docs.map((game) => game.data());
    setGames(gamesData as gameInterface[]);
  }

  const createNewGame = async () => {
    const gamesRef = collection(db, 'games');
    const newGameTemplate = {
      boardState: ['', '', '', '', '', '', '', '', ''],
      player1: user,
      player2: '',
      player1ToPlay: true,
      winner: '',
      createdAt: serverTimestamp(),
    };
    await addDoc(gamesRef, newGameTemplate);
    setGames((prevGames) => [...prevGames, newGameTemplate as gameInterface]);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((cur) => cur - 1);
    }
  };

  const goToNextPage = () => {
    if (games.length >= GAMES_PER_PAGE) {
      setCurrentPage((cur) => cur + 1);
    }
  };

  const lastIndex = currentPage * GAMES_PER_PAGE;
  const firstIndex = lastIndex - GAMES_PER_PAGE;
  const currentGames = games.slice(firstIndex, lastIndex);

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
      {user && games && (
        <div>
          <GamesMapped
            games={currentGames}
            user={user}
            showOpen={showOpen}
            showInProgress={showInProgress}
            showMyGames={showMyGames}
            setShowOpen={setShowOpen}
            setShowInProgress={setShowInProgress}
            setShowMyGames={setShowMyGames}
          />
          <div className="">
            <button className="border h-10" onClick={goToPreviousPage}>
              Last page
            </button>
            <Pagination
              totalGames={games.length}
              setCurrentPage={setCurrentPage}
            />
            <button className="border h-10" onClick={goToNextPage}>
              Next page
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
