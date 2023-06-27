import { ChangeEvent, MouseEvent } from "react";
import { BoardComment, Query } from "../../../../commons/types/generated/types";

export interface IBoardCommentListUIProps {
  data?: Pick<Query, "fetchBoardComments">;
  isOpenDeleteModal: boolean;
  onClickDelete: (e: MouseEvent<HTMLElement>) => void;
  onClickOpenDeleteModal: (e: MouseEvent<HTMLImageElement>) => void;
  onChangeDeletePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickCloseModal: (e: MouseEvent<HTMLElement>) => void;
}

export interface IBoardCommentListUIItemProps {
  el: BoardComment;
}
