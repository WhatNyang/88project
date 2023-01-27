import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { dbService } from "../firebase";

// Create
export const addBookmark = async (newData) => {
  await addDoc(collection(dbService, "bookmark"), newData);
};

// Read

// Update

// Delete
export const deleteBookmark = async (id) => {
  await deleteDoc(doc(dbService, "bookmark", id));
};
