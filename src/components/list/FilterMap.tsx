import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

declare global {
  export interface Window {
    kakao: any;
  }
}

const FilterMap = () => {
  useEffect(() => {
    const container = document.getElementById("map"), // 지도를 표시할 div
      option = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    const map = new window.kakao.maps.Map(container, option); // 지도를 생성합니다

    // // 마커를 표시할 위치와 title 객체 배열입니다
    // let positions = [
    //   {
    //     title: "내생각애견호텔",
    //     latlng: new window.kakao.maps.LatLng(
    //       37.6220974683283,
    //       126.927092121513
    //     ),
    //   },
    //   {
    //     title: "생태연못",
    //     latlng: new window.kakao.maps.LatLng(33.450936, 126.569477),
    //   },
    //   {
    //     title: "텃밭",
    //     latlng: new window.kakao.maps.LatLng(33.450879, 126.56994),
    //   },
    //   {
    //     title: "근린공원",
    //     latlng: new window.kakao.maps.LatLng(33.451393, 126.570738),
    //   },
    // ];
    /*  */
    // 버튼을 클릭하면 아래 배열의 좌표들이 모두 보이게 지도 범위를 재설정합니다
    let points = [
      new window.kakao.maps.LatLng(37.5105043772286, 126.567803),
      new window.kakao.maps.LatLng(37.5227116796706, 126.574792),
      new window.kakao.maps.LatLng(37.5128557342293, 126.572441),
    ];
    let bounds = new window.kakao.maps.LatLngBounds();

    let i, marker;
    for (i = 0; i < points.length; i++) {
      // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
      let marker = new window.kakao.maps.Marker({ position: points[i] });
      marker.setMap(map);

      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(points[i]);
    }
    // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정합니다
    // 이때 지도의 중심좌표와 레벨이 변경될 수 있습니다
    map.setBounds(bounds);
    /*  */
    // 마커 이미지의 이미지 주소입니다
    const imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

    // for (var i = 0; i < positions.length; i++) {
    //   // 마커 이미지의 이미지 크기 입니다
    //   const imageSize = new window.kakao.maps.Size(24, 35);

    //   // 마커 이미지를 생성합니다
    //   const markerImage = new window.kakao.maps.MarkerImage(
    //     imageSrc,
    //     imageSize
    //   );

    //   // 마커를 생성합니다
    //   let marker = new window.kakao.maps.Marker({
    //     map: map, // 마커를 표시할 지도
    //     position: positions[i].latlng, // 마커를 표시할 위치
    //     title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //     image: markerImage, // 마커 이미지
    //   });
    //   marker.setMap(map);
    // }
  }, []);

  return <MapSize id="map" />;
};
/*  */

export default FilterMap;

const MapSize = styled.div`
  width: 660px;
  height: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
