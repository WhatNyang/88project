import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD3Pl_AEqHfg3PXMXE1xpdO2A7cIzoyiXI",
  authDomain: "whatnyang-e238d.firebaseapp.com",
  projectId: "whatnyang-e238d",
  storageBucket: "whatnyang-e238d.appspot.com",
  messagingSenderId: "1068008874153",
  appId: "1:1068008874153:web:1dfaa4bc0656439c7f09b8",
  measurementId: "G-FXH46TT0G1",
};

export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storage = getStorage(app);
