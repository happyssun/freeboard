import { ChangeEvent, MouseEvent, useState } from "react";
import BoardCommentListUI from "./BoardCommentList.presenter";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoardCommentList.queries";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import {
  Mutation,
  MutationDeleteBoardCommentArgs,
  Query,
  QueryFetchBoardCommentsArgs,
} from "../../../../commons/types/generated/types";

export default function BoardCommentList() {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [myBoardCommentId, setMyBoardCommentId] = useState("");
  const [myPassword, setMyPassword] = useState("");
  const router = useRouter();

  if (typeof router.query.boardId !== "string") {
    alert("올바르지 않은 게시글 아이디입니다.");
    void router.push("/");
    return <></>;
  }

  const [deleteBoardComment] = useMutation<
    Pick<Mutation, "deleteBoardComment">,
    MutationDeleteBoardCommentArgs
  >(DELETE_BOARD_COMMENT);

  const { data } = useQuery<
    Pick<Query, "fetchBoardComments">,
    QueryFetchBoardCommentsArgs
  >(FETCH_BOARD_COMMENTS, {
    variables: {
      boardId: router.query.boardId,
    },
  });

  const onClickDelete = async (e: MouseEvent<HTMLElement>) => {
    if (!(e.target instanceof HTMLElement)) return;
    try {
      await deleteBoardComment({
        variables: {
          password: myPassword,
          boardCommentId: myBoardCommentId, // 어떤 댓글을 삭제할지
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId }, // 어떤 게시글에 달린 댓글 목록을 불러올지
          },
        ],
      });
      setIsOpenDeleteModal(false);
    } catch (error) {
      // error 타입이 녹색인 Error안에 속해있다면
      if (error instanceof Error) alert(error.message);
      setIsOpenDeleteModal(true);
    }
  };
  const onClickOpenDeleteModal = (e: MouseEvent<HTMLImageElement>) => {
    if (!(e.target instanceof HTMLImageElement)) return;
    setMyBoardCommentId(e.target.id);
    setIsOpenDeleteModal(true);
  };

  const onClickCloseModal = (e: MouseEvent<HTMLElement>) => {
    setIsOpenDeleteModal(false);
  };

  const onChangeDeletePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setMyPassword(e.target.value);
  };
  // const onClickCommentWriter = (e: MouseEvent<HTMLDivElement>) => {
  //   e.stopPropagation(); //이벤트 버블링 막음
  //   alert(`${e.currentTarget.id} 님이 작성한 글입니다.`);
  // };

  return (
    <BoardCommentListUI
      data={data}
      onClickDelete={onClickDelete}
      isOpenDeleteModal={isOpenDeleteModal}
      onClickOpenDeleteModal={onClickOpenDeleteModal}
      onChangeDeletePassword={onChangeDeletePassword}
      onClickCloseModal={onClickCloseModal}
    ></BoardCommentListUI>
  );
}
