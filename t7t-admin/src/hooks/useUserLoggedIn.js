import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';

export default function useUserLoggedIn() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const { email, photoURL, uid } = userAuth;
        setUser({ email, photoURL, uid });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);  

  return { user, setUser, loading };
}
