import { Query } from "../../../../commons/types/generated/types";
import { MouseEvent } from "react";

export interface IBoardListUIProps {
  data?: Pick<Query, "fetchBoards">;
  onClickMoveToBoardNew: () => void;
  onClickMoveToBoardDetail: (e: MouseEvent<HTMLDivElement>) => void;
}
