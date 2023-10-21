import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';
import './index.css';
import Header from './components/Header';
import useLocalStorage from './customHooks/useLocalStorage';
import GamesMapped, { gameInterface } from './components/GamesMapped';
import Pagination from './components/Pagination';
import LiveGame from './components/LiveGame';
import Leaderboards from './components/Leaderboards';

function App() {
  const [user, setUser] = useLocalStorage();
  const [register, setRegister] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [games, setGames] = useState<gameInterface[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOpen, setShowOpen] = useState(false);
  const [showInProgress, setShowInProgress] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showMyGames, setShowMyGames] = useState(false);
  const [browseGames, setBrowseGames] = useState(false);
  const [currentGame, setCurrentGame] = useState<null | gameInterface>(null);
  const [showLeaderboards, setShowLeaderboards] = useState(false);

  const GAMES_PER_PAGE = 10;

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const fetchGames = async () => {
    setCurrentGame(null);
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, orderBy('createdAt'));
    const qSnap = await getDocs(q);
    const gamesData = qSnap.docs.map((game) => {
      return {
        ...game.data(),
        id: game.id,
      };
    });
    setGames(gamesData as gameInterface[]);
    setBrowseGames(true);
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    setBrowseGames(false);
  }, [currentGame]);

  useEffect(() => {
    setBrowseGames(false);
    setCurrentGame(null);
  }, [showLeaderboards]);

  const createNewGame = async () => {
    const gamesRef = collection(db, 'games');

    const docRef = doc(gamesRef);

    const newGameTemplate = {
      boardState: ['', '', '', '', '', '', '', '', ''],
      player1: user,
      player2: '',
      player1ToPlay: true,
      completed: false,
      winner: '',
      createdAt: serverTimestamp(),
      id: docRef.id,
    };

    await setDoc(docRef, newGameTemplate);

    setGames((prevGames) => [...prevGames, newGameTemplate as gameInterface]);
  };

  const lastIndex = currentPage * GAMES_PER_PAGE;
  const firstIndex = lastIndex - GAMES_PER_PAGE;
  let filteredGames = showOpen ? games.filter((game) => !game.player2) : games;
  filteredGames = showInProgress
    ? filteredGames.filter((game) => !game.completed)
    : filteredGames;
  filteredGames = showCompleted
    ? filteredGames.filter((game) => game.completed)
    : filteredGames;
  filteredGames = showMyGames
    ? filteredGames.filter(
        (game) => game.player1 === user || game.player2 === user
      )
    : filteredGames;
  const currentGames = filteredGames.slice(firstIndex, lastIndex);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((cur) => cur - 1);
    }
  };

  const goToNextPage = () => {
    if (currentGames.length === GAMES_PER_PAGE) {
      setCurrentPage((cur) => cur + 1);
    }
  };

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        setLoginForm={setLoginForm}
        onFetchGames={fetchGames}
        createGame={createNewGame}
        onShowLeaderboards={setShowLeaderboards}
      />
      <div className="flex flex-col items-center mt-36">
        {user === null && loginForm && (
          <LoginForm
            register={register}
            setRegister={setRegister}
            setUser={setUser}
          />
        )}
      </div>
      <div className="relative" />
      {currentGame && user && (
        <LiveGame gameProperties={currentGame} user={user!} />
      )}
      {user && browseGames && currentGames && (
        <div>
          <GamesMapped
            games={currentGames}
            user={user}
            showOpen={showOpen}
            showInProgress={showInProgress}
            showCompleted={showCompleted}
            setShowCompleted={setShowCompleted}
            showMyGames={showMyGames}
            setShowOpen={setShowOpen}
            setShowInProgress={setShowInProgress}
            setShowMyGames={setShowMyGames}
            setBrowseGames={setBrowseGames}
            setCurrentGame={setCurrentGame}
          />
          <div className="absolute top-[54rem] flex justify-end w-5/6">
            <button className="border h-10 w-24" onClick={goToPreviousPage}>
              Last page
            </button>
            <Pagination
              totalGames={filteredGames.length}
              gamesPerPage={GAMES_PER_PAGE}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
            <button className="border h-10 w-24" onClick={goToNextPage}>
              Next page
            </button>
          </div>
        </div>
      )}
      {showLeaderboards && <Leaderboards />}
    </>
  );
}

export default App;
