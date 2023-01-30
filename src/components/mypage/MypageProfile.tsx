import styled from "styled-components";
import { ChangeEvent, useRef, useState } from "react";
import { updateProfile } from "firebase/auth";
import { authService, storage } from "../../firebase";
import { uploadString, getDownloadURL, ref } from "firebase/storage";
import { POINT_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";

const imgProfile =
  "https://www.personality-insights.com/wp-content/uploads/2017/12/default-profile-pic-e1513291410505.jpg";

interface propsType {
  bookmarkCount: number;
  reviewsCount: number;
}

type ProfileItemProps = {
  nickname: string;
  image: string;
  bookmark: number;
  review: number;
};

function MypageProfile({ bookmarkCount, reviewsCount }: propsType) {
  const currentUser = JSON.parse(localStorage.getItem("User") as string);
  console.log(currentUser);
  const navigate = useNavigate();
  if (!currentUser) {
    navigate("/index");
  }

  const initialState = {
    nickname: currentUser?.displayName,
    image: imgProfile,
    bookmark: 10,
    review: 2,
  };
  const [profile, setProfile] = useState<ProfileItemProps>(initialState);
  const [imgFile, setImgFile] = useState<string>(currentUser.photoURL);
  const [nicknameEdit, setNicknameEdit] = useState<string>(
    currentUser.displayName
  );

  const [editmode, setEdit] = useState(false);
  const profileEdit = () => {
    localStorage.removeItem("imgURL");
    setEdit(!editmode);
  };

  const imgRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const saveImgFile = () => {
    if (imgRef.current?.files) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const resultImg = reader.result;
        localStorage.setItem("imgURL", resultImg as string);
        setImgFile(resultImg as string);
      };
    }
  };

  const profileEditCancle = () => {
    setImgFile(currentUser.photoURL);
    setNicknameEdit(currentUser.displayName);
    setEdit(!editmode);
  };

  const profileEditComplete = async () => {
    const imgRef = ref(storage, `${authService.currentUser?.uid}${Date.now()}`);

    const imgDataUrl = localStorage.getItem("imgURL");
    let downloadUrl;
    if (imgDataUrl) {
      const response = await uploadString(imgRef, imgDataUrl, "data_url");
      downloadUrl = await getDownloadURL(response.ref);
    }
    updateProfile(authService.currentUser as any, {
      displayName: nicknameEdit,
      photoURL: downloadUrl ? downloadUrl : null,
    })
      .then(() => {
        localStorage.setItem("User", JSON.stringify(authService.currentUser));
        localStorage.removeItem("imgURL");
        setEdit(!editmode);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNicknameEdit(e.target.value);
  };
  return (
    <StyledDivOne>
      <div></div>
      <div>
        <>
          <ProfileImage
            img={editmode ? imgFile : currentUser.photoURL}
          ></ProfileImage>
          {editmode ? (
            <>
              <button>
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
              />
            </>
          ) : (
            ""
          )}
        </>
      </div>
      <div></div>
      <ProfileList>
        {editmode ? (
          <ProfileNicknameEdit
            onChange={handleNicknameChange}
            ref={nameRef}
            value={nicknameEdit}
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
            <div>북마크</div>
            <div>{bookmarkCount}</div>
          </ProfileListBookmark>
          <ProfileListReview>
            <div>리뷰</div>
            <div>{reviewsCount}</div>
          </ProfileListReview>
        </ProfileListBookmarkReview>
      </ProfileList>
      <div>
        <ProfileEditCancleButton hidden={!editmode} onClick={profileEditCancle}>
          취소
        </ProfileEditCancleButton>
      </div>
      {editmode ? (
        <ProfileEditButton onClick={profileEditComplete}>
          적용
        </ProfileEditButton>
      ) : (
        <ProfileEditButton onClick={profileEdit}>수정</ProfileEditButton>
      )}
    </StyledDivOne>
  );
}

const StyledDivOne = styled.div`
  display: grid;
  grid-template-columns: 10% 20% 5% 45% 10% 10%;
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
  cursor: pointer;
  padding: 20px;
  font-family: "GmarketSans";
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
const ProfileEditCancleButton = styled.button`
  cursor: pointer;
  font-size: small;
  font-family: "GmarketSans";
  text-align: center;
  border: 0;
  outline: 1px;
  width: 60px;
  height: 25px;
  border-radius: 10px;
  margin-right: 2px;
  background-color: lightgray;
  :hover {
    color: white;
    transition: 0.5s;
  }
  :active {
    background-color: ${POINT_COLOR};
  }
`;
const ProfileEditButton = styled.button`
  cursor: pointer;
  font-size: small;
  font-family: "GmarketSans";
  text-align: center;
  border: 0;
  outline: none;
  height: 25px;
  border-radius: 10px;
  margin-left: 2px;
  background-color: lightgray;
  :hover {
    color: white;
    transition: 0.5s;
  }
  :active {
    background-color: ${POINT_COLOR};
  }
`;
const ProfileNicknameEdit = styled.input`
  border: none;
  width: 100px;
  height: 30px;
  padding: 1px;
  font-family: "GmarketSans";
  :hover {
    background-color: ${POINT_COLOR};
    transition: 0.5s;
  }
  :focus {
    outline: none;
  }
`;
export default MypageProfile;
