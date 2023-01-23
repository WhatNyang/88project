import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { POINT_COLOR } from "../color";

const MyMenu = () => {
  const navigate = useNavigate();

  // 드롭다운
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const logout = () => {
    // 로그아웃
    navigate("/index");
  };

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current !== null && !menuRef.current.containes(e.target)) {
        setIsOpen(!isOpen);
      }
    };
    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen]);

  return (
    <>
      <Profile />
      <Menu>
        <MenuItem onClick={() => navigate("/mypage")}>마이페이지</MenuItem>
        <MenuItem onClick={logout}>로그아웃</MenuItem>
      </Menu>
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
  border: 1px solid ${POINT_COLOR};
  box-shadow: 1px 1px 2px ${POINT_COLOR};
  background-color: white;
  cursor: pointer;
`;

const Menu = styled.div`
  width: 100px;
  height: 85px;
  position: absolute;
  top: 115px;
  right: 20px;
  background-color: ${POINT_COLOR};
  border: 1px 1px #eee;
  border-radius: 5px;
  box-shadow: 1px 1px 2px ${POINT_COLOR};
  z-index: 999;
  text-align: center;
  color: white;
`;

const MenuItem = styled.p`
  cursor: pointer;
`;
