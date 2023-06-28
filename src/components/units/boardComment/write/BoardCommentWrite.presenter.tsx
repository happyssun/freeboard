import * as S from "./BoardCommentWrite.styles";
import { IBoardCommentWriteUIProps } from "./BoardCommentWrite.types";

export default function BoardCommentWriteUI(props: IBoardCommentWriteUIProps) {
  return (
    <S.Wrapper>
      {/* 수정하기 화면일때는 이 아이콘을 안보여 주기위해 */}
      {!props.isEdit && (
        <>
          <S.PencilIcon src="/images/boardComment/write/pencil.png" />
          <span>댓글</span>
        </>
      )}

      <S.InputWrapper>
        <S.Input
          placeholder="작성자"
          type="text"
          onChange={props.onChangeWriter}
          value={props.writer || (props.el?.writer ?? "")}
        />
        <S.Input
          placeholder="비밀번호"
          type="password"
          onChange={props.onChangePassword}
          value={props.password}
        />
        <S.Star onChange={props.setStarRate}></S.Star>
      </S.InputWrapper>
      <S.ContentsWrapper>
        <S.Contents
          onChange={props.onChangeContents}
          maxLength={100}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          value={
            props.isEdit ? props.contents || props.el?.contents : props.contents
          }
        ></S.Contents>

        <S.BottomWrapper>
          <S.ContentsLength>{props.contents.length}/100</S.ContentsLength>

          {/* 댓글 등록하기와 수정하기에 따라 버튼 바뀌게 */}
          <S.Button
            onClick={props.isEdit ? props.onClickUpdate : props.onClickWrite}
          >
            {props.isEdit ? "수정하기" : "등록하기"}
          </S.Button>
        </S.BottomWrapper>
      </S.ContentsWrapper>
    </S.Wrapper>
  );
}

/*
value 값이 있던 이유
  : onClickWrite에서 등록하기 버튼을 눌렀을때 입력한 값들이 사라지게 하기위해 setState("") 빈값을 넣어줬다
    이 비워준 State를 value에 바인딩을 시킨것임

그런데 수정하기 화면에서는 입력값이 유지가 되게 하고싶어 그럼 defalte값을 넣으면 되는데 바인딩한 value가 있네?
value 값이 있으면 defaultValue값은 무의미하기 때문에
그래서 value={props.writer || (props.el?.writer ?? "")} 이렇게 조건부로 값을 넣은것

1.value={props.writer || props.el?.writer || ""}
  - props.writer가 없을 때 props.el?.writer 이게 또 없을때 "빈칸"
2. value={props.isEdit ? props.contents || props.el?.contents : props.contents}
  - isEdit 수정하기면, props.contents를 보여주고 그렇지 않으면 props.el?.contents
*/
