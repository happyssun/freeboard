import { v4 as uuidv4 } from "uuid";
import * as S from "./MyfirebaseList.styles";
import { IMyFirebaseListUIProps } from "./MyfirebaseList.types";

export default function MyfirebaseListUI(props: IMyFirebaseListUIProps) {
  return (
    <S.Wrapper>
      <S.TableTop />
      <S.Row>
        <S.ColumnNumber>번호</S.ColumnNumber>
        <S.ColumnWriter>작성자</S.ColumnWriter>
        <S.ColumnTitle>제목</S.ColumnTitle>
        <S.ColumnContents>내용</S.ColumnContents>
      </S.Row>
      <S.TableBottom />

      {props.dataBoards?.map((el: any, index: number) => (
        <S.Row key={uuidv4()}>
          <S.ColumnNumber>{index + 1}</S.ColumnNumber>
          <S.ColumnWriter>{el.writer}</S.ColumnWriter>
          <S.ColumnTitle>{el.title}</S.ColumnTitle>
          <S.ColumnContents>{el.contents}</S.ColumnContents>
        </S.Row>
      ))}
      <S.Button onClick={props.onClickMoveToBoardNew}>
        <S.PencilIcon src="/images/board/list/write.png" />
        게시물 등록하기
      </S.Button>
    </S.Wrapper>
  );
}
