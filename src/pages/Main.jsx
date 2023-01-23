import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Sidebar from "../components/main/Sidebar";
import MyMenu from "../components/MyMenu";
import { Map, CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";
import { useQuery, useQueryClient } from "react-query";

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

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  const queryClient = useQueryClient();

  const getPlace = () =>
    fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query="강남구"`,
      {
        headers: {
          Authorization: "KakaoAK {de1c6d457684ada5ec64093d0ed3d36e}",
        },
      }
    ).then((res) => res.json);

  const { data: placeData } = useQuery(["Place"], getPlace);

  console.log("레스트api", placeData);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status, _pagination) => {
      console.log("검색어: ", place);
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        map.setBounds(bounds);
      }
    });
  }, [map]);

  return (
    <Container>
      <MyMenu />
      <Sidebar
        text={text}
        setText={setText}
        setPlace={setPlace}
        markers={markers}
      />
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
      ;
    </Container>
  );
};

export default Main;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  font-family: GmarketSans;
`;
