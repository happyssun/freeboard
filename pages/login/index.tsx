// pages/login/index.tsx

import { gql, useMutation } from "@apollo/client";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/logIn";
import { useState } from "react";
import Input from "../../src/components/inputs/01";
import styled from "@emotion/styled";

const LoginContainer = styled.div`
  ${styles.formContainer}
`;

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;

export default function LoginForm(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser] = useMutation(LOGIN_USER, {
    variables: { email, password },
  });

  const handleLogin = async () => {
    try {
      const { data } = await loginUser();
      const accessToken = data?.loginUser.accessToken;

      // TODO: 로그인 성공 후 처리
      console.log("Login Successful", accessToken);
    } catch (error) {
      // TODO: 로그인 실패 후 처리
      console.error("Login Error", error);
    }
  };

  return (
    <LoginContainer>
      <styles.Title>로그인</styles.Title>
      <Input type="text" placeholder="이메일" onChange={setEmail} />
      <Input type="password" placeholder="비밀번호" onChange={setPassword} />
      <styles.Button type="button" onClick={handleLogin}>
        로그인
      </styles.Button>
      <styles.Button type="button" onClick={onClickMoveToPage("/register")}>
        회원가입으로 이동
      </styles.Button>
    </LoginContainer>
  );
}
