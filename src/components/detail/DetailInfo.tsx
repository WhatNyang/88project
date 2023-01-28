import { useLocation } from "react-router";
import styled from "styled-components";
import { BACKGROUND_COLOR } from "./../../color";
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
      <BookmarkBox>
        <Bookmark item={item} />
      </BookmarkBox>
      <InfoBox>
        <InfoTextBox>
          <InfoTitle>{item.place_name}</InfoTitle>
          <StyledText>
            <FiMapPin />
            &nbsp; {item.road_address_name} ( {item.address_name} )
          </StyledText>
          {item.phone ? (
            <StyledText>
              <MdPhone /> &nbsp;{item.phone}
            </StyledText>
          ) : null}
          {item.category_group_name ? (
            <StyledText>
              <MdInfoOutline /> &nbsp;{item.category_group_name}
            </StyledText>
          ) : null}
          {item.place_url ? (
            <StyledText>
              <MdHome /> &nbsp;
              <a href={item.place_url} target="_blank">
                {item.place_url}
              </a>
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
const BookmarkBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  cursor: pointer;
`;
const InfoBox = styled.div`
  width: 100%;
`;
const InfoTextBox = styled.div`
  width: 95%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin-left: 15px;
  margin-bottom: 10px;
  padding: 10px;
`;
const InfoTitle = styled.div`
  margin: 10px 0 20px 0;
  font-size: 20px;
  font-weight: 700;
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
