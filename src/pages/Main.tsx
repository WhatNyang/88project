import React from "react";
import styled from "styled-components";
import { PROJECT_COLOR } from "../color";
import { MdLocationOn } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { AiTwotoneStar } from "react-icons/ai";
import Location from "../components/Location";

// 기능
// API 조회
// 마커 -> 클릭시 업체 정보 간략하게 표시
// 북마크

// 필요한 정보
// 현재 위치
// 현재 위치에 해당하는 업체 : 범위, 업체수
// 업체 정보 : 업체명, 주소, 전화번호, 리뷰수

const Main = () => {
  return (
    <Container>
      <Sidebar>
        <Title>
          WHAT<span style={{ color: PROJECT_COLOR }}>NYANG</span>
        </Title>
        <Place>
          <h2>결과</h2>
          <PlaceCount>170</PlaceCount>
        </Place>
        <PlaceList>
          <PlaceName>아르반호텔</PlaceName>
          <PlaceInfo>
            <MdLocationOn /> 부산 진구 중앙대로 691번길 32
          </PlaceInfo>
          <PlaceInfo>
            <GiRotaryPhone style={{ marginRight: "5px" }} />
            051-805-9901
          </PlaceInfo>
          <PlaceInfo>
            <AiTwotoneStar style={{ marginRight: "5px" }} />
            리뷰 23건
          </PlaceInfo>
          <PlaceInfo>상세보기</PlaceInfo>
        </PlaceList>
      </Sidebar>
      <Location />
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: GmarketSans;
`;

const Sidebar = styled.div`
  width: 28%;
  height: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px #dddddd;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  padding: 0 40px;
  z-index: 999;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  font-family: GmarketSans;
`;

const Place = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceName = styled.h2`
  margin-bottom: 13px;
  font-weight: 500;
`;

const PlaceCount = styled.span`
  color: #a3a3a3;
  font-size: 20px;
  margin-left: 10px;
`;

const PlaceList = styled.div`
  margin-bottom: 50px;
`;

const PlaceInfo = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;
