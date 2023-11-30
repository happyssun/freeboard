import { useMoveToPage } from "../../hooks/customs/useMoveToPage";
import * as S from "./LayoutHeader.styles";

export default function LayoutHeader() {
  const { onClickMoveToPage } = useMoveToPage();
  return (
    <S.Wapper>
      <S.InnerWrapper>
        <S.InnerLogo src="/images/logo.png"></S.InnerLogo>
        <S.ButtonWrapper>
          <S.InnerButton onClick={onClickMoveToPage("/login")}>
            로그인
          </S.InnerButton>
          <S.InnerButton onClick={onClickMoveToPage("/register")}>
            회원가입
          </S.InnerButton>
        </S.ButtonWrapper>
      </S.InnerWrapper>
    </S.Wapper>
  );
}
