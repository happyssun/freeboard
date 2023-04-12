import { getDate } from "../../../../commons/libraries/utils";
import * as S from "./BoardCommentList.styles";
import { IBoardCommentListUIProps } from "./BoardCommentList.types";

export default function BoardCommentListUI(props: IBoardCommentListUIProps) {
  return (
    <>
      {props.isOpenDeleteModal && (
        <S.PasswordModal
          visible={true}
          onOk={props.onClickDelete}
          onCancel={props.onClickCloseModal}
        >
          <div>비밀번호를 입력하세요:</div>
          <S.PasswordInput
            type="password"
            onChange={props.onChangeDeletePassword}
          ></S.PasswordInput>
        </S.PasswordModal>
      )}

      {props.data?.fetchBoardComments.map((el) => (
        <S.ItemWrapper key={el._id}>
          <S.FlexWrapper>
            <S.Avatar src="/images/board/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{el.writer}</S.Writer>
                <S.Star value={el.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>{el.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon src="/images/boardComment/list/option_update_icon.png/" />
              <S.DeleteIcon
                id={el._id}
                onClick={props.onClickOpenDeleteModal}
                src="/images/boardComment/list/option_delete_icon.png/"
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(el?.createdAt)}</S.DateString>
        </S.ItemWrapper>
      ))}
    </>
  );
}
