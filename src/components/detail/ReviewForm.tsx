import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { useLocation } from "react-router-dom";
import { POINT_COLOR } from "../../color";

const ReviewForm = () => {
  const location = useLocation();
  const item = location.state;
  const queryClient = useQueryClient();
  const [contents, setContents] = useState("");

  const addReview = async () => {
    console.log("추가시 item", item);
    await addDoc(collection(dbService, "reviews"), {
      contents,
      createdAt: Date.now(),
      userId: authService.currentUser?.uid,
      userNickName: authService.currentUser?.displayName,
      // id: item.id,
      detailId: location.pathname.slice(8),
      date: new Date(),
      place_name: item.place_name,
      photoUrl: authService.currentUser?.photoURL,
      isEdit: false,
      address_name: item.address_name,
      road_address_name: item.road_address_name,
      phone: item.phone,
      category_group_name: item.category_group_name,
      place_url: item.place_url,
      x: item.x,
      y: item.y,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 입력창이 비어있으면 alert
    const word = contents.replace(/\s| /gi, "");
    if (!word.length) {
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
  margin-bottom: 0;
  border: none;
  resize: none;
  :focus {
    outline: none;
  }
`;
const CreateBtn = styled.button`
  background-color: ${POINT_COLOR};
  border-radius: 5px;
  border-style: none;
  color: white;
  float: right;
  margin: 10px;
  margin-top: 0;
  width: 50px;
  height: 30px;
  cursor: pointer;
`;
