import { gql, useMutation, useQuery } from "@apollo/client";
import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/logIn";
import { useRouter } from "next/router";
import { Mutation, MutationLoginUserArgs, Query } from "../../src/commons/types/generated/types";
import { useState } from "react";

const LOGIN_USER = gql`
  mutation loginUser($password: String!, $email: String!) {
    loginUser(password: $password, email: $email) {
      accessToken
    }
  }
`;
const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loginUser] = useMutation<
    Pick<Mutation, "loginUser">,
    MutationLoginUserArgs
  >(LOGIN_USER);



export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const { onClickMoveToPage } = useMoveToPage();


  return (
    <styles.FormContainer>
      <styles.Title>로그인</styles.Title>
      <styles.Input type="text" placeholder="이메일" onChange={onChangeEmail} />
      <styles.Input type="password" placeholder="비밀번호" />
      <styles.Button type="submit">로그인</styles.Button>
      <styles.Button type="button" onClick={onClickMoveToPage("/register")}>
        회원가입으로 이동
      </styles.Button>
    </styles.FormContainer>
  );
}
