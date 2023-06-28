import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { Modal } from "antd";
import BoardCommentWrite from "../write/BoardCommentWrite.container";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoardCommentList.queries";
import * as S from "./BoardCommentList.styles";
import { IBoardCommentListUIItemProps } from "./BoardCommentList.types";
import {
  Mutation,
  MutationDeleteBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import { getDate } from "../../../../commons/libraries/utils";

export default function BoardCommentListUIItem(
  props: IBoardCommentListUIItemProps
) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [myPassword, setMyPassword] = useState("");

  const [deleteBoardComment] = useMutation<
    Pick<Mutation, "deleteBoardComment">,
    MutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);

  const onClickUpdate = () => {
    setIsEdit(true);
  };

  const onClickDelete = async () => {
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickOpenDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const onChangeDeletePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setMyPassword(event.target.value);
  };

  return (
    <>
      {isOpenDeleteModal && (
        <Modal visible={true} onOk={onClickDelete}>
          <div>비밀번호 입력: </div>
          <S.PasswordInput type="password" onChange={onChangeDeletePassword} />
        </Modal>
      )}

      {/* 수정하기가 아닐 때, 댓글 리스트들 */}
      {!isEdit && (
        <S.ItemWrapper>
          <S.FlexWrapper>
            <S.Avatar src="/images/board/avatar.png" />
            <S.MainWrapper>
              <S.WriterWrapper>
                <S.Writer>{props.el?.writer}</S.Writer>
                <S.Star value={props.el?.rating} disabled />
              </S.WriterWrapper>
              <S.Contents>{props.el?.contents}</S.Contents>
            </S.MainWrapper>
            <S.OptionWrapper>
              <S.UpdateIcon
                src="/images/boardComment/list/option_update_icon.png/"
                onClick={onClickUpdate}
              />
              <S.DeleteIcon
                src="/images/boardComment/list/option_delete_icon.png/"
                onClick={onClickOpenDeleteModal}
              />
            </S.OptionWrapper>
          </S.FlexWrapper>
          <S.DateString>{getDate(props.el?.createdAt)}</S.DateString>
        </S.ItemWrapper>
      )}

      {/* 수정하기 창으로 들어왔을 때,  BoardCommentWrite 댓글창 재사용 */}
      {isEdit && (
        <BoardCommentWrite isEdit={true} setIsEdit={setIsEdit} el={props.el} />
      )}
    </>
  );
}

/* 여기서 isEdit 잘 확인
  하나의 컴포넌트를 때에 따라 다르게 사용할때 등록하기/ 수정하기
  이런식일때 isEdit를 true / false로 만들어서 보여줄 것과 보여주지 않을 것 혹은
  버튼 이름을 바꾸거나 할때 사용
*/

/* setIsEdit 사용한 이유
  수정하기 화면에서 수정하기 버튼을 클릭하면 그 부분이 다시 화면의 댓글 리스트로 돌아가야함
  (isEdit가 true 에서 false로 바뀌어야함) - 이 부분이 부모의 상태를 바꿔줘야 하는 상황
  그래서 부모의 setState를 바꿔줘야 하기 때문에 setIsEdit를 사용 - state끌어올리기
  그래서
  이 부분을 부모인 BoardCommentList.container의 onClcikUpdate()에서 
  props.setIsEdit?.(false);로 받아준것


 */
