import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../components/main/Sidebar";
import MyMenu from "../components/MyMenu";
import { Map } from "react-kakao-maps-sdk";
import { displayPagination } from "../data/kakao";
import Markers from "../components/main/Markers";

const { kakao } = window;

const Main = () => {
  const [place, setPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  const sessionKeyword = sessionStorage.getItem("SearchKeyword");
  const sessionMarkers = JSON.parse(sessionStorage.getItem("SearchMarkers"));

  const sessionLat = sessionMarkers ? sessionMarkers[0].position.lat : null;
  const sessionLng = sessionMarkers ? sessionMarkers[0].position.lng : null;

  useEffect(() => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, (data, status, _pagination) => {
      console.log(
        data.filter((item) => item.address_name.substring(0, 2) === "서울")
      );
      if (
        status === kakao.maps.services.Status.OK /* &&
        data.address_name.substring(0, 2) === "서울" */
      ) {
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

        sessionStorage.setItem("SearchKeyword", place);
        sessionStorage.setItem("SearchPlace", JSON.stringify(data));
        sessionStorage.setItem("SearchBounds", JSON.stringify(bounds));
        sessionStorage.setItem("SearchMarkers", JSON.stringify(markers));
      }
    });
  }, [place]);

  useEffect(() => {
    if (!sessionMarkers) return;
    setMarkers(sessionMarkers);
  }, [sessionKeyword]);

  return (
    <>
      <MyMenu />
      <Content>
        <Sidebar setPlace={setPlace} place={place} places={places} />
        {sessionMarkers ? (
          <Map
            center={{
              lat: sessionLat,
              lng: sessionLng,
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
            <Markers markers={markers} sessionMarkers={sessionMarkers} />
          </Map>
        ) : (
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
            <Markers markers={markers} sessionMarkers={sessionMarkers} />
          </Map>
        )}
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
