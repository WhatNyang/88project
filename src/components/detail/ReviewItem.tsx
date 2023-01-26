import styled from "styled-components";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { dbService, authService } from "../../firebase";
import { useEffect, useState } from "react";
import TypeReview from "../../modules/typeReview";
import { useLocation } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "react-query";

const ReviewItem = () => {
  const location = useLocation();
  const item = location.state;
  const queryClient = useQueryClient();
  const [reviews, setReviews] = useState<TypeReview[]>([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "reviews"),
      orderBy("createdAt", "desc"),
      // 최근 작성한 순으로 불러오기
      where("detailId", "==", item.id)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newReviews: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(newReviews);
    });
    return unsubscribe;
  }, []);

  // const deleteReview = async (id: string) => {
  //   await deleteDoc(doc(dbService, "reviews", id));
  // };
  // return undefined가 생략되어있음
  // 요청은 서버로가지만 mutation이 서버상태관리를하지못한다

  // const deleteReview = async (id: string) => {
  //   return await deleteDoc(doc(dbService, "reviews", id));
  // };
  // return을 앞에 써주면 되지만 그러면 async await을 쓰는 의미가 없음

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

  return (
    <>
      {reviews.map((item) => {
        return (
          <ItemBox key={item.createdAt}>
            <StyledPhoto>사진</StyledPhoto>
            <ContentBox>
              <ReviewInfoBox>
                <StyledNickname>{item.userNickName}</StyledNickname>
                <CreateDate>
                  {new Date(item.createdAt)
                    .toLocaleDateString()
                    .replace(/\./g, "")
                    .replace(/\s/g, " / ")}
                </CreateDate>
                {authService.currentUser?.uid === item.userId ? (
                  <RiDeleteBinLine
                    onClick={() => handleDeleteBtn(item.id)}
                    // 매개변수가 필요하기 때문에 콜백으로 넣어줘야한다
                  ></RiDeleteBinLine>
                ) : null}
              </ReviewInfoBox>
              <ReviewContent>{item.contents}</ReviewContent>
            </ContentBox>
          </ItemBox>
        );
      })}
    </>
  );
};

export default ReviewItem;

const ItemBox = styled.div`
  background-color: white;
  border-radius: 10px;
  margin: 20px;
  display: flex;
`;
const ContentBox = styled.div``;
const ReviewInfoBox = styled.div`
  display: flex;
  width: 500px;
`;
const CreateDate = styled.div`
  margin: 20px;
  color: darkgray;
  font-size: 13px;
`;
const ReviewContent = styled.div`
  margin: 20px;
  margin-top: 0;
`;
const StyledPhoto = styled.div`
  margin: 20px;
  width: 70px;
  height: 70px;
  background-color: black;
`;
const StyledNickname = styled.div`
  margin: 20px;
  color: darkgray;
  font-size: 13px;
`;
