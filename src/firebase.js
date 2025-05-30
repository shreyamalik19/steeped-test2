import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPXMYTHXn7wlPk5KrxyxEkYIAE_tMZytE",
  authDomain: "steepd-app.firebaseapp.com",
  projectId: "steepd-app",
  storageBucket: "steepd-app.firebasestorage.app",
  messagingSenderId: "931339538828",
  appId: "1:931339538828:web:35662702c1c4cee84806a9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
