import styled from "styled-components";
import React from "react";
import MypageHonggu from "../components/mypage/MypageHonggu";
import MypageProfile from "../components/mypage/MypageProfile";

const Mypage = () => {
  return (
    <StyledDivContainer>
      <StyledDivMain>
        <MypageProfile />
        <MypageHonggu />
      </StyledDivMain>
    </StyledDivContainer>
  );
};

const StyledDivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 100px;
`;
const StyledDivMain = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.1fr 1fr;
  grid-template-columns: repeat(1, 1fr);
  width: 700px;
  height: 100%;
  left: 225px;
  top: 167px;
  background: #fef6ec;
  border-radius: 30px;
  padding: 50px;
`;

export default Mypage;
