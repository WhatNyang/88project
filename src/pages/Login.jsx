import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { BACKGROUND_COLOR, POINT_COLOR, PROJECT_COLOR } from "../color";
import { Link } from "react-router-dom";
export default function Login() {
  const [isJoin, setIsJoin] = useState(false);
  const changeIsJoin = () => {
    setIsJoin((prev) => !prev);
    console.log(isJoin);
  };
  const Login = () => {
    console.log("확인용");
  };
  const Join = () => {
    console.log("바뀐거 확인");
  };
  return (
    <Container>
      <LoginBox>
        <InputBox height={isJoin ? "60%" : "40%"}>
          <Label htmlFor="email">이메일</Label>
          <Input id="email" />
          <Label htmlFor="passWord">비밀번호</Label>
          <Input id="passWord" />
          {isJoin ? (
            <>
              <Label htmlFor="nickname">닉네임</Label>
              <Input id="nickname" />
            </>
          ) : null}
        </InputBox>
        <ButtonWrap>
          {isJoin ? null : <Button onClick={Login}>로그인</Button>}
          <Button onClick={isJoin ? Join : changeIsJoin}>회원가입</Button>
        </ButtonWrap>
        {isJoin ? (
          <JoinText onClick={changeIsJoin}>이미 회원이신가요?</JoinText>
        ) : null}
      </LoginBox>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const LoginBox = styled.div`
  display: flex;
  width: 45%;
  height: 55vh;
  background-color: ${BACKGROUND_COLOR};
  border-radius: 5%;
  margin-bottom: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputBox = styled.div`
  height: ${(props) => props.height};
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;
const Label = styled.label`
  margin-bottom: 10px;
`;
const Input = styled.input`
  margin-bottom: 10px;
  width: 350px;
  height: 35px;
  box-shadow: 255 255 255 3px;
  border-radius: 30px;
  border: none;
`;
const ButtonWrap = styled.div`
  width: 100%;
  margin-left: 50px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
const Button = styled.button`
  background-color: ${POINT_COLOR};
  width: 150px;
  height: 35px;
  border: none;
  margin-right: 50px;
  color: white;
  text-align: center;
  border-radius: 15px;
`;
const JoinText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;
