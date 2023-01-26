import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import MypageContentsReview from "./MypageContentsReview";
import MypageContentsBookmark from "./MypageContentsBookmark";
import { Navigate, useParams } from "react-router-dom";

export default function MypageContents({ category }) {
  const [bookmark, setBookmark] = useState([]);
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("User"));
  // function convertDate(time) {
  //   let dateInMillis = time * 1000;
  //   let date = new Date(dateInMillis);
  //   let myDate = date.toLocaleDateString();
  //   let myTime = date.toLocaleTimeString();
  //   myDate = myDate.replaceAll("/", "-");
  //   return myDate + " " + myTime;
  // }

  const params = useParams();

  useEffect(() => {
    onSnapshot(
      query(
        collection(dbService, "bookmark"),
        orderBy("createdAt", "desc"),
        where("userId", "==", user.uid)
      ),
      (snapshot) => {
        const newBookmark = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookmark(newBookmark);
      }
    );

    onSnapshot(
      query(
        collection(dbService, "reviews"),
        orderBy("createdAt", "desc"),
        where("userId", "==", user.uid)
      ),
      (snapshot) => {
        const newReview = snapshot.docs.map((doc) => ({
          id: doc.id,
          // converted_date: convertDate(doc.date),
          ...doc.data(),
        }));
        setReviews(newReview);
      }
    );
  }, []);

  return (
    <StyledDivThree>
      {category === "bookmark" ? (
        <MypageContentsBookmark category={category} bookmark={bookmark} />
      ) : (
        <MypageContentsReview
          category={category}
          reviews={reviews}
          user={user}
        />
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
