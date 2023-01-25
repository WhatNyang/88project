import React from "react";
import styled from "styled-components";
import { authService } from "../../firebase";
import { useMutation } from "react-query";
import { addBookmark, deleteBookmark } from "../../data/bookmark";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";

const Bookmark = ({ list, item }) => {
  const filteredUser = list.filter((data) => {
    if (authService.currentUser.uid === data.userId) {
      return data;
    }
  });

  const filteredData = filteredUser.filter((data) => {
    if (data.place === item.place_name) {
      return data.id;
    }
  });

  const fiteredId = filteredData[0] !== undefined ? filteredData[0].id : null;

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
    e.preventDefault();
    const newData = {
      userId: authService.currentUser?.uid,
      createdAt: Date.now(),
      place: item.place_name,
      address: item.address_name,
      roadAddress: item.road_address_name,
      phone: item.phone,
    };

    try {
      add(newData);
      alert("추가 완료"); // 모달로 구현하기
    } catch (error) {
      console.log("error", error);
    }
  };

  const { mutate: del } = useMutation(
    ["deleteBookmark", fiteredId],
    (body) => deleteBookmark(body),
    {
      onSuccess: () => {},
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const onDeleteBookmark = (e) => {
    e.preventDefault();
    try {
      del(fiteredId);
      alert("해제 완료");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      {filteredData[0] !== undefined ? (
        <PlaceInfo onClick={(e) => onDeleteBookmark(e, item)}>
          <BsBookmarkDashFill style={{ margin: "0 5px -2.5px 0" }} />
          북마크 해제
        </PlaceInfo>
      ) : (
        <PlaceInfo onClick={(e) => onAddBookmark(e, item)}>
          <BsBookmarkPlus style={{ margin: "0 5px -2.5px 0" }} />
          북마크 추가
        </PlaceInfo>
      )}
    </div>
  );
};

export default Bookmark;

const PlaceInfo = styled.div`
  font-size: 15px;
  font-weight: 300;
  margin-top: 5px;
  cursor: pointer;
`;
