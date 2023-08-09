import { ChangeEvent } from "react";
import Searchbars01UI from "./Searchbars01.presenter";
import _ from "lodash";
import { ISearchbars01Props } from "./Searchbars01.types";

export default function Searchbars01(props: ISearchbars01Props): JSX.Element {
  const getDebounce = _.debounce((value: string) => {
    void props.refetch({ search: value, page: 1 });
    void props.refetchBoardsCount({ search: value });
    props.onChangeKeyword(value);
  }, 500);

  const onChangeSearchbar = (e: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(e.target.value);
  };
  return <Searchbars01UI onChangeSearchbar={onChangeSearchbar} />;
}
