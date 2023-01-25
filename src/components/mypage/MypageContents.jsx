import { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../../firebase";
import MypageContentsReview from "./MypageContentsReview";
import MypageContentsBookmark from "./MypageContentsBookmark";

export default function MypageContents({ category }) {
  const [bookmark, setBookmark] = useState([]);
  const [review, setReview] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(dbService, "bookmark"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const newBookmark = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookmark(newBookmark);
      }
    );

    onSnapshot(
      query(collection(dbService, "review"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const newReview = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReview(newReview);
      }
    );
  }, []);

  return (
    <StyledDivThree>
      {category === "bookmark" ? (
        <MypageContentsBookmark category={category} bookmark={bookmark} />
      ) : (
        <MypageContentsReview category={category} review={review} />
      )}
    </StyledDivThree>
  );
}

const StyledDivThree = styled.div`
  padding: 20px;
  border-radius: 30px;
  background-color: #f5f5f5;
  flex-direction: column;
`;
