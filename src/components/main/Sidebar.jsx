import React, { useState } from "react";
import styled from "styled-components";
import { MdLocationOn, MdInfoOutline } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { BACKGROUND_COLOR, POINT_COLOR, PROJECT_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";
import Bookmark from "../Bookmark";

const Sidebar = ({ setPlace }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const sessionPlace = JSON.parse(sessionStorage.getItem("SearchPlace"));
  const sessionKeyword = sessionStorage.getItem("SearchKeyword");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setPlace(text);
    setText("");
  };

  const onResetPlace = () => {
    window.location.reload();
    sessionStorage.clear();
  };

  // 검색 결과 클릭시 지도 인포윈도우 반환

  return (
    <List>
      <Title onClick={onResetPlace}>
        WHAT<span style={{ color: PROJECT_COLOR }}>NYANG</span>
      </Title>
      <form onSubmit={onSubmitHandler}>
        <Search>
          <SearchInput value={text} onChange={(e) => setText(e.target.value)} />
          <SearchBtn type="submit">
            <BiSearchAlt
              style={{
                fontSize: "30px",
                marginBottom: "-12px",
              }}
            />
          </SearchBtn>
        </Search>
      </form>
      {sessionKeyword ? (
        <Place>
          <h2>'{sessionKeyword}' 결과</h2>
          <PlaceCount>{sessionPlace?.length}</PlaceCount>
        </Place>
      ) : null}
      {sessionPlace?.map((item, i) => (
        <PlaceList key={i}>
          <Bookmark item={item} />
          <PlaceName>{item.place_name}</PlaceName>
          {item.road_address_name ? (
            <>
              <PlaceInfo>
                <MdLocationOn style={{ marginBottom: "-2px" }} />{" "}
                {item.address_name}
              </PlaceInfo>
              <PlaceInfoRoadAddress>
                (도로명: {item.road_address_name})
              </PlaceInfoRoadAddress>
            </>
          ) : (
            <PlaceInfo>
              <MdLocationOn /> {item.address_name}
            </PlaceInfo>
          )}
          {item.phone ? (
            <PlaceInfo>
              <GiRotaryPhone style={{ margin: "0 5px -2px 0" }} />
              {item.phone}
            </PlaceInfo>
          ) : null}
          <PlaceLink
            onClick={() => {
              navigate(`/detail/${item.id}`, { state: item });
            }}
          >
            정보 보기
          </PlaceLink>
        </PlaceList>
      ))}
      <div
        id="pagination"
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          letterSpacing: "20px",
          textAlign: "center",
          marginBottom: "30px",
        }}
      />
    </List>
  );
};

export default Sidebar;

const List = styled.div`
  width: 23%;
  height: 100vh;
  box-shadow: 3px 3px 3px #dddddd;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 40px;
  z-index: 999;
  overflow-y: auto;
  font-family: GmarketSans;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  cursor: pointer;
`;

const Search = styled.div`
  width: 100%;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 25px;
  margin-bottom: 30px;
`;

const SearchBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const Place = styled.div`
  display: flex;
  align-items: center;
`;

const PlaceCount = styled.span`
  color: #a3a3a3;
  font-size: 20px;
  margin-left: 10px;
`;

const PlaceList = styled.div`
  margin: 0 0 10px -10px;
  padding: 10px 10px;
  transition: 0.1s ease-out;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: ${BACKGROUND_COLOR};
    transition: 0.1s ease-out;
  }
`;

const PlaceName = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin-top: -1px;
`;

const PlaceInfo = styled.div`
  font-size: 15px;
  font-weight: 300;
  margin-top: 5px;
`;

const PlaceInfoRoadAddress = styled.div`
  font-size: 12px;
  font-weight: 300;
  margin: 3px 0 0 22px;
`;

const PlaceLink = styled.button`
  font-size: 15px;
  font-family: GmarketSans;
  margin-top: 7px;
  padding: 5px 10px;
  border: 1px solid ${POINT_COLOR};
  border-radius: 50px;
  background-color: ${BACKGROUND_COLOR};
  color: ${POINT_COLOR};
  cursor: pointer;
  transition: 0.1s ease-out;
  &:hover {
    transition: 0.1s ease-out;
    background-color: ${POINT_COLOR};
    color: white;
  }
`;
