import { ApolloQueryResult } from "@apollo/client";
import {
  Query,
  QueryFetchBoardsArgs,
  QueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IBoardListUIProps {
  data?: Pick<Query, "fetchBoards">;
  onClickMoveToBoardNew: () => void;
  onClickMoveToBoardDetail: (e: MouseEvent<HTMLDivElement>) => void;
  refetch: (
    variables?: Partial<QueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<Query, "fetchBoards">>>;
  count?: number;
  refetchBoardsCount: (
    variables: Partial<QueryFetchBoardsCountArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<Query, "fetchBoardsCount">>>;
  keyword: string;
  onChangeKeyword: (value: string) => void;
}

export interface ITextTokenProps {
  isMatched: boolean;
}
