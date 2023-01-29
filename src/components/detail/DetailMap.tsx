import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

declare global {
  export interface Window {
    kakao: any;
  }
}

const DetailMap = () => {
  const location = useLocation();
  const location_x = location.state.x;
  const location_y = location.state.y;

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(location_y, location_x),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);

    const moveLatLon = new window.kakao.maps.LatLng(location_y, location_x);

    map.setCenter(moveLatLon);

    map.panBy(100, 50);

    const mapTypeControl = new window.kakao.maps.MapTypeControl();

    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    const markerPosition = new window.kakao.maps.LatLng(location_y, location_x);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    marker.setMap(map);
  }, [location_y, location_x]);

  return <MapSize id="map" />;
};

export default DetailMap;

const MapSize = styled.div`
  width: 95%;
  height: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
`;
