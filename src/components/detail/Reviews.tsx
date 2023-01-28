import styled from "styled-components";
import { BACKGROUND_COLOR } from "../../color";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

const Reviews = () => {
  return (
    <StyledContainer>
      <StyledTitle>리뷰</StyledTitle>
      <ReviewForm />
      <ReviewItem />
    </StyledContainer>
  );
};

export default Reviews;

const StyledContainer = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 10px;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "GmarketSans";
`;

const StyledTitle = styled.div`
  margin: 2px 0 -10px 22px;
`;
