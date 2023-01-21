import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// 검색 결과를 바탕으로 위도, 경도값 도출
// 좌표를 useState로 관리
// 좌표값을 options 안에 적용

const Location = ({ place }) => {
  console.log(place);
  const { kakao } = window;

  const map = useRef(null);

  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };

  // 마커
  let markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

  let marker = new kakao.maps.Marker({
    position: markerPosition,
  });

  // 마커 인포 윈도우
  let iwContent = '<div style="padding:10px;">업체명</div>';
  let iwPosition = new kakao.maps.LatLng(33.450701, 126.570667);

  let infowindow = new kakao.maps.InfoWindow({
    position: iwPosition,
    content: iwContent,
  });

  // // 장소 검색 객체를 생성합니다
  // let ps = new kakao.maps.services.Places();

  // // 키워드로 장소를 검색합니다
  // ps.keywordSearch(place, placesSearchCB);

  // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  // function placesSearchCB(data, status, pagination) {
  //   if (status === kakao.maps.services.Status.OK) {
  //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //     // LatLngBounds 객체에 좌표를 추가합니다
  //     let bounds = new kakao.maps.LatLngBounds();

  //     for (let i = 0; i < data.length; i++) {
  //       displayMarker(data[i]);
  //       bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
  //     }

  //     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //     map.setBounds(bounds);
  //   }
  // }

  useEffect(() => {
    const locataion = new kakao.maps.Map(map.current, options);
    marker.setMap(locataion);
    infowindow.open(locataion, marker);
    // return () => {};
  }, []);

  return <Container ref={map}></Container>;
};

export default Location;

const Container = styled.div`
  background-color: lavender;
  width: 100%;
  height: 100%;
`;

const InfoWindow = styled.div`
  padding: 10px;
  border: 1px solid red;
`;
