import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Searchbar from "../components/main/Searchbar";
import { Map } from "react-kakao-maps-sdk";
import { displayPagination } from "../data/kakao";
import Markers from "../components/main/Markers";
import { BACKGROUND_COLOR } from "../color";
import { authService } from "../firebase";
import { useNavigate } from "react-router-dom";
const { kakao } = window;

const Main = () => {
  const navigate = useNavigate();
  authService.onAuthStateChanged((user) => {
    if (!user) navigate("/index");
  });
  const [place, setPlace] = useState("");
  const [places, setPlaces] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [info, setInfo] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const searchKeyword = sessionStorage.getItem("SearchKeyword");
  const searchMarkers = JSON.parse(sessionStorage.getItem("SearchMarkers"));
  const deserialized = JSON.parse(sessionStorage.getItem("SearchBounds"));

  let searchBounds;

  if (deserialized) {
    searchBounds = Object.setPrototypeOf(
      deserialized,
      kakao.maps.LatLngBounds.prototype
    );
  }

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
    if (!searchMarkers) return;
    if (map !== null) {
      setMarkers(searchMarkers);
      map.setBounds(searchBounds);
    }
  }, [map, searchKeyword]);

  return (
    <>
      <Container>
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
            width: "100%",
            height: "100%",
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
      </Container>
    </>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80vw;
  height: 70vh;
  border: 40px solid ${BACKGROUND_COLOR};
  border-radius: 20px;
`;
