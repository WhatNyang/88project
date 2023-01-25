import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../components/main/Sidebar";
import MyMenu from "../components/MyMenu";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { displayPagination } from "../data/kakao";

const { kakao } = window;

const Main = () => {
  const [text, setText] = useState("");
  const [place, setPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const onMarkerHandler = (marker) => {
    setInfo(marker);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
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
        setPlaces(data);
        map.setBounds(bounds);
        displayPagination(_pagination);
      }
    });
  }, [place]);

  return (
    <>
      <MyMenu />
      <Content>
        <Sidebar
          text={text}
          setText={setText}
          setPlace={setPlace}
          places={places}
        />
        <Map
          center={{
            lat: 37.566826,
            lng: 126.9786567,
          }}
          style={{
            width: "70vw",
            height: "100vh",
            float: "right",
            fontFamily: "GmarketSans",
          }}
          level={3}
          onCreate={setMap}
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => onMarkerHandler(marker)}
            >
              {info &&
                info.content === marker.content &&
                (isOpen ? <InfoWindow>{marker.content}</InfoWindow> : null)}
            </MapMarker>
          ))}
        </Map>
      </Content>
    </>
  );
};

export default Main;

const Content = styled.div`
  display: flex;
  width: 105vw;
  height: 100vh;
`;

const InfoWindow = styled.div`
  cursor: pointer;
  width: 150px;
  text-align: center;
  padding: 5px;
  font-size: 13px;
`;
