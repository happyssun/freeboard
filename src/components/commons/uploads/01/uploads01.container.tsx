import { useMutation } from "@apollo/client";
import { UPLOAD_FILE } from "./uploads01.queries";
import { ChangeEvent, useRef } from "react";
import { checkValidationFile } from "./uploads01.validation";
import { Modal } from "antd";
import { IUploadFileProps } from "./uploads01.types";
import UploadFileUI from "./uploads01.presenter";

export default function UploadFile(props: IUploadFileProps) {
  const [uploadFile] = useMutation(UPLOAD_FILE);

  // 파일 선택하기 버튼의 가짜버튼과 진짜버튼 연결 - 버튼클릭시 fileRef가 클릭됨
  const fileRef = useRef<HTMLInputElement>(null);

  // input태그 type="file"의 진짜 파일선택하기를 클릭 : 버튼은 타입지정이 안된다 그래서 인풋태그에서 chage값으로
  // input에 파일이 첨부될 경우 작동하는 함수
  const onChangeFile = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    // files? 인 이유는 한번에 여러파일을 등록하기 가능한 "multiple"이 기본이라 file이 아니라 files 다!!!
    // 여기선 파일 하나만 등록하게 할것이라 배열[0]으로
    const file = e.target.files?.[0];

    // 파일 적합성체크 : 라이브러리에서 import한 checkValidationFile(체인지한 파일)
    const isValid = checkValidationFile(file);
    if (!isValid) return;
    console.log(file);

    try {
      // 첨부된 파일을 구글 스토리지에 업로드 후 url를 반환받는다.
      const result = await uploadFile({
        variables: { file },
      });

      console.log(result);
      // BoardWrite에서 props로 받아온 onChangeFileUrls 함수에
      // 스토리지에 업로드가 완료된 file의 url을 넘겨준다.
      props.onChangeFileUrls(result.data.uploadFile.url, props.index);
      console.log(result.data.uploadFile.url);
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({ content: error.message });
      }
    }
  };

  // 가짜로 만들어놓은 버튼을 클릭헸을 때 - useRef() 훅을 이용하여 연결
  const onClickUpload = () => {
    fileRef.current?.click();
  };

  return (
    <UploadFileUI
      onChangeFile={onChangeFile}
      onClickUpload={onClickUpload}
      onChangeFileUrls={props.onChangeFileUrls}
      defaultFileUrl={props.defaultFileUrl}
      fileUrl={props.fileUrl}
      fileRef={fileRef}
    />
  );
}
