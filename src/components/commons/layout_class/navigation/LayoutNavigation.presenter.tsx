import { Fragment } from "react";
import { MenuItem, Wrapper } from "./LayoutNavigation.styles";
import { ILayoutNavigationUIProps } from "./LayoutNavigation.types";

const NAVIGATION_MENUS = [
  { name: "Boards", page: "/boards" },
  { name: "Products", page: "/markets" },
  { name: "DashBoard", page: "/userDashboard" },
  { name: "Open Api", page: "/openApi" },
  { name: "My firebase", page: "/myfirebase" },
];

export default function LayoutNavigationUI(props: ILayoutNavigationUIProps) {
  return (
    <Wrapper>
      {NAVIGATION_MENUS.map((el) => (
        <Fragment key={el.page}>
          <MenuItem id={el.page} onClick={props.onClickMenu}>
            {el.name}
          </MenuItem>
        </Fragment>
      ))}
    </Wrapper>
  );
}
