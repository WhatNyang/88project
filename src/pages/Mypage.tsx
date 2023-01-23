import styled from "styled-components";
import React from "react";

const imgProfile = "images/profile.png";
const Mypage = () => {
  const BaseProfile = null || imgProfile;

  return (
    <StyledDivContainer>
      .
      <StyledDivMain>
        {/* MypageProfile 관련된 것 */}
        <StyledDivOne>
          <div></div>
          <div>
            <ProfileImage img={BaseProfile}></ProfileImage>
            <button>
              {" "}
              <label htmlFor="changeimg">파일선택</label>
            </button>

            <input
              hidden
              id="changeimg"
              type="file"
              placeholder="파일선택"
            ></input>
          </div>
          <div></div>
          <ProfileList>
            <ProfileNickname>나의 이름</ProfileNickname>
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
          <ProfileEditbButton>수정하기</ProfileEditbButton>
        </StyledDivOne>
        {/* MypageProfile 관련된 것 */}
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
                <p>⌥</p>
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
                <p>⌥</p>
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
                <p>⌥</p>
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
// 상단 Profile
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

const ProfileImage = styled.div<{ img: string }>`
  width: 100px;
  height: 100px;
  background-size: cover;
  background-image: url(${(props) => props.img});
`;
const ProfileList = styled.div`
  display: grid;
  grid-template-rows: 40% 60%;
`;
const ProfileNickname = styled.div`
  text-align: left;
  font-size: large;
  font-weight: 700;
  padding: 5px;
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
const ProfileEditbButton = styled.button`
  font-size: small;
  text-align: center;
  border: 0;
  outline: none;
  width: 80px;
  height: 25px;
  border-radius: 10px;
  :hover {
    background-color: #e37b58;
    transition: 0.7s;
  }
`;

// 관심, 리뷰 버튼 항목
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
      background-color: #e37b58;
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
      background-color: #e37b58;
      color: white;
    }
  }
`;

// 리뷰창
const StyledDivThree = styled.div`
  padding: 20px;
  border-radius: 30px;
  background-color: #f5f5f5;
  flex-direction: column;
`;
const StyledDivReviewFoamMainContainer = styled.div`
  padding: 20px 0px 20px 0px;
  background-color: white;
  border-radius: 10px;
  display: flex;

  margin: 0px 0px 20px 0px;
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
  margin-right: 10px;

  div:nth-child(1) {
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 15px;
    height: 30px;
    p {
      cursor: pointer;
    }
  }

  div:nth-child(2) {
    display: flex;

    p:nth-child(1) {
      font-weight: 700;
      font-size: 1.2em;
    }

    p:nth-child(2) {
      display: flex;
      font-size: 0.8em;
      justify-content: center;
      align-items: center;
      margin-left: 5px;
      margin-bottom: 10px;
    }
  }

  div:nth-child(3) {
    display: flex;
  }
`;

export default Mypage;
