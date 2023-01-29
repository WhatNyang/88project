import { useLocation } from "react-router";
import styled from "styled-components";
import { BACKGROUND_COLOR, POINT_COLOR, TEXTBOX_COLOR } from "./../../color";
import DetailMap from "./DetailMap";
import { MdPhone, MdInfoOutline, MdHome } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import Bookmark from "../Bookmark";

const DetailInfo = () => {
  const location = useLocation();
  const item = location.state;

  return (
    <InfoContainer>
      <InfoBox>
        <InfoTextBox>
          <InfoTitleBox>
            <Bookmark item={item} />
            <InfoTitle>{item.place_name}</InfoTitle>
          </InfoTitleBox>
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
  max-width: 750px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 30px;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 10px;
  font-family: "GmarketSans";
`;
const InfoTitleBox = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
  padding-bottom: 3px;
`;
const InfoBox = styled.div`
  width: 100%;
`;
const InfoTextBox = styled.div`
  width: 95%;
  height: 100%;
  background-color: ${TEXTBOX_COLOR};
  border-radius: 10px;
  border: 3px solid ${POINT_COLOR};
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 10px;
`;
const InfoTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 -4px 2px;
`;
const StyledText = styled.div`
  margin-bottom: 10px;
  a:link {
    color: black;
    text-decoration: none;
  }
  a:visited {
    color: black;
    text-decoration: none;
  }
  a:hover {
    color: black;
    text-decoration: underline;
  }
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
