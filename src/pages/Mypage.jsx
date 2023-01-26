import { useEffect, useState } from "react";
import styled from "styled-components";
import MypageButton from "../components/mypage/MypageButton";
import MypageProfile from "../components/mypage/MypageProfile";
import MypageContentsBookmark from "../components/mypage/MypageContentsBookmark";
import MypageContentsReview from "../components/mypage/MypageContentsReview";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { dbService } from "../firebase";

const Mypage = () => {
  const [category, setCategory] = useState("bookmark"); // review, bookmark
  const [bookmark, setBookmark] = useState([]);
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("User"));
  const bookmarkCount = bookmark.length;
  const reviewsCount = reviews.length;
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
          ...doc.data(),
        }));
        setReviews(newReview);
      }
    );
  }, []);

  return (
    <StyledDivContainer>
      <StyledDivMain>
        <MypageProfile
          bookmarkCount={bookmarkCount}
          reviewsCount={reviewsCount}
        />
        <MypageButton category={category} setCategory={setCategory} />
        <Contents>
          {category === "bookmark" ? (
            <MypageContentsBookmark category={category} bookmark={bookmark} />
          ) : (
            <MypageContentsReview
              category={category}
              reviews={reviews}
              user={user}
            />
          )}
        </Contents>
      </StyledDivMain>
    </StyledDivContainer>
  );
};

const StyledDivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* height: 100%; */
  margin-top: 100px;
`;
const StyledDivMain = styled.div`
  width: 700px;
  height: 100%;
  left: 225px;
  top: 167px;
  background: #fef6ec;
  border-radius: 30px;
  padding: 50px;
`;
const Contents = styled.div`
  padding: 20px;
  border-radius: 30px;
  background-color: #f5f5f5;
  flex-direction: column;
`;

export default Mypage;
