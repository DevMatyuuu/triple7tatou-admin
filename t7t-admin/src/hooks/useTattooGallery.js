import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { tattooGalleryCollection } from "../firebase/firebase";

function useTattooGallery() {
  const [tattooGallery, setTattooGallery] = useState([]);

  useEffect(
    () => {
    const unsubscribe = onSnapshot(tattooGalleryCollection, (snapshot) => {
     setTattooGallery( 
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

  return { tattooGallery };
}
export default useTattooGallery