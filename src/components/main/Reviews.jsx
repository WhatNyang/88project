import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../../firebase";
import { BACKGROUND_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const onNavigate = (item) => {
    navigate(`/detail/${item.detailId}`, { state: item });
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "reviews"),
      orderBy("createdAt", "desc")
    );
    const data = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReviews(newData);
    });
    return data;
  }, []);

  console.log(reviews);

  return (
    <>
      {reviews?.map((item) => (
        <ReviewCard key={item.id} onClick={() => onNavigate(item)}>
          <ReviewInfo>
            <ReviewInfoKeyword>{item.userNickName}</ReviewInfoKeyword>님은{" "}
            <ReviewInfoKeyword>{item.place_name}</ReviewInfoKeyword>에 대해
            이렇게 평가하셨어요.
          </ReviewInfo>
          <ReviewContent>"{item.contents}"</ReviewContent>
        </ReviewCard>
      ))}
    </>
  );
};

export default Reviews;

const ReviewCard = styled.div`
  width: 90%;
  height: auto;
  border-radius: 10px;
  background-color: ${BACKGROUND_COLOR};
  padding: 1px 15px 15px 15px;
  margin-bottom: 15px;
`;

const ReviewInfo = styled.p`
  font-size: 13px;
  font-weight: 300;
`;

const ReviewInfoKeyword = styled.span`
  font-weight: 500;
`;

const ReviewContent = styled.div`
  font-size: 15px;
`;
