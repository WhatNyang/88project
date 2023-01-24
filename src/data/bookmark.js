import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { dbService } from "../firebase";

// Create
export const addBookmark = async (newData) => {
  await addDoc(collection(dbService, "bookmark"), newData);
};

// Read
export const getBookmark = async () => {
  await getDoc(doc(dbService, "bookmark"));
};

// Delete
export const deleteBookmark = async (e, id) => {
  await deleteDoc(doc(dbService, "bookmark", id));
};
