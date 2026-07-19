import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgMDaS1YBh8M77xRUL7m9Um_JOU2coQ5Y",
  authDomain: "sajiin-30a62.firebaseapp.com",
  projectId: "sajiin-30a62",
  storageBucket: "sajiin-30a62.firebasestorage.app",
  messagingSenderId: "182705013950",
  appId: "1:182705013950:web:4b308c98fd9b9ad7958aef",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
