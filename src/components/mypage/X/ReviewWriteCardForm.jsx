// import { addDoc, collection } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { authService } from "../../../firebase";
// import { dbService } from "../../firebase";

// const ReviewWriteCardForm = ({ category, setForm }) => {
//   const [contents, setContents] = useState("");

//   const newReview = {
//     userId: authService.currentUser?.uid,
//     createdAt: Date.now(),
//     place: item.place_name,
//     address: item.address_name,
//     roadAddress: item.road_address_name,
//     phone: item.phone,
//   };

//   const addReview = async () => {
//     await addDoc(collection(dbService, "review"), newReview);
//     setForm("");
//   };

//   return (
//     <StyledForm>
//       <StyledInput
//         placeholder="리뷰를 등록해주세요"
//         onChange={(event) => {
//           setContents(event.target.value);
//         }}
//       ></StyledInput>
//       <CreateBtn
//         type="submit"
//         onClick={(event) => {
//           event.preventDefault();
//           addReview();
//         }}
//       >
//         등록
//       </CreateBtn>
//     </StyledForm>
//   );
// };

// export default ReviewWriteCardForm;

// const StyledForm = styled.form`
//   background-color: white;
//   border-radius: 10px;
//   margin: 20px;
// `;
// const StyledInput = styled.textarea`
//   width: 635px;
//   height: 50px;
//   margin: 10px;
//   border: none;
//   resize: none;
// `;
// const CreateBtn = styled.button`
//   background-color: #e37b58;
//   border-radius: 5px;
//   border-style: none;
//   color: white;
//   float: right;
//   margin: 10px;
//   width: 50px;
//   height: 30px;
// `;