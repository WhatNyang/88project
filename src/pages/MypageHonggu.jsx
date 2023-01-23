import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import ReviewCardForm from "../components/mypage/ReviewCardForm";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../firebase";
import ReviewWriteCardForm from "../components/mypage/ReviewWriteCardForm";

const MypageHonggu = () => {
  const [category, setCategory] = useState("review"); // review, bookmark
  const [form, setForm] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(dbService, "foam"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setForm(newPosts);
      }
    );
  }, []);

  return (
    <StyledDivContainer>
      <StyledDivMain>
        {/* MypageProfile 관련된 것 */}
        <StyledDivOne>
          <div></div>
          <div></div>
          <ProfileList>
            <ProfileNickname>닉네임</ProfileNickname>
            <ProfileListLikeReview>
              <ProfileListLike>
                <div></div>
                <div>관심</div>
                <div>0</div>
              </ProfileListLike>
              <ProfileListReview>
                <div>리뷰</div>
                <div>0</div>
              </ProfileListReview>
            </ProfileListLikeReview>
          </ProfileList>
          <div></div>
        </StyledDivOne>
        {/* MypageProfile 관련된 것 */}
        <StyledDivTwo>
          <button
            onClick={() => {
              setCategory("review");
            }}
            style={{
              backgroundColor: category === "review" ? "#e37b58" : "lightgrey",
              color: category === "review" ? "white" : null,
            }}
          >
            리뷰
          </button>
          <button
            onClick={() => {
              setCategory("bookmark");
            }}
            style={{
              backgroundColor:
                category === "bookmark" ? "#e37b58" : "lightgrey",
              color: category === "bookmark" ? "white" : null,
            }}
          >
            찜
          </button>
        </StyledDivTwo>
        <ReviewWriteCardForm
          category={category}
          form={form}
          setForm={setForm}
        />
        <StyledDivThree>
          <ReviewCardForm category={category} form={form} />
        </StyledDivThree>
      </StyledDivMain>
    </StyledDivContainer>
  );
};

const StyledDivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 100px;
`;
const StyledDivMain = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.1fr 1fr;
  grid-template-columns: repeat(1, 1fr);
  width: 700px;
  height: 100%;
  left: 225px;
  top: 167px;
  background: #fef6ec;
  border-radius: 30px;
  padding: 50px;
`;

const StyledDivOne = styled.div`
  display: grid;
  grid-template-columns: 10% 20% 5% 55% 10%;
`;

const ProfileList = styled.div`
  display: grid;
  grid-template-rows: 40% 60%;
`;
const ProfileNickname = styled.div`
  text-align: left;
  height: 50px;
  line-height: 50px;
  font-size: large;
  font-weight: 700;
`;
const ProfileListLikeReview = styled.div`
  display: grid;
  grid-template-columns: 15% 15% 60%;
`;

const ProfileListLike = styled.div`
  text-align: center;
  font-size: small;
`;
const ProfileListReview = styled.div`
  font-size: small;
  text-align: center;
`;
// 버튼항목
const StyledDivTwo = styled.div`
  margin-top: 30px;
  margin-bottom: 15px;

  button:nth-child(1) {
    margin-left: 10px;
    width: 100px;
    height: 40px;
    font-size: 20px;
    background: #e37b58;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    &:hover {
      color: white;
    }
  }

  button:nth-child(2) {
    margin-left: 10px;
    width: 100px;
    height: 40px;
    background: #ffffff;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    font-size: 20px;
    &:hover {
      color: white;
    }
  }
`;

const StyledDivThree = styled.div`
  padding: 20px;
  border-radius: 30px;
  background-color: #f5f5f5;
  flex-direction: column;
`;

export default MypageHonggu;
