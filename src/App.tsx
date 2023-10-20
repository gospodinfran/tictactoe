import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';
import TicTacToe from './components/TicTacToe';

function App() {
  const [count, setCount] = useState<number>();

  async function getCount() {
    const countRef = doc(db, 'count', 'first');
    const countSnap = await getDoc(countRef);
    if (countSnap.exists()) setCount(countSnap.data().count);
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
    getUsers();
  }, []);

  return (
    <>
      <LoginForm />
      {/*<TicTacToe />*/}
    </>
  );
}

export default App;
