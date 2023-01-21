import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9KbUAYNTLg74ElHaLgN-ZBFmrNrKKlcg",
  authDomain: "tinder-by-aman.firebaseapp.com",
  projectId: "tinder-by-aman",
  storageBucket: "tinder-by-aman.appspot.com",
  messagingSenderId: "763043596167",
  appId: "1:763043596167:web:68f050a7703be1a1c2f522",
  measurementId: "G-2S5EFNLM7W",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
