import { getDate } from "../../../../commons/libraries/utils";
import Paginations01 from "../../../commons/paginations/01/Paginations01.container";
import Searchbars01 from "../../../commons/searchbars/01/Searchbars01.container";
import * as S from "./BoardList.styles";
import { IBoardListUIProps } from "./BoardList.types";
import { v4 as uuidv4 } from "uuid";

// 검색하는 키워드만 색상변경하기 위해 키워드 앞뒤로 SECRET 코드 넣어주기 : 코드는 임의지정
const SECRET = "@#$%";

export default function BoardListUI(props: IBoardListUIProps) {
  return (
    <S.Wrapper>
      <Searchbars01
        refetch={props.refetch}
        refetchBoardsCount={props.refetchBoardsCount}
        onChangeKeyword={props.onChangeKeyword}
      />
      <S.TableTop />
      <S.Row>
        <S.ColumnHeaderBasic>ID</S.ColumnHeaderBasic>
        <S.ColumnHeaderTitle>제목</S.ColumnHeaderTitle>
        <S.ColumnHeaderBasic>작성자</S.ColumnHeaderBasic>
        <S.ColumnHeaderBasic>날짜</S.ColumnHeaderBasic>
      </S.Row>
      {props.data?.fetchBoards.map((el, index) => (
        <S.Row key={el._id}>
          <S.ColumnBasic>
            {String(el._id).slice(-4).toUpperCase()}
          </S.ColumnBasic>
          <S.ColumnTitle id={el._id} onClick={props.onClickMoveToBoardDetail}>
            {el.title
              .replaceAll(props.keyword, `${SECRET}${props.keyword}${SECRET}`)
              .split(SECRET)
              .map((el) => (
                <S.TextToken key={uuidv4()} isMatched={props.keyword === el}>
                  {el}
                </S.TextToken>
              ))}
          </S.ColumnTitle>
          <S.ColumnBasic>{el.writer}</S.ColumnBasic>
          <S.ColumnBasic>{getDate(el.createdAt)}</S.ColumnBasic>
        </S.Row>
      ))}
      <S.TableBottom />
      <S.Footer>
        <Paginations01 refetch={props.refetch} count={props.count} />
        <S.Button onClick={props.onClickMoveToBoardNew}>
          <S.PencilIcon src="/images/board/list/write.png" />
          게시물 등록하기
        </S.Button>
      </S.Footer>
    </S.Wrapper>
  );
}
