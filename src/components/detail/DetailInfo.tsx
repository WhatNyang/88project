import { useLocation } from "react-router";
import styled from "styled-components";
import { BACKGROUND_COLOR, POINT_COLOR } from "./../../color";
import DetailMap from "./DetailMap";
import { MdPhone, MdInfoOutline, MdHome } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import Bookmark from "../Bookmark";

const DetailInfo = () => {
  // navigate로 전달한 props받기
  const location = useLocation();
  const item = location.state;

  return (
    <InfoContainer>
      <InfoBox>
        <InfoTextBox>
          <InfoTitle>{item.place_name}</InfoTitle>
          <StyledText>
            <FiMapPin style={{ marginBottom: "-2px" }} />
            &nbsp; {item.road_address_name} ( {item.address_name} )
          </StyledText>
          {item.phone ? (
            <StyledText>
              <MdPhone style={{ marginBottom: "-2px" }} /> &nbsp;{item.phone}
            </StyledText>
          ) : null}
          {item.category_group_name ? (
            <StyledText>
              <MdInfoOutline style={{ marginBottom: "-2px" }} /> &nbsp;
              {item.category_group_name}
            </StyledText>
          ) : null}
          {item.place_url ? (
            <StyledText>
              <MdHome style={{ marginBottom: "-2px" }} /> &nbsp;
              <Link href={item.place_url} target="_blank">
                홈페이지 바로가기
              </Link>
            </StyledText>
          ) : null}
        </InfoTextBox>
        <DetailMap />
      </InfoBox>
    </InfoContainer>
  );
};

export default DetailInfo;

const InfoContainer = styled.div`
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  font-family: "GmarketSans";
`;
const InfoBox = styled.div`
  width: 100%;
`;
const InfoTextBox = styled.div`
  width: 100%;
  height: 100%;
  margin: 20px;
`;
const InfoTitle = styled.div`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: 700;
`;
const StyledText = styled.div`
  margin-bottom: 10px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  transition: 0.1s ease-out;
  &:hover {
    color: ${POINT_COLOR};
    transition: 0.1s ease-out;
  }
`;
