import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7urirbxoXBsC8h7DHN1LDxa1IDoei4MM",
  authDomain: "fir-dd60a.firebaseapp.com",
  projectId: "fir-dd60a",
  storageBucket: "fir-dd60a.appspot.com",
  messagingSenderId: "487503040464",
  appId: "1:487503040464:web:c2de2dc22f763be3bbb3d5",
};

// export const storage = getStorage(app);
const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
