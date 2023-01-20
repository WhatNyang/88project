import React from "react";
import styled from "styled-components";
import { PROJECT_COLOR } from "../color.js";

const Header = () => {
  if (window.location.pathname === "/index" || "/") return null;

  return (
    <Nav>
      <Title>
        WHAT<span style={{ color: PROJECT_COLOR }}>NYANG</span>
      </Title>
    </Nav>
  );
};

export default Header;

const Nav = styled.div`
  height: 70px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  font-family: GmarketSans;

  margin-left: 30px;
`;
