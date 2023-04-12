/* eslint-disable @typescript-eslint/no-unused-vars */
import BoardCommentWriteUI from "./BoardCommentWrite.presenter";
import { ChangeEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT } from "./BoardCommentWrite.queries";
import { useRouter } from "next/router";
import { FETCH_BOARD_COMMENTS } from "../list/BoardCommentList.queries";
import {
  Mutation,
  MutationCreateBoardCommentArgs,
} from "../../../../commons/types/generated/types";

export default function BoardCommentWrite() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");

  const [starRate, setStarRate] = useState(0);

  const router = useRouter();

  const [createBoardComment] = useMutation<
    Pick<Mutation, "createBoardComment">,
    MutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

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

    if (writer && password && contents) {
      try {
        const result = await createBoardComment({
          variables: {
            createBoardCommentInput: {
              writer,
              password,
              contents,
              rating: starRate,
            },
            boardId: String(router.query.boardId),
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
    }
    setWriter("");
    setPassword("");
    setContents("");
  };

  return (
    <BoardCommentWriteUI
      onChangeWriter={onChangeWriter}
      onChangePassword={onChangePassword}
      onChangeContents={onChangeContents}
      onClickWrite={onClickWrite}
      writer={writer}
      password={password}
      contents={contents}
      setStarRate={setStarRate}
    />
  );
}
