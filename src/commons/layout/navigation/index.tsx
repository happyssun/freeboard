import { MenuItem, Wrapper, WrapperMenu } from "./LayoutNavi.styles";

export default function LayoutNavigation() {
  return (
    <Wrapper>
      <WrapperMenu>
        <MenuItem>자유게시판</MenuItem>
        <MenuItem>중고마켓</MenuItem>
        <MenuItem>마이페이지</MenuItem>
      </WrapperMenu>
    </Wrapper>
  );
}
