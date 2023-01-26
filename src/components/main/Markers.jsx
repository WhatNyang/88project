import React from "react";
import styled from "styled-components";
import { MapMarker } from "react-kakao-maps-sdk";
import { POINT_COLOR } from "../../color";

const Markers = ({
  info,
  setInfo,
  isOpen,
  setIsOpen,
  markers,
  sessionMarkers,
}) => {
  const onMarkerHandler = (marker) => {
    setInfo(marker);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {markers
        ? markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => onMarkerHandler(marker)}
            >
              {info &&
                info.content === marker.content &&
                (isOpen ? <InfoWindow>{marker.content}</InfoWindow> : null)}
            </MapMarker>
          ))
        : sessionMarkers.map((marker) => (
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
    </>
  );
};

export default Markers;

const InfoWindow = styled.div`
  cursor: pointer;
  width: 150px;
  text-align: center;
  padding: 15px;
  font-size: 16px;
  background-color: ${POINT_COLOR};
  color: white;
  border: none;
`;
