import styled from "styled-components";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { dbService, authService } from "../../firebase";
import { useEffect, useState } from "react";
import TypeReview from "../../modules/typeReview";
import { useLocation } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { RiDeleteBinLine } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import { POINT_COLOR, TEXTBOX_COLOR } from "../../color";

const ReviewItem = () => {
  const location = useLocation();
  const item = location.state;
  const filteredId = item.detailId ? item.detailId : item.id;
  const queryClient = useQueryClient();

  const [reviews, setReviews] = useState<TypeReview[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [thisItem, setThisItem] = useState();

  useEffect(() => {
    const q = query(
      collection(dbService, "reviews"),
      orderBy("createdAt", "desc"),
      where("detailId", "==", filteredId)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newReviews: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(newReviews);
    });
    return unsubscribe;
  }, [item.id]);

  // 삭제
  const deleteReview = (id: string) => {
    return deleteDoc(doc(dbService, "reviews", id));
  };
  const mutation = useMutation(deleteReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleDeleteBtn = (id: string) => {
    mutation.mutate(id);
  };

  // 수정
  const editButtonHandler = function (item: any) {
    setThisItem(item);
    setIsEdit(!isEdit);
  };

  const onChangeText = function (e: any) {
    setEditText(e.target.value);
  };

  const editReview = async (id: string) => {
    await updateDoc(doc(dbService, "reviews", id), {
      contents: editText,
    });
  };

  return (
    <>
      {reviews &&
        reviews.map((item) => {
          return (
            <ItemBox key={item.createdAt}>
              {item.photoUrl ? (
                <StyledPhoto src={item.photoUrl} />
              ) : (
                <StyledPhoto src="https://img.freepik.com/free-photo/closeup-shot-fluffy-ginger-domestic-cat-looking-directly-white-background_181624-46543.jpg?w=2000" />
              )}
              <ContentBox>
                <InfoBox>
                  <StyledNickname>{item.userNickName}</StyledNickname>
                  <CreateDate>
                    {new Date(item.createdAt)
                      .toLocaleDateString()
                      .replace(/\./g, "")
                      .replace(/\s/g, " / ")}
                  </CreateDate>
                </InfoBox>
                {thisItem === item.id && isEdit ? null : (
                  <ReviewContent>{item.contents}</ReviewContent>
                )}
                {authService.currentUser?.uid === item.userId ? (
                  <RightBox>
                    {thisItem === item.id && isEdit ? null : (
                      <ReviewBtn>
                        <RiDeleteBinLine
                          style={{
                            width: "19px",
                            height: "19px",
                          }}
                          onClick={() => handleDeleteBtn(item.id)}
                        />
                        <TfiPencilAlt
                          style={{ width: "15px", marginRight: "20px" }}
                          strokeWidth="1"
                          onClick={() => {
                            editButtonHandler(item.id);
                          }}
                        />
                      </ReviewBtn>
                    )}
                    {thisItem === item.id && isEdit ? (
                      <>
                        <ReviewEditor>
                          <EditTextArea onChange={onChangeText}>
                            {item.contents}
                          </EditTextArea>
                        </ReviewEditor>
                        <ReviewEditBtn
                          style={{ marginRight: "2px" }}
                          onClick={() => {
                            editReview(item.id);
                            setIsEdit(false);
                          }}
                        >
                          완료
                        </ReviewEditBtn>
                        <ReviewEditBtn
                          onClick={() => {
                            setIsEdit(false);
                          }}
                        >
                          취소
                        </ReviewEditBtn>
                      </>
                    ) : null}
                  </RightBox>
                ) : null}
              </ContentBox>
            </ItemBox>
          );
        })}
    </>
  );
};

export default ReviewItem;

const ItemBox = styled.div`
  background-color: ${TEXTBOX_COLOR};
  border-radius: 10px;
  border: 2px solid ${POINT_COLOR};
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const ContentBox = styled.div`
  padding: 10px 0;
`;

const InfoBox = styled.div`
  display: flex;
  width: 500px;
  justify-content: space-between;
`;
const RightBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
`;

const ReviewBtn = styled.div`
  display: flex;
  align-items: center;
`;

const CreateDate = styled.div`
  margin: 20px;
  color: darkgray;
  font-size: 13px;
`;
const ReviewContent = styled.div`
  margin-left: 20px;
`;
const StyledPhoto = styled.img`
  margin: 20px;
  width: 95px;
  height: 70px;
`;
const StyledNickname = styled.div`
  margin: 20px;
  color: darkgray;
  font-size: 13px;
`;
//

const ReviewEditor = styled.div`
  width: 100%;
`;
const EditTextArea = styled.textarea`
  width: 330px;
  height: 50px;
  resize: none;
  margin-left: 20px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 10px;
`;

const ReviewEditBtn = styled.button`
  background-color: #e37b58;
  border-radius: 5px;
  border-style: none;
  color: white;
  width: 60px;
  height: 28px;
  margin-top: 5px;
  margin-right: 20px;
`;
