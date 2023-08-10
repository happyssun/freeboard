import { gql } from "@apollo/client";

// 여기서의 search는 검색한것만 조회해줘
export const FETCH_BOARDS = gql`
  query fetchBoards($page: Int, $search: String) {
    fetchBoards(page: $page, search: $search) {
      _id
      writer
      title
      createdAt
    }
  }
`;

// 여기서는 전체게시글중에 검색한것이 들어간 수를 위한 것
export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($search: String) {
    fetchBoardsCount(search: $search)
  }
`;
