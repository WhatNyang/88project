import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Location = () => {
  const options = {
    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  const container = useRef(null);

  useEffect(() => {
    new window.kakao.maps.Map(container.current, options);
    return () => {};
  }, []);

  return <Container ref={container}></Container>;
};

export default Location;

const Container = styled.div`
  background-color: lavender;
  width: 100%;
  height: 100%;
`;
