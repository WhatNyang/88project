// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXYCqBiZDv7uLsB_hLmFQLFteRpRpo3nk",
  authDomain: "whatyang-9c03d.firebaseapp.com",
  projectId: "whatyang-9c03d",
  storageBucket: "whatyang-9c03d.appspot.com",
  messagingSenderId: "721665672842",
  appId: "1:721665672842:web:36d9ffbe3fba6246a6cf73",
  measurementId: "G-0EMJKTT5KF",
};

const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
