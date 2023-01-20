import React from "react";
import styled from "styled-components";
import { PROJECTNAME_BACK_COLOR } from "../color.js";

const Header = () => {
  return (
    <Nav>
      <Title>
        WHAT<span style={{ color: PROJECTNAME_BACK_COLOR }}>NYANG</span>
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
  margin-left: 30px;
`;
