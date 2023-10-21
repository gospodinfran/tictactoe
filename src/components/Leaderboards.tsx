import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';

interface userProps {
  wins: number;
  losses: number;
  username: string;
}

export default function Leaderboards() {
  const [leaderboards, setLeaderboards] = useState<userProps[]>([]);
  useEffect(() => {
    fetchLeaderboards();
  }, []);

  async function fetchLeaderboards() {
    const leaderboardsRef = collection(db, 'leaderboards');
    const q = query(leaderboardsRef, limit(20), orderBy('wins', 'desc'));
    const qSnap = await getDocs(q);
    const leaderboardsData = qSnap.docs.map((doc) => {
      return {
        ...doc.data(),
        username: doc.id,
      };
    });
    setLeaderboards(leaderboardsData as userProps[]);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-16">Tic-Tac-Toe Leaderboards</h1>
      <div className="flex flex-col w-1/3">
        {leaderboards.map((user) => {
          return (
            <div className="flex justify-between items-center border p-4">
              <h2>{user.username}</h2>
              <div>
                <div>Wins: {user.wins}</div>
                <div>Losses: {user.losses}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
