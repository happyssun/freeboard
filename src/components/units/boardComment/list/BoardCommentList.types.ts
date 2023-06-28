import { ChangeEvent, MouseEvent } from "react";
import { BoardComment, Query } from "../../../../commons/types/generated/types";

export interface IBoardCommentListUIProps {
  onLoadMore: () => void;
  data?: Pick<Query, "fetchBoardComments">;
}

export interface IBoardCommentListUIItemProps {
  el: BoardComment;
}
