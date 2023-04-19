import * as S from "./LayoutHeader.styles";

export default function LayoutHeader() {
  return (
    <S.Wapper>
      <S.InnerWrapper>
        <S.InnerLogo src="/images/logo.png"></S.InnerLogo>
        <S.ButtonWrapper>
          <S.InnerButton> 로그인</S.InnerButton>
          <S.InnerButton>회원가입</S.InnerButton>
        </S.ButtonWrapper>
      </S.InnerWrapper>
    </S.Wapper>
  );
}
