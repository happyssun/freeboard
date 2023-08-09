import BoardListUI from "./BoardList.presenter";
import { useQuery } from "@apollo/client";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "./BoardList.queries";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import {
  Query,
  QueryFetchBoardsArgs,
  QueryFetchBoardsCountArgs,
} from "../../../../commons/types/generated/types";

export default function BoardList() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  // 페이지네이션 안에서 페이지가 변경될때마다 refatch해야 하는데
  // 페이지네이션은 자식에 있어야 다른 페이지에서도 적용이 가능하다(페이지네이션 페이지:props로)
  // 그렇기 때문에 게시판 데이터를 가져오는것을 부모인 여기에서 실행하는것

  // 데이터를 받아오기 위해 data , 이 fetch를 다시하고 싶다 refetch
  const { data, refetch } = useQuery<
    Pick<Query, "fetchBoards">,
    QueryFetchBoardsArgs
  >(FETCH_BOARDS);

  // 위 data의 총 갯수가 있어야 페이지네이션 처리가 가능하다
  // 그래서 fetchBoardsCount를 가져온것이고.. data가 이름이 같으면 안되어서 다른 이름으로 붙여줌
  const { data: dataBoardsCount, refetch: refetchBoardsCount } = useQuery<
    Pick<Query, "fetchBoardsCount">,
    QueryFetchBoardsCountArgs
  >(FETCH_BOARDS_COUNT);

  const onChangeKeyword = (value: string): void => {
    setKeyword(value);
  };

  const onClickMoveToBoardNew = () => {
    void router.push("/boards/new");
  };

  const onClickMoveToBoardDetail = (e: MouseEvent<HTMLDivElement>) => {
    void router.push(`/boards/${e.currentTarget.id}`);
  };

  return (
    <BoardListUI
      data={data}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
      onClickMoveToBoardDetail={onClickMoveToBoardDetail}
      refetch={refetch}
      count={dataBoardsCount?.fetchBoardsCount}
      refetchBoardsCount={refetchBoardsCount}
      keyword={keyword}
      onChangeKeyword={onChangeKeyword}
    />
  );
}
