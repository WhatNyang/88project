import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { dbService } from "../../firebase";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BiEdit, BiTrash } from "react-icons/bi";

export default function MypageContentsReview({ review, user }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");

  const deleteReview = async (id) => {
    await deleteDoc(doc(dbService, "review", id));
  };

  const onChangeText = function (event) {
    setEditText(event.target.value);
  };

  const editReview = async (id) => {
    await updateDoc(doc(dbService, "review", id), {
      text: editText,
    });
  };

  const deleteButtonConfirm = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      alert("삭제되었습니다.");
    }
  };
  return (
    <>
      {review.map((item) => {
        return (
          <Container key={item.id}>
            <ReviewProfile>
              <Avatar
                alt="Avatar"
                src={user?.photoURL ? user?.photoURL : null}
              />
            </ReviewProfile>

            <ReviewCard>
              <div style={{ display: "flex" }}>
                <div>
                  <ReviewInfo>헬스퀘어</ReviewInfo>
                  <div>2023.01.01</div>
                </div>
                <ReviewBtnArea>
                  <BiEdit
                    size={"30px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsEdit(!isEdit);
                    }}
                  />
                  <BiTrash
                    size={"30px"}
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteButtonConfirm(item.id)}
                  />
                </ReviewBtnArea>
              </div>
              {isEdit ? (
                <>
                  <ReviewEditor>
                    <ReviewTextArea />
                    {/* <Input
                    id="standard-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start">
                        <AiOutlineEdit />
                      </InputAdornment>
                    }
                    onChange={onChangeText}
                  /> */}
                  </ReviewEditor>
                  <ReviewEditBtn
                    variant="contained"
                    color="success"
                    style={{ marginRight: "2px" }}
                    onClick={() => {
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
                </>
              ) : (
                <div>
                  좋아요 좋아요 좋아요좋아요 좋아요 좋아요좋아요 좋아요 좋아요
                  좋아요 좋아요좋아요 좋아요 좋아요좋아요 좋아요 좋아요 좋아요
                  좋아요
                </div>
              )}
            </ReviewCard>
          </Container>
        );
      })}
    </>
  );
}

const Container = styled.div`
  padding: 20px 0px 20px 0px;
  border-radius: 10px;
  display: flex;
  margin: 0px 0px 20px 0px;
`;

const ReviewCard = styled.div`
  width: 600px;
`;

const ReviewProfile = styled.div`
  margin-right: 20px;
  justify-content: center;
  align-items: center;
`;

const ReviewInfo = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
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
  height: 100px;
`;

const ReviewEditBtn = styled.button``;
