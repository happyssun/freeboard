// pages/login/index.tsx

import { gql, useMutation, useQuery } from "@apollo/client";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/sign";
import { useState } from "react";
import Input from "../../src/components/inputs/01";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../src/commons/stores";
import Modal from "../../src/components/modal/01";

const SignInContainer = styled.div`
  ${styles.formContainer}
`;

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
    }
  }
`;

export default function SignInForm(): JSX.Element {
  const { onClickMoveToPage } = useMoveToPage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const [loginUser] = useMutation(LOGIN_USER);
  const { data: userData, refetch } = useQuery(FETCH_USER_LOGGED_IN);

  const handleLogin = async () => {
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      const accessToken = data?.loginUser.accessToken;

      if (accessToken) {
        setAccessToken(accessToken);

        // fetchUserLoggedIn 쿼리 실행
        await refetch();

        // 모달창에 환영 메시지 표시
        const { name } = userData?.fetchUserLoggedIn || {};
        setModalContent({
          title: "Welcome",
          message: `${name}님 환영합니다!`,
        });

        setShowModal(true);

        // 대시보드 페이지로 이동
        onClickMoveToPage("/dashboard");
      }
    } catch (error) {
      console.error("Login Error", error);

      // 로그인 실패 시 모달 표시
      setModalContent({
        title: "Error",
        message: "Invalid email or password.",
      });
      setShowModal(true);
    }
  };

  return (
    <SignInContainer>
      <styles.Title>Sign In</styles.Title>
      <Input type="text" placeholder="Email" onChange={setEmail} />
      <Input type="password" placeholder="Password" onChange={setPassword} />
      <styles.SubButton type="button" onClick={handleLogin}>
        Sign In
      </styles.SubButton>
      <styles.MoveButton type="button" onClick={onClickMoveToPage("/signup")}>
        Move to Sign Up
      </styles.MoveButton>

      {showModal && (
        <Modal
          title={modalContent.title}
          message={modalContent.message}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </SignInContainer>
  );
}
