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
import { authService, dbService } from "../firebase";
import { useNavigate } from "react-router-dom";
import { BACKGROUND_COLOR, POINT_COLOR } from "../color";
export const user = JSON.parse(localStorage.getItem("User"));

const Mypage = () => {
  const [category, setCategory] = useState("bookmark");
  const [bookmark, setBookmark] = useState([]);
  const [reviews, setReviews] = useState([]);
  const bookmarkCount = bookmark.length;
  const reviewsCount = reviews.length;
  const navigate = useNavigate();

  const logout = () => {
    authService.signOut();
    navigate("/index");
    sessionStorage.clear();
  };

  console.log(user);

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
      <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
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
  margin-top: 100px;
  font-family: "GmarketSans";
`;

const LogoutBtn = styled.button`
  width: 100px;
  height: 37.5px;
  position: absolute;
  top: 30px;
  right: 20px;
  background-color: ${POINT_COLOR};
  border: none;
  border-radius: 50px;
  box-shadow: 1px 1px 1px ${POINT_COLOR};
  text-align: center;
  color: white;
  font-size: 15px;
  font-family: GmarketSans;
  cursor: pointer;
`;

const StyledDivMain = styled.div`
  width: 700px;
  height: 100%;
  left: 225px;
  top: 167px;
  background: ${BACKGROUND_COLOR};
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
