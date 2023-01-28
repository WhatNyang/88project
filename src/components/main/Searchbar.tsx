import React, { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { BiSearchAlt } from "react-icons/bi";
import { BACKGROUND_COLOR, POINT_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";
import Bookmark from "../Bookmark";
import Reviews from "./Reviews";

interface MainProps {
  info: any;
  setInfo: Dispatch<SetStateAction<object[]>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  markers: object[];
  setPlace: Dispatch<SetStateAction<string>>;
}

const Searchbar = ({ setInfo, isOpen, setIsOpen, setPlace }: MainProps) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const searchPlace = JSON.parse(`${sessionStorage.getItem("SearchPlace")}`);
  const searchKeyword = sessionStorage.getItem("SearchKeyword");

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPlace(text);
    setText("");
  };

  const onFilteredMarker = (item: any) => {
    const filteredData: any = {
      position: {
        lat: item.y,
        lng: item.x,
      },
      place_name: item.place_name,
      address_name: item.address_name,
    };
    setInfo(filteredData);
    setIsOpen(!isOpen);
  };

  return (
    <List>
      <form onSubmit={onSubmitHandler}>
        <Search>
          <SearchInput
            value={text}
            placeholder="ex) 삼성역 안과"
            onChange={(e) => setText(e.target.value)}
          />
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
      {searchKeyword ? (
        <Place>
          <PlaceCategory>'{searchKeyword}' 결과</PlaceCategory>
          <PlaceCount>{searchPlace?.length}</PlaceCount>
        </Place>
      ) : (
        <PlaceCategory>어디로 떠날지 고민되시나요?</PlaceCategory>
      )}
      {searchPlace ? (
        (searchPlace as Array<any>).map((item, i) => (
          <PlaceList key={i} onClick={() => onFilteredMarker(item)}>
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
        ))
      ) : (
        <Reviews />
      )}
      <div
        id="pagination"
        style={{
          fontSize: "25px",
          fontWeight: "bold",
          letterSpacing: "20px",
          textAlign: "center",
          marginBottom: "30px",
          textDecoration: "none",
        }}
      />
    </List>
  );
};

export default Searchbar;

const List = styled.div`
  width: 40%;
  height: 100%;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 0 25px;
  z-index: 999;
  overflow-y: auto;
  font-family: GmarketSans;
`;

const Search = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 25px;
  margin-bottom: 30px;
  padding-left: 5px;
  &:focus {
    box-shadow: none;
  }
`;

const SearchBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const Place = styled.div`
  display: flex;
  align-items: center;
  margin-top: -15px;
`;

const PlaceCategory = styled.h2`
  font-size: 19px;
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
