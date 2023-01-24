import styled from "styled-components";
import React, { ChangeEvent, useRef, useState } from "react";
import { authService } from "../../firebase";
// import { dbService } from "../../firebase";

const imgProfile = "img/image.jpg";
type ProfileItemProps = {
  nickname: string;
  image: string;
  like: number;
  review: number;
};
function MypageProfile() {
  const initialState = {
    // nickname: authService.currentUser?.displayName,
    nickname: "나의 별명",
    image: imgProfile,
    like: 10,
    review: 2,
  };
  const [imgFile, setImgFile] = useState<string>();
  const [profile, setProfile] = useState<ProfileItemProps>(initialState);
  // 프로필 기본 이미지
  const BaseProfile = profile?.image || imgProfile;
  // 프로필 수정하기
  const [editmode, setEdit] = useState(false);
  const profileEdit = () => {
    setEdit(!editmode);
  };

  const imgRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // 프로필 사진 업로드 변경사항 유지하기
  const saveImgFile = () => {
    if (imgRef.current?.files) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const resultImg = reader.result;
        setImgFile(resultImg as string);
      };
    }
  };

  // 프로필 수정 완료 하기
  const profileEditComplete = () => {
    const img = null || profile.image;
    // 닉네임 변경사항 유지하기
    const ProfileItem = {
      nickname: nameRef.current?.value,
      image: img,
    };
    nameRef.current?.value &&
      setProfile({ ...profile, nickname: nameRef.current?.value });

    setEdit(!editmode);
  };

  // console.log(authService.currentUser);
  return (
    <StyledDivOne>
      <div></div>
      {/* 내 프로필 사진 변경 */}
      <div>
        <>
          <ProfileImage img={imgFile ? imgFile : BaseProfile}></ProfileImage>
          {editmode ? (
            <>
              <button>
                {" "}
                <ProfileImageLabel htmlFor="changeimg">
                  파일선택
                </ProfileImageLabel>
              </button>
              <input
                hidden
                id="changeimg"
                type="file"
                placeholder="파일선택"
                onChange={saveImgFile}
                ref={imgRef}
              ></input>
            </>
          ) : (
            ""
          )}
        </>
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
  /* div {
    border: 1px solid black;
  } */
`;

const ProfileImage = styled.div<{ img: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-size: cover;
  background-image: url(${(props) => props.img});
  background-position: center center;
`;
const ProfileImageLabel = styled.label`
  /* margin: 5px 0 20px 0;
  font-weight: bold;
  color: white;
  background-color: #e37b58;
  display: inline-block; */
  cursor: pointer;
  padding: 20px;
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
  cursor: pointer;
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
  }
  :focus {
    outline: none;
  }
`;
export default MypageProfile;
