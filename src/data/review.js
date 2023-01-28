import { deleteDoc, doc } from "firebase/firestore";
import { dbService } from "../firebase";

// Delete
export const deletereview = async (id) => {
  await deleteDoc(doc(dbService, "reviews", id));
};
