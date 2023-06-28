import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { BoardComment } from "../../../../commons/types/generated/types";

export interface IBoardCommentWriteProps {
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  el?: BoardComment;
}

export interface IBoardCommentWriteUIProps {
  onChangeWriter: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickWrite: () => void;
  onClickUpdate: () => void;
  writer: string;
  password: string;
  contents: string;
  setStarRate: Dispatch<SetStateAction<number>>;
  isEdit?: boolean;
  el?: BoardComment;
}

export interface IUpdateBoardCommentInput {
  contents?: string;
  rating?: number;
}
