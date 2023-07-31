import { Tooltip } from "antd";
import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./BoardDetail.styles";
import { IBoardDetailUIProps } from "./BoardDetail.types";

export default function BoardDetailUI(props: IBoardDetailUIProps) {
  return (
    <S.Wrapper>
      <S.CardWrapper>
        <S.Header>
          <S.AvatarWrapper>
            <S.Avatar src="/images/board/avatar.png" />
            <S.Info>
              <S.Writer>{props.data?.fetchBoard?.writer}</S.Writer>
              <S.CreatedAt>
                {getDate(props.data?.fetchBoard?.createdAt)}
              </S.CreatedAt>
            </S.Info>
          </S.AvatarWrapper>
          <Tooltip
            placement="topRight"
            title={`${props.data?.fetchBoard.boardAddress?.address ?? ""} ${
              props.data?.fetchBoard.boardAddress?.addressDetail ?? ""
            }`}
          ></Tooltip>
        </S.Header>
        <S.Body>
          <S.Title>제목: {props.data?.fetchBoard?.title}</S.Title>
          <S.Contents>{props.data?.fetchBoard?.contents}</S.Contents>
          <S.ImageWrapper>
            {props.data?.fetchBoard?.images
              ?.filter((el: string) => el) // el !== ""  이것과 같은데, el이 빈문자열이 아니면 그것이 true임으로 생략하고 el로 작성한것
              .map((el: string) => (
                <S.Image
                  key={el}
                  src={`https://storage.googleapis.com/${el}`}
                />
              ))}
          </S.ImageWrapper>
        </S.Body>
      </S.CardWrapper>
      <S.BottomWrapper>
        <S.Button onClick={props.onClickMoveToList}>목록으로</S.Button>
        <S.Button onClick={props.onClickMoveToEdit}>수정하기</S.Button>
        <S.Button>삭제하기</S.Button>
      </S.BottomWrapper>
    </S.Wrapper>
  );
}
