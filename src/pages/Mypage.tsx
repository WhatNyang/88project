import styled from "styled-components";
import MypageHonggu from "../components/mypage/MypageHonggu";

const imgProfile = "images/profile.png";
const Mypage = () => {
  const BaseProfile = null || imgProfile;

  return (
    <StyledDivContainer>
      <StyledDivMain>
        {/* MypageProfile 관련된 것 */}
        <StyledDivOne>
          <div></div>
          <ProfileImage img={BaseProfile}></ProfileImage>
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
          <ProfileEditbButton>수정하기</ProfileEditbButton>
        </StyledDivOne>
        <MypageHonggu />
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

export default Mypage;
