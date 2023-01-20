import React from "react";
import styled from "styled-components";
import { BACKGROUND_COLOR } from "../color";
import { MdLocationOn } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { AiTwotoneStar } from "react-icons/ai";

// 기능
// API 조회
// 업체 위치 표시 -> 클릭시 업체 정보 간략하게 표시
// 북마크

// 필요한 정보
// 현재 위치
// 현재 위치에 해당하는 업체 : 범위, 업체수
// 업체 정보 : 업체명, 주소, 전화번호, 리뷰수

const Main = () => {
  return (
    <Container>
      <Sidebar>
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
      <Map>임시</Map>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: 28%;
  height: 100%;
  background-color: ${BACKGROUND_COLOR};
  box-shadow: 3px 3px 3px #dddddd;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  padding: 0 40px;
`;

const Place = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceName = styled.h2`
  margin-bottom: 13px;
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

const Map = styled.div`
  background-color: lavender;
  width: 100%;
  height: 100%;
`;
