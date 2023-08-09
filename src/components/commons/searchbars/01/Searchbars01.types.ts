import type { ApolloQueryResult } from "@apollo/client";
import type { ChangeEvent } from "react";
import {
  Query,
  QueryFetchBoardsArgs,
  QueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";

export interface ISearchbars01Props {
  refetch: (
    variables: Partial<QueryFetchBoardsArgs>
  ) => Promise<ApolloQueryResult<Pick<Query, "fetchBoards">>>;
  refetchBoardsCount: (
    variables: Partial<QueryFetchBoardsCountArgs>
  ) => Promise<ApolloQueryResult<Pick<Query, "fetchBoardsCount">>>;
  onChangeKeyword: (value: string) => void;
}

export interface ISearchbars01UIProps {
  onChangeSearchbar: (event: ChangeEvent<HTMLInputElement>) => void;
}
