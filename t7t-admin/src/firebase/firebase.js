import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDMYGbLry-rMMSJeaFrP6vlazcaomo2wOE",
  authDomain: "triple7tatou.firebaseapp.com",
  projectId: "triple7tatou",
  storageBucket: "triple7tatou.appspot.com",
  messagingSenderId: "401146497015",
  appId: "1:401146497015:web:31d79dbf885663ce1990f2"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app)
export const auth = getAuth();
export const storage = getStorage();

export const tattooGalleryCollection = collection(db, 'tattooGallery');
export const piercingGalleryCollection = collection(db, 'piercingGallery');
export const promoCollection = collection(db, 'promo');