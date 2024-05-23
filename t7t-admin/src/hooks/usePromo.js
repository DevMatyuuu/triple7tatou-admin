import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { promoCollection } from "../firebase/firebase";

function usePromo() {
  const [promo, setPromo] = useState([]);

  useEffect(
    () => {
    const unsubscribe = onSnapshot(promoCollection, (snapshot) => {
     setPromo( 
      snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
     );
  });
  return () => unsubscribe();
},
  []
);

  return { promo };
}
export default usePromo