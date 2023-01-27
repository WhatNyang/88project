import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../firebase";

// Create

// Read

// Update

// Delete
export const deletereview = async (id) => {
  await deleteDoc(doc(dbService, "reviews", id));
};
