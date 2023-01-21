import React from "react";
import styled from "styled-components";
import { BACKGROUND_COLOR } from "./../../color";

const DetailInfo = () => {
  return (
    <InfoContainer>
      <InfoBox>
        <div>업체명</div>
        <div>주소</div>
        <div>영업시간</div>
        <div>체크아웃</div>
        <div>체크인</div>
        <div>홈페이지</div>
        <div>전화번호</div>
        <div>시설정보</div>
        <div>지도보기</div>
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
