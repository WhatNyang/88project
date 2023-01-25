import React from "react";
import styled from "styled-components";
import { authService } from "../firebase";
import { useMutation } from "react-query";
import { addBookmark, deleteBookmark } from "../data/bookmark";
import {
  BsBookmarkPlus,
  BsBookmarkDashFill,
  BsCheckCircle,
} from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";

const Bookmark = ({ list, item }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = <React.Fragment />;

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
      handleClick();
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
      handleClick();
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
      {filteredData[0] !== undefined ? (
        <Snackbar
          open={open}
          autoHideDuration={700}
          onClose={handleClose}
          message="추가 완료"
          action={action}
        />
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={700}
          onClose={handleClose}
          message="해제 완료"
          action={action}
        />
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
