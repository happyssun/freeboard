import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/logIn";

export default function RegisterForm() {
  const { onClickMoveToPage } = useMoveToPage();
  return (
    <styles.FormContainer>
      <styles.Title>회원가입</styles.Title>
      <styles.Input type="text" placeholder="이메일" />
      <styles.Input type="password" placeholder="비밀번호" />
      <styles.Input type="password" placeholder="비밀번호 확인" />
      <styles.Button type="submit">가입하기</styles.Button>
      <styles.Button type="button" onClick={onClickMoveToPage("/login")}>
        로그인페이지로 이동
      </styles.Button>
    </styles.FormContainer>
  );
}
