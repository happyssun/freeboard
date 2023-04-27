import { ApolloQueryResult } from "@apollo/client";
import {
  Query,
  QueryFetchBoardsArgs,
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
}

export interface ITextTokenProps {
  isMatched: boolean;
}
