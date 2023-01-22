import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Sidebar from "../components/main/Sidebar";
const { kakao } = window;

// 기능
// API 조회
// 마커 -> 클릭시 업체 정보 간략하게 표시
// 북마크

// 필요한 정보
// 현재 위치
// 현재 위치에 해당하는 업체 : 범위, 업체수
// 업체 정보 : 업체명, 주소, 전화번호, 리뷰수

const Main = () => {
  const [text, setText] = useState("");
  const [place, setPlace] = useState("");

  console.log(place);

  // 지도
  const mapRef = useRef(null);

  let options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

  // 마커
  let markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
  let marker = new kakao.maps.Marker({
    position: markerPosition,
  });
  // 마커 인포 윈도우
  let iwContent = `<div style="padding:8px;">${place}</div>`;
  let infowindow = new kakao.maps.InfoWindow({
    position: markerPosition,
    content: iwContent,
    removable: true,
  });

  useEffect(() => {
    const locataion = new kakao.maps.Map(mapRef.current, options);
    marker.setMap(locataion);
    infowindow.open(locataion, marker);
  }, []);

  return (
    <Container>
      <Sidebar text={text} setText={setText} setPlace={setPlace} />
      <Map ref={mapRef}></Map>;
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: GmarketSans;
`;

const Map = styled.div`
  width: 100%;
  height: 100%;
`;
