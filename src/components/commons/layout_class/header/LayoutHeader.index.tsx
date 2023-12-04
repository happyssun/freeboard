import { useMoveToPage } from "../../hooks/customs/useMoveToPage";
import { ButtonWrapper } from "../../layout/header/LayoutHeader.styles";
import {
  InnerButton,
  InnerLogo,
  InnerWrapper,
  SignInButton,
  SignUpButton,
  Wrapper,
} from "./LayoutHeader.styles";

export default function LayoutHeader() {
  const { onClickMoveToPage } = useMoveToPage();

  return (
    <Wrapper>
      <InnerWrapper>
        <InnerLogo onClick={onClickMoveToPage("/boards")}>💎 LIVE</InnerLogo>
        <ButtonWrapper>
          <SignInButton onClick={onClickMoveToPage("/signin")}>
            Sign In
          </SignInButton>
          <SignUpButton onClick={onClickMoveToPage("/signup")}>
            Sign Up
          </SignUpButton>
        </ButtonWrapper>
      </InnerWrapper>
    </Wrapper>
  );
}
