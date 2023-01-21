import React from "react";
import styled from "styled-components";
// import logo from "./logo192.png";
import BaseProfile from "./download.png";
// const BaseProfile = "assets/person.jpg";
const Mypage = () => {
  return (
    <StyledDivContainer>
      <StyledDivMain>
        <StyledDivOne style={{ backgroundColor: "red" }}>
          <div>1</div>
          <Profile>2{/* <img src="" alt="Logo" /> */}</Profile>
          {/* <img src={logo} alt="Logo" /> */}
          <div>3</div>
          <div>4</div>
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
  grid-template-rows: 0.4fr 0.1fr 1fr;
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
  grid-template-columns: 10% 20% 60% 10%;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-image: url(${BaseProfile});
`;
// 버튼항목
const StyledDivTwo = styled.div`
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
