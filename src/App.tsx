import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';
import TicTacToe from './components/TicTacToe';
import './index.css';
import Header from './components/Header';

function App() {
  const [user, setUser] = useState<null | string>(null);
  const [register, setRegister] = useState(false);
  const [loginForm, setLoginForm] = useState(false);

  async function getCount() {
    // const countRef = doc(db, 'count', 'first');
    // const countSnap = await getDoc(countRef);
    // if (countSnap.exists()) setCount(countSnap.data().count);
  }

  async function getUsers() {
    const headers = { Authorization: 'Bearer spona' };
    fetch('https://tictactoe.aboutdream.io/users/', {
      method: 'POST',
      headers: headers,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(JSON.stringify(err)));
  }

  useEffect(() => {
    //getUsers();
  }, []);

  return (
    <div className="font-roboto">
      <Header user={user} setUser={setUser} setLoginForm={setLoginForm} />
      <div className="flex flex-col items-center mt-36">
        {user === null && loginForm && (
          <LoginForm
            register={register}
            setRegister={setRegister}
            setUser={setUser}
          />
        )}
      </div>
      {/*<TicTacToe />*/}
    </div>
  );
}

export default App;
