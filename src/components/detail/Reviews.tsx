import styled from "styled-components";
import { BACKGROUND_COLOR } from "../../color";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

const Reviews = () => {
  return (
    <StyledContainer>
      <StyledTitle>후기</StyledTitle>
      <ReviewForm />
      <ReviewItem />
    </StyledContainer>
  );
};

export default Reviews;

const StyledContainer = styled.div`
  width: 750px;
  margin: 0 auto;
  padding: 30px;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "GmarketSans";
`;

const StyledTitle = styled.div`
  margin: 10px 0 0 20px;
  font-weight: 500;
`;
