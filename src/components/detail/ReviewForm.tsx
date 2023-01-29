import { useState } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { addDoc, collection } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import { useLocation } from "react-router-dom";
import { POINT_COLOR, TEXTBOX_COLOR } from "../../color";

const ReviewForm = () => {
  const location = useLocation();
  const item = location.state;
  const queryClient = useQueryClient();
  const [contents, setContents] = useState("");

  const addReview = async () => {
    await addDoc(collection(dbService, "reviews"), {
      contents,
      createdAt: Date.now(),
      userId: authService.currentUser?.uid,
      userNickName: authService.currentUser?.displayName,
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
    const word = contents.replace(/\s| /gi, "");
    if (!word.length) {
      return getErrorMsg("blank", {});
    }

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
  background-color: ${TEXTBOX_COLOR};
  border-radius: 10px;
  margin: 20px;
`;
const StyledInput = styled.textarea`
  width: 600px;
  height: 50px;
  margin: 10px;
  margin-bottom: 0;
  border: none;
  resize: none;
  font-family: "GmarketSans";
  :focus {
    outline: none;
  }
  background-color: ${TEXTBOX_COLOR};
`;
const CreateBtn = styled.button`
  background-color: ${POINT_COLOR};
  border-radius: 5px;
  border-style: none;
  color: ${TEXTBOX_COLOR};
  float: right;
  margin: 10px;
  margin-top: 0;
  width: 50px;
  height: 30px;
  cursor: pointer;
  font-family: "GmarketSans";
`;
