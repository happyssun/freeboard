import { useRouter } from "next/router";
import { MenuItem, Wrapper, WrapperMenu } from "./LayoutNavi.styles";
import { MouseEvent } from "react";

export default function LayoutNavigation() {
  const router = useRouter();

  const onClickMenu = (event: MouseEvent<HTMLDivElement>) => {
    void router.push(event.currentTarget.id);
  };

  const NAVIGATION_MENUS = [
    { name: "자유게시판", page: "/boards" },
    { name: "중고마켓", page: "/markets" },
    { name: "마이페이지", page: "/mypages" },
  ];

  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <WrapperMenu key={el.page}>
          <MenuItem id={el.page} onClick={onClickMenu}>
            {el.name}
          </MenuItem>
        </WrapperMenu>
      ))}
    </Wrapper>
  );
}
