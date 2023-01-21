import React from "react";
import styled from "styled-components";
import { BACKGROUND_COLOR } from "../../color";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

const Reviews = () => {
  return (
    <ReviewContainer>
      <ReviewTitle>리뷰(2)</ReviewTitle>
      <ReviewForm />
      <ReviewItem />
    </ReviewContainer>
  );
};

export default Reviews;

const ReviewContainer = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 10px;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ReviewTitle = styled.div`
  margin-left: 20px;
`;
