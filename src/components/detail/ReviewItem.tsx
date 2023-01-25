import styled from "styled-components";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { dbService } from "../../firebase";
import { useEffect, useState } from "react";
import TypeReview from "../../modules/typeReview";

const ReviewItem = () => {
  const [reviews, setReviews] = useState<TypeReview[]>([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "reviews"),
      orderBy("createdAt", "desc")
      // 최근 작성한 순으로 불러오기
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
                  {new Date(item.createdAt).toLocaleDateString("kr")}
                </CreateDate>
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
`;
const CreateDate = styled.div`
  margin: 20px;
`;
