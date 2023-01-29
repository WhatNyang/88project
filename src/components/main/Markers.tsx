import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components";
import { MapMarker } from "react-kakao-maps-sdk";
import { BACKGROUND_COLOR, POINT_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";

interface MainProps {
  info: any;
  setInfo: Dispatch<SetStateAction<object[]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  markers: object[];
}

const Markers = ({ info, setInfo, isOpen, setIsOpen, markers }: MainProps) => {
  const navigate = useNavigate();

  const onMarkerHandler = (marker: object[]) => {
    setInfo(marker);
    setIsOpen(!isOpen);
  };

  const onNavigate = (item: { id: string }) => {
    navigate(`/detail/${item.id}`, { state: item });
  };

  useEffect(() => {
    const closeMarker = () => {
      setIsOpen(false);
    };

    document.addEventListener("mousedown", closeMarker);
  }, []);

  return (
    <>
      {markers &&
        markers.map((marker: any) => (
          <MapMarker
            key={`marker-${marker.place_name}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => onMarkerHandler(marker)}
          >
            {info &&
              info.place_name === marker.place_name &&
              info.address_name === marker.address_name &&
              (isOpen ? (
                <InfoWindow onClick={() => onNavigate(marker)}>
                  {marker.place_name}
                </InfoWindow>
              ) : null)}
          </MapMarker>
        ))}
    </>
  );
};

export default Markers;

const InfoWindow = styled.div`
  cursor: pointer;
  width: 148px;
  text-align: center;
  padding: 10px;
  font-size: 16px;
  color: ${POINT_COLOR};
  transition: 0.1s ease-out;
  &:hover {
    transition: 0.1s ease-out;
    background-color: ${POINT_COLOR};
    color: white;
  }
`;
