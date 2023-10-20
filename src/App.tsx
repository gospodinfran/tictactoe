import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';
import TicTacToe from './components/TicTacToe';
import './index.css';
import Header from './components/Header';
import CreateGame from './components/CreateGame';
import useLocalStorage from './customHooks/useLocalStorage';

function App() {
  const [user, setUser] = useLocalStorage();
  const [register, setRegister] = useState(false);
  const [loginForm, setLoginForm] = useState(true);

  async function getCount() {
    // const countRef = doc(db, 'count', 'first');
    // const countSnap = await getDoc(countRef);
    // if (countSnap.exists()) setCount(countSnap.data().count);
  }

  useEffect(() => {}, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <>
      <Header user={user} setUser={setUser} setLoginForm={setLoginForm} />
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
    </>
  );
}

export default App;
