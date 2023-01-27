import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { useLocation } from "react-router-dom";

const ReviewForm = () => {
  const location = useLocation();
  const item = location.state;
  const queryClient = useQueryClient();

  const addReview = async () => {
    await addDoc(collection(dbService, "reviews"), {
      contents,
      createdAt: Date.now(),
      userId: authService.currentUser?.uid,
      userNickName: authService.currentUser?.displayName,
      detailId: item.id,
      date: new Date(),
      place_name: item.place_name,
      photoUrl: authService.currentUser?.photoURL,
    });
  };

  const mutation = useMutation(addReview, {
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 에러메세지
  const getErrorMsg = (errorCode: any, params: any) => {
    switch (errorCode) {
      case "blank":
        return alert("내용을 입력하세요!");
      default:
        return alert("시스템 오류");
    }
  };

  const [contents, setContents] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 입력창이 비어있으면 alert
    if (!contents) {
      return getErrorMsg("blank", {});
    }
    // text와 닉네임 전달
    const newReview: any = {
      contents,
      userNickName: authService.currentUser?.displayName,
    };
    mutation.mutate(newReview);
    setContents("");
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        placeholder="리뷰를 등록해주세요"
        onChange={(e) => setContents(e.target.value)}
        value={contents}
      ></StyledInput>
      <CreateBtn type="submit">등록</CreateBtn>
    </StyledForm>
  );
};

export default ReviewForm;

const StyledForm = styled.form`
  background-color: white;
  border-radius: 10px;
  margin: 20px;
`;
const StyledInput = styled.textarea`
  width: 635px;
  height: 50px;
  margin: 10px;
  border: none;
  resize: none;
`;
const CreateBtn = styled.button`
  background-color: #e37b58;
  border-radius: 5px;
  border-style: none;
  color: white;
  float: right;
  margin: 10px;
  width: 50px;
  height: 30px;
  cursor: pointer;
`;
