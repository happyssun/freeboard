import * as S from "./uploads01.styles";
import { IUploadFileUIProps } from "./uploads01.types";

export default function UploadFileUI(props: IUploadFileUIProps) {
  return (
    <>
      {/* 
      fileUrl가 !== "" 빈문자열이 아니니 ? (빈문자열이 아니면 UploadImage를): (빈문자열이면 Hidden을)
      fileUrl ? (있을때) : (없을때)  
      --- 있으면 state에 들어가있는 구글스토리지에 저장된 이미지를 그려주고 없으면 업로드 버튼을 그려줌
      */}
      {props.fileUrl !== "" ? (
        <S.UploadImage
          src={`https://storage.googleapis.com/${props.fileUrl}`}
          onClick={props.onClickUpload}
        />
      ) : (
        <S.UploadButton onClick={props.onClickUpload}>+</S.UploadButton>
      )}

      <S.UploadFileHidden
        type="file"
        onChange={props.onChangeFile}
        ref={props.fileRef}
      ></S.UploadFileHidden>
    </>
  );
}

//
