import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase'

export default function useUserLoggedIn() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, photoURL, uid} = user;
        setUser({ email, photoURL, uid});
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);  

  return { user };

}