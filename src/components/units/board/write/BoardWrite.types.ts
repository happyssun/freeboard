import { ChangeEvent } from "react";
import { Query } from "../../../../commons/types/generated/types";

export interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<Query, "fetchBoard">;
}

export interface IBoardWriteUIProps {
  writerError: string;
  pwError: string;
  titleError: string;
  contentsError: string;
  onChangeWriter: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangePw: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickAddressSearch: () => void;
  onChangeAddressDetail: (e: ChangeEvent<HTMLInputElement>) => void;
  onCompleteAddressSearch: (data: any) => void;
  onClickSubmitBtn: () => void;
  onClickUpdateBtn: () => void;

  isEdit: boolean;
  isActive: boolean;
  isOpen: boolean;
  data?: Pick<Query, "fetchBoard">;
  zipcode: string;
  address: string;
  addressDetail: string;
}

export interface ISubmitbuttonProps {
  isActive: boolean;
}

export interface IUpdateBoardInput {
  title?: string;
  contents?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
}
