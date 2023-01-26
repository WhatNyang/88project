import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // 유진
  // apiKey: "AIzaSyBXYCqBiZDv7uLsB_hLmFQLFteRpRpo3nk",
  // authDomain: "whatyang-9c03d.firebaseapp.com",
  // projectId: "whatyang-9c03d",
  // storageBucket: "whatyang-9c03d.appspot.com",
  // messagingSenderId: "721665672842",
  // appId: "1:721665672842:web:36d9ffbe3fba6246a6cf73",
  // measurementId: "G-0EMJKTT5KF",

  //홍구
  // apiKey: "AIzaSyB5xX9z_mcn_bnWdLw5UHC7uSh6FLGW2l0",
  // authDomain: "whatnyang-b00f1.firebaseapp.com",
  // projectId: "whatnyang-b00f1",
  // storageBucket: "whatnyang-b00f1.appspot.com",
  // messagingSenderId: "939703503768",
  // appId: "1:939703503768:web:86075cc0aa7976e08d39ed",

  // 시윤
  apiKey: "AIzaSyBxwMsO8gzmNCM4MT7MlbhdOMQID5ATtYA",
  authDomain: "rn-todolist-94a8d.firebaseapp.com",
  projectId: "rn-todolist-94a8d",
  storageBucket: "rn-todolist-94a8d.appspot.com",
  messagingSenderId: "412199444502",
  appId: "1:412199444502:web:b5b06bdc61f234a843d537",
  measurementId: "G-WM0WC6YDE3",
};

export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storage = getStorage(app);
