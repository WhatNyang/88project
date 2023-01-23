import { useEffect } from "react";
import styled from "styled-components";

declare global {
  interface Window {
    kakao: any;
  }
}

const DetailMap = () => {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    map.panBy(100, 50);
    // 중심 좌표를 지정한 픽셀 만큼 부드럽게 이동한다.
    // 만약 이동할 거리가 지도 화면의 크기보다 클 경우 애니메이션 없이 이동한다.

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const mapTypeControl = new window.kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시된다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미.
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 마커가 표시될 위치
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정
    marker.setMap(map);
  }, []);

  return <MapSize id="map" />;
};

export default DetailMap;

const MapSize = styled.div`
  width: 500px;
  height: 300px;
`;
