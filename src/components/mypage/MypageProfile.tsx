import styled from "styled-components";
import React, { ChangeEvent, useRef, useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService, storage } from "../../firebase";
import { uploadString, getDownloadURL, ref } from "firebase/storage";
// import { dbService } from "../../firebase";
const imgProfile =
  "https://img.freepik.com/free-photo/closeup-shot-fluffy-ginger-domestic-cat-looking-directly-white-background_181624-46543.jpg?w=2000";

type ProfileItemProps = {
  nickname: string;
  image: string;
  bookmark: number;
  review: number;
};

function MypageProfile() {
  const currentUser = JSON.parse(localStorage.getItem("User") as string);

  const initialState = {
    nickname: currentUser.displayName,
    image: imgProfile,
    bookmark: 10,
    review: 2,
  };
  const [profile, setProfile] = useState<ProfileItemProps>(initialState);
  const [imgFile, setImgFile] = useState<string>(currentUser.photoURL);
  const [nicknameEdit, setNicknameEdit] = useState<string>(
    currentUser.displayName
  );

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
  const profileEditComplete = async () => {
    const imgRef = ref(storage, `${authService.currentUser?.uid}${Date.now()}`);

    const imgDataUrl = imgFile;
    let downloadUrl;
    if (imgDataUrl) {
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    }
    updateProfile(authService.currentUser as any, {
      displayName: nicknameEdit,
      photoURL: downloadUrl,
    })
      .then(() => {
        localStorage.setItem("User", JSON.stringify(authService.currentUser));
        setEdit(!editmode);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log(authService.currentUser);

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameEdit(e.target.value);
  };
  console.log("nicknameEdit", nicknameEdit);
  return (
    <StyledDivOne>
      <div></div>
      {/* 내 프로필 사진 변경 */}
      <div>
        <>
          <ProfileImage
            img={editmode ? imgFile : currentUser.photoURL}
          ></ProfileImage>
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
          <ProfileNicknameEdit
            onChange={handleNicknameChange}
            defaultValue={profile?.nickname}
            ref={nameRef}
            value={nicknameEdit || ""}
          />
        ) : (
          <>
            {" "}
            <ProfileNickname>{currentUser.displayName}</ProfileNickname>
          </>
        )}

        <ProfileListBookmarkReview>
          <ProfileListBookmark>
            <div></div>
            {/* 내 프로필 관심, 리뷰*/}
            <div>북마크</div>
            <div>{initialState.bookmark}</div>
          </ProfileListBookmark>
          <ProfileListReview>
            <div>리뷰</div>
            <div>{initialState.review}</div>
          </ProfileListReview>
        </ProfileListBookmarkReview>
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
const ProfileListBookmarkReview = styled.div`
  display: grid;
  grid-template-columns: 15% 15% 60%;
`;

const ProfileListBookmark = styled.div`
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
