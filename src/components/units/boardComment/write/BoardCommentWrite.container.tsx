import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  CREATE_BOARD_COMMENT,
  UPDATE_BOARD_COMMENT,
} from "./BoardCommentWrite.queries";

import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";

import {
  Mutation,
  MutationCreateBoardCommentArgs,
  MutationUpdateBoardCommentArgs,
} from "../../../../commons/types/generated/types";
import {
  IBoardCommentWriteProps,
  IUpdateBoardCommentInput,
} from "./BoardCommentWrite.types";
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";

export default function BoardCommentWrite(props: IBoardCommentWriteProps) {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [starRate, setStarRate] = useState(0);

  const [createBoardComment] = useMutation<
    Pick<Mutation, "createBoardComment">,
    MutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const [updateBoardComment] = useMutation<
    Pick<Mutation, "updateBoardComment">,
    MutationUpdateBoardCommentArgs
  >(UPDATE_BOARD_COMMENT);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const onClickWrite = async () => {
    if (typeof router.query.boardId !== "string") return;

    try {
      await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating: starRate,
          },
          boardId: router.query.boardId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: router.query.boardId },
          },
        ],
      });
      alert("댓글이 등록되었습니다!");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }

    // 등록하기 버튼 눌러서 등록이 되고나면, 작성한 내용이 사라지게 하기 위해서 ""를 setState에 넣음
    setWriter("");
    setPassword("");
    setContents("");
  };

  const onClickUpdate = async () => {
    if (!contents) {
      alert("수정된 내용이 없습니다!");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      const updateBoardCommentInput: IUpdateBoardCommentInput = {};
      if (contents) updateBoardCommentInput.contents = contents;
      // 별점이 기존에 있던것과 같은지 다른지 확인해서 다를때만 추가해서 바뀌게
      if (starRate !== props.el?.rating)
        updateBoardCommentInput.rating = starRate;

      if (typeof props.el?._id !== "string") return;
      await updateBoardComment({
        variables: {
          updateBoardCommentInput,
          password,
          boardCommentId: props.el?._id,
        },
        // db에 변경된것이 화면에서도 바뀌게 리패치
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: {
              boardId: router.query.boardId,
            },
          },
        ],
      });

      // 수정하기 버튼을 클릭하면 수정하기 화면에서 원래의 댓글리스트로 돌아가야 한다
      // boardCommentList.presenterItem인 자식에서 현재의 부모로 state끌어올리기 해야함
      // 부모의 setState변경  - 자식에서 setIsEdit={setIsEdit}를 해주고 이것을 props로 받아옴
      // props.setIsEdit가 있으면 (false)를 넣어줘
      props.setIsEdit?.(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <BoardCommentWriteUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      onClickUpdate={onClickUpdate}
      writer={writer}
      password={password}
      contents={contents}
      setStarRate={setStarRate}
      isEdit={props.isEdit}
      // BoardCommentlist에서 수정하기 버튼 눌렀을때
      // 기존의 등록하기에서 수정하기로 보여지게 하기위해 isEdit를 props로 받아와서 이걸 UI에 다시 넘겨줌
      el={props.el}
    />
  );
}
