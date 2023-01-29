import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { dbService } from "../../firebase";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./DeleteModal";
import { POINT_COLOR } from "../../color";
import { TbListSearch } from "react-icons/tb";

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
            <ReviewCard
              onClick={() => {
                navigateDetail(item);
              }}
            >
              <div style={{ display: "flex" }}>
                <div>
                  <div>
                    <ReviewInfo>{item.place_name}</ReviewInfo>
                    <div>
                      <ReviewDate>
                        {new Date(item.createdAt)
                          .toLocaleDateString()
                          .replace(/\./g, "")
                          .replace(/\s/g, " / ")}
                      </ReviewDate>
                    </div>
                  </div>
                </div>
                <ReviewBtnArea>
                  <BiEdit
                    size={"20px"}
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      editButtonHanler(event, item.id);
                    }}
                  />
                  <AlertDialog item={item} />
                </ReviewBtnArea>
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
                <ReviewContent>{item.contents}</ReviewContent>
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
  }
`;

const ReviewCard = styled.div`
  width: 550px;
`;

const ReviewProfile = styled.div`
  margin-right: 20px;
  margin-left: 20px;
`;

const ReviewDate = styled.div`
  color: gray;
  margin-top: 10px;
`;
const ReviewInfo = styled.div`
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
`;

const ReviewContent = styled.div`
  padding: 10px 30px 20px 0;
  line-height: 23px;
`;

const ReviewEditor = styled.div`
  width: 100%;
`;

const ReviewBtnArea = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 15px;
`;

const ReviewTextArea = styled.textarea`
  width: 95%;
  height: 70px;
  resize: none;
  border-radius: 10px;
  margin: 20px;
  margin-left: 0;
  padding: 10px;
`;
const RightBox = styled.div`
  display: flex;
`;

const ReviewEditBtn = styled.button`
  background: ${POINT_COLOR};
  border-radius: 5px;
  border-style: none;
  color: white;
  width: 50px;
  height: 25px;
  margin: 20px 20px 10px 5px;
`;
