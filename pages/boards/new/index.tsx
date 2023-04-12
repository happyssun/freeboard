import BoardWrite from "../../../src/components/units/board/write/BoardWrite.container";

// http://backendonline.codebootcamp.co.kr/graphql
// args가 있으니 확인 createBoardInput

export default function BoardWritePage() {
  return <BoardWrite isEdit={false}></BoardWrite>;
}
