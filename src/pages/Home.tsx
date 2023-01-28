import styled from "styled-components";
import { BsBuilding } from "react-icons/bs";
import { POINT_COLOR, PROJECT_COLOR } from "../color";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    return navigate("/login");
  };

  return (
    <Container>
      <CopyPhrase>유저들이 만들어가는 소셜 미디어 맵</CopyPhrase>
      <Title>
        WHAT<span style={{ color: PROJECT_COLOR }}>NYANG</span>
      </Title>
      <Btn onClick={goToLogin}>
        <BsBuilding style={{ margin: "0 7px -2.5px 0", fontSize: "22px" }} />
        어디로 갈까요?
      </Btn>
      <Img src="img/map.png" />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  text-align: center;
  font-family: GmarketSans;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Btn = styled.button`
  width: 270px;
  margin: 20px auto;
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
const Img = styled.img`
  width: 70%;
  margin: 30px auto;
`;
