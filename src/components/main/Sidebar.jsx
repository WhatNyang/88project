import React from "react";
import styled from "styled-components";
import { MdLocationOn } from "react-icons/md";
import { GiRotaryPhone } from "react-icons/gi";
import { BsBookmarkPlus } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { POINT_COLOR, PROJECT_COLOR } from "../../color";
import { useNavigate } from "react-router-dom";
import { authService } from "../../firebase";
import { useMutation, useQuery } from "react-query";
import { addBookmark, getBookmark } from "../../data/bookmark";

const Sidebar = ({ text, setText, setPlace, places }) => {
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setPlace(text);
    setText("");
  };

  const { mutate: add } = useMutation(
    ["addBookmark"],
    (body) => addBookmark(body),
    {
      onSuccess: () => {},
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const onAddBookmark = (e, item) => {
    const newData = {
      userId: authService.currentUser?.uid,
      createdAt: Date.now(),
      place: item.place_name,
      address: item.address_name,
      roadAddress: item.road_address_name,
      phone: item.phone,
    };
    e.preventDefault();
    try {
      add(newData);
      alert("추가 완료");
    } catch (error) {
      console.log("error", error);
    }
  };

  const { data } = useQuery(["bookmark"], getBookmark, {
    onSuccess: () => {},
    onError: (error) => {
      console.log("error", error);
    },
  });

  console.log(data);

  // addBookmark
  // bookmark 콜렉션 안에 이름 & 장소가 일치하는 데이터가 없거나,
  // 일치하되 그 중 currentUser.uid와 게시글의 userId가 일치하는 데이터가 없는 경우

  // deleteBookmark
  // bookmark 콜렉션 안에 이름 & 장소가 일치하는 데이터 중에서
  // currentUser.uid와 게시글의 userId가 일치하는 경우

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
        <PlaceCount>{places.length}</PlaceCount>
      </Place>
      {places.map((item, i) => (
        <PlaceList key={i}>
          <PlaceName
            onClick={() => {
              navigate(`/detail/${item.id}`, { state: item });
            }}
          >
            {item.place_name}
          </PlaceName>
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
          <PlaceInfo
            onClick={(e) => onAddBookmark(e, item)}
            style={{ cursor: "pointer" }}
          >
            <BsBookmarkPlus style={{ margin: "0 5px -2.5px 0" }} />
            북마크 추가
          </PlaceInfo>
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
  width: 28%;
  height: 100%;
  background-color: white;
  box-shadow: 3px 3px 3px #dddddd;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: fixed;
  padding: 0 40px;
  z-index: 999;
  overflow-y: auto;
  font-family: GmarketSans;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 900;
`;

const Search = styled.div`
  width: 90%;
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

const PlaceCount = styled.span`
  color: #a3a3a3;
  font-size: 20px;
  margin-left: 10px;
`;

const PlaceList = styled.div`
  margin: 0 0 10px -20px;
  padding: 1px 0px 10px 20px;
`;

const PlaceName = styled.span`
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.1s ease-out;
  &:hover {
    color: ${POINT_COLOR};
    transition: 0.1s ease-out;
  }
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
