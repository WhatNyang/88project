import styled from "styled-components";
import { PROJECT_COLOR } from "../color.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  if (window.location.pathname === "/index") return null;

  return (
    <Nav>
      <Title
        onClick={() => {
          // sessionStorage.clear();
          localStorage.clear();
          navigate("/");
        }}
      >
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
  cursor: pointer;
`;
