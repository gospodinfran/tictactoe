import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD-0J29EycNyJeKBU9ryMb6zUjSFZYz1fw',
  authDomain: 'tictactoe-5820a.firebaseapp.com',
  projectId: 'tictactoe-5820a',
  storageBucket: 'tictactoe-5820a.appspot.com',
  messagingSenderId: '206180366886',
  appId: '1:206180366886:web:d9f6be840ad3fb5b07c4e7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
