import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxwMsO8gzmNCM4MT7MlbhdOMQID5ATtYA",
  authDomain: "rn-todolist-94a8d.firebaseapp.com",
  projectId: "rn-todolist-94a8d",
  storageBucket: "rn-todolist-94a8d.appspot.com",
  messagingSenderId: "412199444502",
  appId: "1:412199444502:web:b5b06bdc61f234a843d537",
  measurementId: "G-WM0WC6YDE3",
};

// export const storage = getStorage(app);
const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
