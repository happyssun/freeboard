import {
  FireFilledIcon,
  Searchbar,
  SearchbarInput,
} from "./Searchbars01.styles";
import { ISearchbars01UIProps } from "./Searchbars01.types";

export default function Searchbars01UI(
  props: ISearchbars01UIProps
): JSX.Element {
  return (
    <Searchbar>
      <FireFilledIcon />
      <SearchbarInput
        placeholder="검색어를 입력하세요"
        onChange={props.onChangeSearchbar}
      />
    </Searchbar>
  );
}
