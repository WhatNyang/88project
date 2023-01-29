import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { dbService } from "../../firebase";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import AlertDialog from "./DeleteModal";
import { POINT_COLOR } from "../../color";
export default function MypageContentsReview({ reviews, user }) {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [thisItem, setThisItem] = useState();

  const editButtonHanler = function (event, item) {
    event.stopPropagation();
    setThisItem(item);
    setIsEdit(!isEdit);
  };

  const onChangeText = function (event) {
    setEditText(event.target.value);
  };

  const editReview = async (id) => {
    await updateDoc(doc(dbService, "reviews", id), {
      contents: editText,
    });
  };

  const navigateDetail = function (item) {
    navigate(`/detail/${item.detailId}`, { state: item });
  };

  return (
    <>
      {reviews.map((item) => {
        return (
          <Container key={item.date.seconds}>
            <ReviewProfile>
              <Avatar
                alt="Avatar"
                src={user?.photoURL ? user?.photoURL : null}
              />
            </ReviewProfile>
            <ReviewCard>
              <div style={{ display: "flex" }}>
                <div>
                  <ReviewInfo>{item.place_name}</ReviewInfo>
                  <div>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.createdAt)
                        .toLocaleDateString()
                        .replace(/\./g, "")
                        .replace(/\s/g, " / ")}
                    </Typography>
                  </div>
                </div>
                <ReviewBtnArea>
                  <BiEdit
                    size={"30px"}
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      editButtonHanler(event, item.id);
                    }}
                  />
                  <AlertDialog item={item} />
                </ReviewBtnArea>
                <GoToDetailBtn
                  onClick={() => {
                    navigateDetail(item);
                  }}
                >
                  상세페이지
                </GoToDetailBtn>
              </div>
              {thisItem === item.id && isEdit ? (
                <RightBox>
                  <ReviewEditor>
                    <ReviewTextArea onChange={onChangeText}>
                      {item.contents}
                    </ReviewTextArea>
                  </ReviewEditor>
                  <ReviewEditBtn
                    variant="contained"
                    color="success"
                    style={{ marginRight: "2px" }}
                    onClick={() => {
                      editReview(item.id);
                      setIsEdit(false);
                    }}
                  >
                    수정
                  </ReviewEditBtn>
                  <ReviewEditBtn
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setIsEdit(false);
                    }}
                  >
                    취소
                  </ReviewEditBtn>
                </RightBox>
              ) : (
                <p>{item.contents}</p>
              )}
            </ReviewCard>
          </Container>
        );
      })}
    </>
  );
}

const Container = styled.div`
  padding-top: 15px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  margin: 0px 0px 20px 0px;
  cursor: pointer;
  transition: 0.1s ease-out;
  &:hover {
    background-color: #fcfcfc;
    transition: 0.1s ease-out;
`;

const ReviewCard = styled.div`
  width: 550px;
`;

const ReviewProfile = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const ReviewInfo = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const ReviewEditor = styled.div`
  width: 100%;
`;

const ReviewBtnArea = styled.div`
  display: flex;
  margin-left: auto;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  height: 50px;
  resize: none;
  border-radius: 10px;
`;
const RightBox = styled.div`
  display: flex;
`;

const ReviewEditBtn = styled.button`
  background-color: #e37b58;
  border-radius: 5px;
  border-style: none;
  color: white;
  width: 50px;
  height: 25px;
  margin: 0 20px 10px 5px;
`;

const GoToDetailBtn = styled.button`
  width: 110px;
  height: 30px;
  background-color: ${POINT_COLOR};
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 14px;
  margin-right: 15px;
`;
