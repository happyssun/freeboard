import { gql, useMutation, useQuery } from "@apollo/client";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/sign";
import { useEffect, useState } from "react";
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
// ... (이전 코드 부분)

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
      }
      await refetch();
    } catch (error) {
      console.error("Login Error", error);
    }
  };

  useEffect(() => {
    // fetchUserLoggedIn 데이터가 업데이트될 때까지 대기

    // if(accessToken)  - accessToken이 존재하면 (즉, 사용자가 로그인되어 있다면) 조건  로그인 상태를 확인할때 적절
    // if(userData) -  useQuery로 데이터를 비동기적으로 가져오고 그 데이터를 기반으로 무언가를 하려는 경우, if (userData)를 사용하는 것이 적절
    if (userData) {
      try {
        const { name } = userData?.fetchUserLoggedIn || {};
        setModalContent({
          title: "Welcome",
          message: `${name}님 환영합니다!`,
        });

        setShowModal(true);
      } catch {
        // 로그인 실패 시 모달 표시
        setModalContent({
          title: "Error",
          message: "Invalid email or password.",
        });
        setShowModal(true);
      }
    }
  }, [userData]);

  // 모달이 닫힐 때 페이지 이동
  const closeModalAndNavigate = () => {
    setShowModal(false); // 모달 닫기
    onClickMoveToPage("/userDashboard")(); // 페이지 이동
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
          onClose={closeModalAndNavigate}
        />
      )}
    </SignInContainer>
  );
}
