import BoardWrite from "../../../../src/components/units/board/write/BoardWrite.container";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import {
  Query,
  QueryFetchBoardArgs,
} from "../../../../src/commons/types/generated/types";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;

// 수정하기 화면으로 들어오면 기존에 작성되어있던 데이터가 보여짐
export default function BoardEditPage() {
  const router = useRouter();

  // boardId의 타입을 아주 정확히 하고 싶으면, (그냥 이걸 string으로 해줘도 되지만)
  // 이런식으로 boardId가 string이 아닐경우 빈페이지가 잠시 보이게.. 해줘도 좋음
  if (typeof router.query.boardId !== "string") {
    router.push("/");
    return;
  }

  const { data } = useQuery<Pick<Query, "fetchBoard">, QueryFetchBoardArgs>(
    FETCH_BOARD,
    {
      variables: {
        boardId: router.query.boardId,
      },
    }
  );

  return (
    <>
      <BoardWrite isEdit={true} data={data} />
    </>
  );
}
