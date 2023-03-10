import styled from "styled-components";
import { PROJECT_COLOR } from "../color.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const move = () => {
    if (window.location.pathname === "/login") return;
    sessionStorage.clear();
    navigate("/");
  };
  if (window.location.pathname === "/index") return null;
  return (
    <Nav>
      <Title onClick={move}>
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
