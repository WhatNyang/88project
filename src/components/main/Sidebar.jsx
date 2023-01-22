import React from "react";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { AiTwotoneStar } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { PROJECT_COLOR } from "../../color";

const Sidebar = ({ text, setText, setPlace }) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setPlace(text);
    setText("");
  };

  return (
    <List>
      <Title>
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
      <Place>
        <h2>결과</h2>
        <PlaceCount>170</PlaceCount>
      </Place>
      <PlaceList>
        <PlaceName>아르반호텔</PlaceName>
        <PlaceInfo>
          <MdLocationOn /> 부산 진구 중앙대로 691번길 32
        </PlaceInfo>
        <PlaceInfo>
          <GiRotaryPhone style={{ marginRight: "5px" }} />
          051-805-9901
        </PlaceInfo>
        <PlaceInfo>
          <AiTwotoneStar style={{ marginRight: "5px" }} />
          리뷰 23건
        </PlaceInfo>
        <PlaceInfo>상세보기</PlaceInfo>
      </PlaceList>
    </List>
  );
};

export default Sidebar;

const List = styled.div`
  width: 25%;
  height: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px #dddddd;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  padding: 0 40px;
  z-index: 999;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
  font-family: GmarketSans;
`;

const Search = styled.div`
  width: 100%;
`;

const SearchInput = styled.input`
  width: 75%;
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

const PlaceName = styled.h2`
  margin-bottom: 13px;
  font-weight: 500;
`;

const PlaceCount = styled.span`
  color: #a3a3a3;
  font-size: 20px;
  margin-left: 10px;
`;

const PlaceList = styled.div`
  margin-bottom: 50px;
`;

const PlaceInfo = styled.div`
  font-size: 18px;
  margin-top: 10px;
`;
