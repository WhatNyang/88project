import React, { useState, useRef, useEffect } from "react";
import { emailRegex, pwRegex, userNameRegex } from "../util";
import styled from "styled-components";
import { BACKGROUND_COLOR, POINT_COLOR } from "../color";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { logOut } from "../util";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [isJoin, setIsJoin] = useState(false);
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const userNameRef = useRef(null);
  const changeIsJoin = () => {
    setIsJoin((prev) => !prev);
    setEmail("");
    setPW("");
    setUserName("");
  };
  const [email, setEmail] = useState("");
  const [pw, setPW] = useState("");
  const [userName, setUserName] = useState("");
  const Login = () => {
    // 1. 유효성 검사
    if (validLogInInput()) {
      return;
    }

    // 2. login
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        setEmail("");
        setPW("");
        console.log(authService.currentUser);
        localStorage.setItem("User", JSON.stringify(authService.currentUser));
        navigate("/");
      })
      .catch((error) => {
        console.log("error message: ", error.message);

        // 회원이 아니거나, 비밀번호가 틀린 경우
        if (error.message.includes("user-not-found")) {
          alert("일치하는 회원 정보가 없습니다! 회원가입을 진행해주세요.");
        }
        if (error.message.includes("wrong-password")) {
          alert("비밀번호가 틀렸습니다.");
        }
      });
  };
  const Join = () => {
    //유효성검사
    if (validInput()) {
      return;
    }
    //회원가입
    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        updateProfile(authService.currentUser, {
          displayName: userName,
          photoURL:
            "https://img.freepik.com/free-photo/closeup-shot-fluffy-ginger-domestic-cat-looking-directly-white-background_181624-46543.jpg?w=2000",
        })
          .then(() => {
            localStorage.setItem(
              "User",
              JSON.stringify(authService.currentUser)
            );
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
        setEmail("");
        setPW("");
        setUserName("");
      })
      .catch((error) => {
        console.log("error.message: ", error.message);
        // 이미 존재하는 회원
        if (error.message.includes("already-in-use")) {
          alert("이미 가입한 회원입니다.");
          return;
        }
      });
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const pwChangeHandler = (event) => {
    setPW(event.target.value);
  };
  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };
  const validLogInInput = () => {
    // 공백인 경우
    if (!email) {
      alert("email을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("password를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }

    const correctEmail = email.match(emailRegex);
    const correctPW = pw.match(pwRegex);

    // 공백은 아니지만 유효성 검사에 걸리는 경우
    if (correctEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (correctPW === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current.focus();
      return true;
    }
  };
  const validInput = () => {
    if (validLogInInput()) {
      return true;
    }
    if (!userName) {
      alert("닉네임을 입력해주세요.");
      userNameRef.current.focus();
      return true;
    }

    const correctUserName = userName.match(userNameRegex);

    if (correctUserName === null) {
      alert(
        "닉네임은 2자이상, 16자이하 영어 또는 숫자 또는 한글이 조합되어야합니다."
      );
      userNameRef.current.focus();
      return true;
    }
  };
  authService.onAuthStateChanged((user) => {
    if (user) navigate("/");
  });
  return (
    <Container>
      <LoginBox>
        <InputBox height={isJoin ? "60%" : "40%"}>
          <Label htmlFor="email">이메일</Label>
          <Input
            ref={emailRef}
            id="email"
            type="text"
            value={email}
            onChange={emailChangeHandler}
          />
          <Label htmlFor="passWord">비밀번호</Label>
          <Input
            ref={pwRef}
            id="passWord"
            type="password"
            value={pw}
            onChange={pwChangeHandler}
          />
          {isJoin ? (
            <>
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                ref={userNameRef}
                id="nickname"
                type="text"
                value={userName}
                onChange={userNameChangeHandler}
              />
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
