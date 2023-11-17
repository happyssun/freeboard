import styled from "@emotion/styled";
import LayoutBanner from "./banner";
import LayoutHeader from "./header/LayoutHeader.index";
import LayoutNavigation from "./navigation";

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  const Body = styled.div`
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  return (
    <>
      <LayoutHeader></LayoutHeader>
      <LayoutBanner></LayoutBanner>
      <LayoutNavigation></LayoutNavigation>
      <Body>{props.children}</Body>
    </>
  );
}
