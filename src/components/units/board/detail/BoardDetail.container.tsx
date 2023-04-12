import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  Mutation,
  MutationDeleteBoardArgs,
  Query,
  QueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";
import BoardDetailUI from "./BoardDetail.presenter";
import { FETCH_BOARD } from "./BoardDetail.query";
import { useState } from "react";

export default function BoardDetail() {
  const [myBoardId, setMyBoardId] = useState("");
  const router = useRouter();

  const { data } = useQuery<Pick<Query, "fetchBoard">, QueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: String(router.query.boardId),
      },
    }
  );
  // const [deleteBoard] = useMutation<
  //   Pick<Mutation, "deleteBoard">,
  //   MutationDeleteBoardArgs
  // >(DELETE_BOARD);

  const onClickMoveToList = () => {
    router.push("/boards");
  };

  const onClickMoveToEdit = () => {
    router.push(`/boards/${router.query.boardId}/edit`);
  };

  // const onClickDeleteBoard = async () => {
  //   await deleteBoard({
  //     variables: {
  //       boardId: myBoardId,
  //     },
  //     refetchQueries: [
  //       {
  //         query: FETCH_BOARD,
  //         variables: { boardId: router.query.boardId }, // 어떤 게시글에 달린 댓글 목록을 불러올지
  //       },
  //     ],
  //   });

  //   router.push("/boards");
  // };

  return (
    <BoardDetailUI
      data={data}
      onClickMoveToList={onClickMoveToList}
      onClickMoveToEdit={onClickMoveToEdit}
      // onClickDeleteBoard={onClickDeleteBoard}
    />
  );
}
