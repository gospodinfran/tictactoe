import { useEffect, useState } from 'react';

export default function useLocalStorage() {
  const [user, setUser] = useState<null | string>(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : null
  );
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return [user, setUser] as [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>
  ];
}
