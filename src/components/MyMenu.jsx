import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { POINT_COLOR } from "../color";
import { authService } from "../firebase";

const MyMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    authService.signOut();
    navigate("/index");
    sessionStorage.clear();
  };

  return (
    <>
      <Profile onClick={() => setIsOpen(!isOpen)}>
        {authService.currentUser?.photoURL ? (
          <ProfileImg src={authService.currentUser?.photoURL} />
        ) : (
          <ProfileImg src="https://img.freepik.com/free-photo/closeup-shot-fluffy-ginger-domestic-cat-looking-directly-white-background_181624-46543.jpg?w=2000" />
        )}
      </Profile>
      {isOpen === true ? (
        <Menu>
          <MenuItem onClick={() => navigate("/mypage")}>마이페이지</MenuItem>
          <MenuItem onClick={logout}>로그아웃</MenuItem>
        </Menu>
      ) : null}
    </>
  );
};

export default MyMenu;

const Profile = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;
  z-index: 999;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  background-color: white;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  object-fit: cover;
`;

const Menu = styled.div`
  width: 100px;
  height: 85px;
  position: absolute;
  top: 95px;
  right: 20px;
  background-color: ${POINT_COLOR};
  border-radius: 5px;
  box-shadow: 1px 1px 1px ${POINT_COLOR};
  text-align: center;
  color: white;
  font-family: GmarketSans;
  z-index: 6000;
`;

const MenuItem = styled.p`
  cursor: pointer;
`;
