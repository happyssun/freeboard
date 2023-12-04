import { useMoveToPage } from "../../src/components/commons/hooks/customs/useMoveToPage";
import * as styles from "../../styles/sign";

export default function SignUpForm() {
  const { onClickMoveToPage } = useMoveToPage();
  return (
    <styles.FormContainer>
      <styles.Title>Sign Up</styles.Title>
      <styles.Input type="text" placeholder="Name" />
      <styles.Input type="text" placeholder="Email" />
      <styles.Input type="password" placeholder="Password" />
      <styles.Input type="password" placeholder="Password check" />

      <styles.SubButton type="submit">Sign Up</styles.SubButton>
      <styles.MoveButton type="button" onClick={onClickMoveToPage("/login")}>
        Move to Sign In
      </styles.MoveButton>
    </styles.FormContainer>
  );
}
