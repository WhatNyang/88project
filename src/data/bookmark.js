import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../firebase";

export const addBookmark = async (newData) => {
  await addDoc(collection(dbService, "bookmark"), newData);
};

export const deleteBookmark = async (id) => {
  await deleteDoc(doc(dbService, "bookmark", id));
};
