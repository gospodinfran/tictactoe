import {
  addDoc,
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../lib/firebase';

export default function LoginForm() {
  const [formValue, setFormValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormValue(e.target.value);
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value);
  }

  async function handleFormSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formValue || !passwordValue) return;

    // hash and salt password, can use bcrypt

    const usernamesRef = collection(db, 'usernames');
    const q = query(usernamesRef, where('username', '==', formValue), limit(1));
    const qSnap = await getDocs(q);
    if (qSnap.empty) {
      await addDoc(usernamesRef, {
        username: formValue,
        password: passwordValue,
      });
    } else {
      console.log(qSnap.docs[0].data());
    }
    setFormValue('');
    setPasswordValue('');
  }
  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={formValue}
          onChange={handleFormChange}
          id="username"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={passwordValue}
          id="password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
