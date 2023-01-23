import styled from "styled-components";
import React, { ChangeEvent, useRef, useState } from "react";

const imgProfile = "img/image.jpg";
type ProfileItemProps = {
  nickname: string;
  image: string;
  like: number;
  review: number;
};
function MypageProfile() {
  const initialState = {
    nickname: "나의 별명",
    image: imgProfile,
    like: 10,
    review: 2,
  };
  const [profile, setProfile] = useState<ProfileItemProps>(initialState);
  const BaseProfile = profile?.image || imgProfile;
  const [editmode, setEdit] = useState(false);
  const profileEdit = () => {
    setEdit(!editmode);
  };
  const nameRef = useRef<HTMLInputElement>(null);
  const profileEditComplete = () => {
    const img = null || profile.image;
    const ProfileItem = {
      nickname: nameRef.current?.value,
      image: img,
      review: 2,
    };
    nameRef.current?.value &&
      setProfile({ ...profile, nickname: nameRef.current?.value });

    setEdit(!editmode);
  };

  return (
    <StyledDivOne>
      <div></div>
      {/* 내 프로필 사진 변경 */}
      <div>
        <ProfileImage img={BaseProfile}></ProfileImage>
        {editmode ? (
          <>
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
          </>
        ) : (
          ""
        )}
      </div>
      <div></div>
      {/* 내 프로필 닉네임 */}
      <ProfileList>
        {editmode ? (
          <ProfileNicknameEdit defaultValue={profile?.nickname} ref={nameRef} />
        ) : (
          <>
            {" "}
            <ProfileNickname>{profile?.nickname}</ProfileNickname>
          </>
        )}

        <ProfileListLikeReview>
          <ProfileListLike>
            <div></div>
            {/* 내 프로필 관심, 리뷰*/}
            <div>관심</div>
            <div>{initialState.like}</div>
          </ProfileListLike>
          <ProfileListReview>
            <div>리뷰</div>
            <div>{initialState.review}</div>
          </ProfileListReview>
        </ProfileListLikeReview>
      </ProfileList>
      {/* 내 프로필 수정, 완료 버튼*/}
      {editmode ? (
        <ProfileEditButton onClick={profileEditComplete}>
          완료하기
        </ProfileEditButton>
      ) : (
        <ProfileEditButton onClick={profileEdit}>수정하기</ProfileEditButton>
      )}
    </StyledDivOne>
  );
}
const StyledDivOne = styled.div`
  display: grid;
  grid-template-columns: 10% 20% 5% 55% 10%;
`;

const ProfileImage = styled.div<{ img: string }>`
  width: 100px;
  height: 100px;
  /* background-repeat: no-repeat; */
  background-size: contain;
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
const ProfileEditButton = styled.button`
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
const ProfileNicknameEdit = styled.input`
  border: none;
  width: 100px;
  height: 30px;
  padding: 1px;
  :hover {
    background-color: #e37b58;
    transition: 0.7s;
    border: none;
  }
`;
export default MypageProfile;
