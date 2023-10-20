import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';
import TicTacToe from './components/TicTacToe';
import './index.css';
import Header from './components/Header';
import CreateGame from './components/CreateGame';
import useLocalStorage from './customHooks/useLocalStorage';
import GamesMapped from './components/GamesMapped';

function App() {
  const [user, setUser] = useLocalStorage();
  const [register, setRegister] = useState(false);
  const [loginForm, setLoginForm] = useState(true);
  const [games, setGames] = useState<Object[]>([]);

  useEffect(() => {}, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const fetchGames = async () => {
    const gamesRef = collection(db, 'games');
    const q = query(gamesRef, limit(10));
    const qSnap = await getDocs(q);
    const cleanedGames = qSnap.docs.map((game) => game.data());
    setGames(cleanedGames);
  };

  useEffect(() => {
    console.log(games);
  }, [games]);

  return (
    <>
      <Header
        user={user}
        setUser={setUser}
        setLoginForm={setLoginForm}
        onFetchGames={fetchGames}
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
      {user && <CreateGame />}
      {user && <GamesMapped games={games} />}
    </>
  );
}

export default App;
