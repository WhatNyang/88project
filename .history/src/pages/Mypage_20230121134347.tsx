import React from "react";
import styled from "styled-components";

const imgProfile = "images/profile.png";
const Mypage = () => {
  const BaseProfile = null || imgProfile;
  return (
    <StyledDivContainer>
      <StyledDivMain>
        <StyledDivOne>
          <div></div>
          <ProfileImage img={BaseProfile}></ProfileImage>
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
        <StyledDivTwo>
          <button>관심</button>
          <button>리뷰</button>
        </StyledDivTwo>
        <StyledDivThree>
          <StyledDivReviewFoamMainContainer>
            <StyledDivReviewFoamImgContainer>
              <div></div>
            </StyledDivReviewFoamImgContainer>
            <StyledDivReviewFoamContentsContainer>
              <div>
                <p>X</p>
              </div>
              <div>
                <p>닉네임</p>
                <p>2023.01.01</p>
              </div>
              <div>
                <p>
                  리뷰내용 리뷰내용 리뷰내용리뷰내용 리뷰내용 리뷰내용리뷰내용
                  리뷰내용 리뷰내용리뷰내용 리뷰내용 리뷰내용리뷰내용 리뷰내용
                  리뷰내용리뷰내용 리뷰내용 리뷰내용리뷰내용 리뷰내용
                  리뷰내용리뷰내용 리뷰내용 리뷰내용
                </p>
              </div>
            </StyledDivReviewFoamContentsContainer>
          </StyledDivReviewFoamMainContainer>
          <StyledDivReviewFoamMainContainer>
            <StyledDivReviewFoamImgContainer>
              <div></div>
            </StyledDivReviewFoamImgContainer>
            <StyledDivReviewFoamContentsContainer>
              <div>
                <p>X</p>
              </div>
              <div>
                <p>닉네임</p>
                <p>2023.01.01</p>
              </div>
              <div>
                <p>
                  리뷰내용 리뷰내용 리뷰내용리뷰내용 리뷰내용 리뷰내용리뷰내용
                  리뷰내용 리뷰내용리뷰내용 리뷰내용 리뷰내용리뷰내용 리뷰내용
                  리뷰내용리뷰내용 리뷰내용 리뷰내용리뷰내용 리뷰내용
                  리뷰내용리뷰내용 리뷰내용 리뷰내용
                </p>
              </div>
            </StyledDivReviewFoamContentsContainer>
          </StyledDivReviewFoamMainContainer>
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
  height: 100vh;
  margin-top: 100px;
`;
const StyledDivMain = styled.div`
  div {
    border: 1px solid black;
  }
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
  grid-template-columns: 10% 20% 60% 10%;
  div {
    border: 1px solid black;
  }
`;

const ProfileImage = styled.div<{ img: string }>`
  width: 100px;
  height: 100px;
  /* background-size: cover; */
  background-image: url(${(props) => props.img});
`;
const ProfileList = styled.div`
  display: grid;
  grid-template-rows: 40% 60%;
`;
const ProfileNickname = styled.div`
  text-align: left;
  height: 100px;
  line-height: 100px;
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
  div {
    border: 1px solid black;
  }
  margin-top: 30px;
  margin-bottom: 15px;

  button:nth-child(1) {
    width: 100px;
    height: 40px;
    font-size: 20px;
    background: #e37b58;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
  }

  button:nth-child(2) {
    width: 100px;
    height: 40px;
    background: #ffffff;
    border-radius: 30px;
    padding: 10px 30px;
    border: none;
    font-size: 20px;
  }
`;

// 리뷰창
const StyledDivThree = styled.div`
  padding: 20px;
  border-radius: 30px;
  background-color: lightgray;
  flex-direction: column;
`;
const StyledDivReviewFoamMainContainer = styled.div`
  padding: 20px 0px 20px 0px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  margin: 0px 0px 20px 0px;
  div {
  }
`;

const StyledDivReviewFoamImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
  div:nth-child(1) {
    width: 70px;
    height: 70px;
    border-radius: 70%;
    overflow: hidden;
    background-color: lightgray;
  }
`;

const StyledDivReviewFoamContentsContainer = styled.div`
  div:nth-child(1) {
    display: flex;
    justify-content: right;
    height: 30px;
  }

  div:nth-child(2) {
    display: flex 1;
    flex-direction: column;
  }

  div:nth-child(3) {
  }
`;

export default Mypage;
