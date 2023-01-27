import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Searchbar from "../components/main/Searchbar";
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
  const [info, setInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const sessionKeyword = sessionStorage.getItem("SearchKeyword");
  const sessionMarkers = JSON.parse(sessionStorage.getItem("SearchMarkers"));

  const sessionLat = sessionMarkers ? sessionMarkers[0].position.lat : null;
  const sessionLng = sessionMarkers ? sessionMarkers[0].position.lng : null;

  useEffect(() => {
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
            place_name: data[i].place_name,
            address_name: data[i].address_name,
            road_address_name: data[i].road_address_name,
            phone: data[i].phone,
            category_group_name: data[i].category_group_name,
            place_url: data[i].place_url,
            id: data[i].id,
            x: data[i].x,
            y: data[i].y,
          });
          console.log(data);
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
        <Searchbar
          setPlace={setPlace}
          places={places}
          info={info}
          setInfo={setInfo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
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
            <Markers
              info={info}
              setInfo={setInfo}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              markers={markers}
              sessionMarkers={sessionMarkers}
            />
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
            <Markers
              info={info}
              setInfo={setInfo}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              markers={markers}
              sessionMarkers={sessionMarkers}
            />
          </Map>
        )}
      </Content>
    </>
  );
};

export default Main;

const Content = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
