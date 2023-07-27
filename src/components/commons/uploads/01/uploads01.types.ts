import { ChangeEvent, RefObject } from "react";

export interface IUploadFileProps {
  index: number;
  fileUrl: string;
  defaultFileUrl?: string;
  onChangeFileUrls: (fileUrl: string, index: number) => void;
}

export interface IUploadFileUIProps {
  fileUrl: string;
  fileRef: RefObject<HTMLInputElement>;
  defaultFileUrl?: string;
  onClickUpload: () => void;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}
