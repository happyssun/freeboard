import { gql } from "@apollo/client";

// http://backendonline.codebootcamp.co.kr/graphql
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    #타입
    fetchBoard(boardId: $boardId) {
      # 변수 값
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      boardAddress {
        zipcode
        address
        addressDetail
      }
      createdAt
      images
    }
  }
`;

// export const DELETE_BOARD = gql`
//   mutation deleteBoard($boardId: ID!) {
//     deleteBoard(boardId: $boardId)
//   }
// `;
