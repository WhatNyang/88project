// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5xX9z_mcn_bnWdLw5UHC7uSh6FLGW2l0",
  authDomain: "whatnyang-b00f1.firebaseapp.com",
  projectId: "whatnyang-b00f1",
  storageBucket: "whatnyang-b00f1.appspot.com",
  messagingSenderId: "939703503768",
  appId: "1:939703503768:web:86075cc0aa7976e08d39ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
