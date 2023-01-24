import { useLocation } from "react-router";
import styled from "styled-components";
import { BACKGROUND_COLOR } from "./../../color";
import DetailMap from "./DetailMap";
import { MdPhone, MdInfoOutline, MdHome } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";

const DetailInfo = () => {
  // navigate로 전달한 props받기
  const location = useLocation();
  const item = location.state;

  return (
    <InfoContainer>
      <InfoBox>
        <InfoTitle>{item.place_name}</InfoTitle>
        <StyledText>
          <FiMapPin />
          &nbsp; {item.road_address_name} ({item.address_name})
        </StyledText>
        <StyledText>
          <MdPhone />
          &nbsp; {item.phone}
        </StyledText>
        <StyledText>
          <MdInfoOutline />
          &nbsp; {item.category_group_name}
        </StyledText>
        <StyledText>
          <MdHome />
          &nbsp; {item.place_url}
        </StyledText>
        <DetailMap />
      </InfoBox>
    </InfoContainer>
  );
};

export default DetailInfo;

const InfoContainer = styled.div`
  width: 700px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const InfoBox = styled.div`
  margin: 20px;
`;
const InfoTitle = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
`;
const StyledText = styled.div`
  margin-bottom: 10px;
`;
