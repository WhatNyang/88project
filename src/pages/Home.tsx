import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { POINT_COLOR, PROJECT_COLOR } from "../color";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    return navigate("/login");
  };

  return (
    <Container>
      <CopyPhrase>반려동물도 호캉스도 놓치기 싫다면</CopyPhrase>
      <Title>
        WHAT<span style={{ color: PROJECT_COLOR }}>NYANG</span>
      </Title>
      <Btn onClick={goToLogin}>
        <BiSearchAlt style={{ margin: "0 4px -4px 0" }} />
        호텔 찾기
      </Btn>
      <Img src="img/image.jpg" />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  margin-top: 60px;
  text-align: center;
  font-family: GmarketSans;
`;

const CopyPhrase = styled.p`
  font-size: 25px;
  font-weight: regular;
  margin-bottom: 0;
`;

const Title = styled.h1`
  font-size: 80px;
  font-weight: bold;
  margin: 10px 0;
`;

const Img = styled.img`
  width: 100%;
`;

const Btn = styled.button`
  font-size: 25px;
  font-weight: 500;
  padding: 10px 30px;
  border-radius: 50px;
  border: none;
  background: ${POINT_COLOR};
  color: white;
  font-family: GmarketSans;
  cursor: pointer;
`;
