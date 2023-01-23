import { useLocation } from "react-router";
import styled from "styled-components";
import { BACKGROUND_COLOR } from "./../../color";
import DetailMap from "./DetailMap";

const DetailInfo = () => {
  // navigate로 전달한 props받기
  const location = useLocation();
  const item = location.state;

  return (
    <InfoContainer>
      <InfoBox>
        <div>업체명 : {item.place_name}</div>
        <div>
          주소 : {item.road_address_name} ({item.address_name})
        </div>
        <div>홈페이지 : {item.place_url}</div>
        <div>전화번호 : {item.phone}</div>
        <div>시설정보 : {item.category_group_name}</div>
        <div>지도보기</div>
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
