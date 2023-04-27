import { ApolloQueryResult } from "@apollo/client";
import { Query, QueryFetchBoardsArgs } from "../../types/generated/types";
import { MouseEvent } from "react";

export interface IPaginations01Props {
  count?: number;
  refetch: (
    variables: Partial<QueryFetchBoardsArgs>
  ) => Promise<ApolloQueryResult<Pick<Query, "fetchBoards">>>;
}

export interface IPaginations01UIProps {
  startPage: number;
  lastPage: number;
  activedPage: number;
  onClickPage: (e: MouseEvent<HTMLSpanElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
