import React from "react";
import styled from "styled-components";

const ReviewItem = () => {
  return (
    <>
      <ItemBox>
        <StyledPhoto>사진</StyledPhoto>
        <ContentBox>
          <ReviewInfoBox>
            <StyledNickname>닉네임</StyledNickname>
            <CreateDate>2023-01-02</CreateDate>
          </ReviewInfoBox>
          <ReviewContent>리뷰내용...</ReviewContent>
        </ContentBox>
      </ItemBox>
    </>
  );
};

export default ReviewItem;

const ItemBox = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 20px;
  display: flex;
`;
const ContentBox = styled.div``;
const ReviewInfoBox = styled.div`
  display: flex;
`;
const ReviewContent = styled.div`
  margin: 20px;
  margin-top: 0;
`;
const StyledPhoto = styled.div`
  margin: 20px;
  width: 70px;
  height: 70px;
  background-color: black;
`;
const StyledNickname = styled.div`
  margin: 20px;
`;
const CreateDate = styled.div`
  margin: 20px;
`;
