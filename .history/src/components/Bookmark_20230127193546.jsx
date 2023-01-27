import React, { useEffect, useState } from "react";
import { authService, dbService } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useMutation } from "react-query";
import { addBookmark, deleteBookmark } from "../data/bookmark";
import { BsBookmarkPlus, BsBookmarkDashFill } from "react-icons/bs";
import Snackbar from "@mui/material/Snackbar";
import { POINT_COLOR } from "../color";
import { user } from "../pages/Mypage";

const Bookmark = ({ item }) => {
  const [list, setList] = useState([]);
  const [open, setOpen] = React.useState(false);

  const userId = authService.currentUser ? authService.currentUser.uid : user;

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

  const filteredData = list.filter((data) => {
    if (userId === data.userId) {
      if (
        data.place === item.place_name &&
        data.address === item.address_name
      ) {
        return data;
      }
    }
  });

  const filteredId = filteredData[0] !== undefined ? filteredData[0].id : null;

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
    e.stopPropagation();
    const newData = {
      userId,
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
    ["deleteBookmark", filteredId],
    (body) => deleteBookmark(body),
    {
      onSuccess: () => {},
      onError: (error) => {
        console.log("error", error);
      },
    }
  );

  const onDeleteBookmark = (e) => {
    e.stopPropagation();
    try {
      del(filteredId);
      handleClick();
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "bookmark"),
      orderBy("createdAt", "desc")
    );
    const data = onSnapshot(q, (snapshot) => {
      const newData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setList(newData);
    });
    return data;
  }, []);

  return (
    <>
      {filteredData[0] !== undefined ? (
        <BsBookmarkDashFill
          onClick={(e) => onDeleteBookmark(e, item)}
          style={{
            margin: "0 4px -3.5px -2px",
            fontSize: "20px",
            color: POINT_COLOR,
          }}
        />
      ) : (
        <BsBookmarkPlus
          onClick={(e) => onAddBookmark(e, item)}
          style={{
            margin: "0 4px -3.5px -2px",
            fontSize: "20px",
            color: POINT_COLOR,
          }}
        />
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
    </>
  );
};

export default Bookmark;
