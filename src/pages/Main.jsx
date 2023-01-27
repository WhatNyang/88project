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

  const searchKeyword = sessionStorage.getItem("SearchKeyword");
  const searchMarkers = JSON.parse(sessionStorage.getItem("SearchMarkers"));
  const searchBounds = JSON.parse(sessionStorage.getItem("SearchBounds"));

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
    setMap(map);

    if (!searchMarkers) return;

    if (map !== null) {
      setMarkers(searchMarkers);
      map.setBounds(searchBounds);
      console.log("지도", map);
      console.log("검색 범위", searchBounds);
    }
  }, [map, searchKeyword]);

  return (
    <>
      <MyMenu />
      <Content>
        <Searchbar
          places={places}
          setPlace={setPlace}
          info={info}
          setInfo={setInfo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
          level={5}
          onCreate={setMap}
        >
          <Markers
            info={info}
            setInfo={setInfo}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            markers={markers}
          />
        </Map>
        {/* {searchMarkers ? (
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
            level={5}
            onCreate={setMap}
          >
            <Markers
              info={info}
              setInfo={setInfo}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              markers={markers}
              />
          </Map>
        )} */}
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
