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
  top: 30px;
  right: 20px;
  z-index: 999;
  width: 70px;
  height: 70px;
  border-radius: 50px;
  box-shadow: 2px 2px 1px ${POINT_COLOR};
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
  top: 115px;
  right: 20px;
  background-color: lightgray;
  border: 1px 1px #eee;
  border-radius: 5px;
  box-shadow: 1px 1px 1px ${POINT_COLOR};
  z-index: 999;
  text-align: center;
  font-family: GmarketSans;
  :hover {
    color: white;
    transition: 0.5s;
  }
`;

const MenuItem = styled.p`
  cursor: pointer;
`;
