import styled from "styled-components";

const ReviewForm = () => {
  return (
    <StyledForm>
      <StyledInput placeholder="리뷰를 등록해주세요"></StyledInput>
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
`;
