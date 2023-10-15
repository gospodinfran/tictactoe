import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import LoginForm from './components/LoginForm';

function App() {
  const [count, setCount] = useState<number>();

  async function getCount() {
    const countRef = doc(db, 'count', 'first');
    const countSnap = await getDoc(countRef);
    if (countSnap.exists()) setCount(countSnap.data().count);
  }

  useEffect(() => {
    getCount();
  }, []);
  function handleButtonClick() {}

  return (
    <>
      <LoginForm />
      <button onClick={handleButtonClick}>Increase count</button>
      {count ? count : ''}
    </>
  );
}

export default App;
