import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import ReviewCardForm from "./ReviewCardForm";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../../firebase";
// import ReviewWriteCardForm from "./ReviewWriteCardForm";

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
    <>
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
            backgroundColor: category === "bookmark" ? "#e37b58" : "lightgrey",
            color: category === "bookmark" ? "white" : null,
          }}
        >
          찜
        </button>
      </StyledDivTwo>
      {/* <ReviewWriteCardForm category={category} form={form} setForm={setForm} /> */}
      <StyledDivThree>
        <ReviewCardForm category={category} form={form} />
      </StyledDivThree>
    </>
  );
};

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
