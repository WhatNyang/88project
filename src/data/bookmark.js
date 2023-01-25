import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../firebase";

// Create
export const addBookmark = async (newData) => {
  await addDoc(collection(dbService, "bookmark"), newData);
};

// Read

// Delete
export const deleteBookmark = async (id) => {
  await deleteDoc(doc(dbService, "bookmark", id));
};
