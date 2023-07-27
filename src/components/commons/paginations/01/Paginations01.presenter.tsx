import { Page } from "./Paginations01.styles";
import { IPaginations01UIProps } from "./Paginations01.types";

export default function Paginations01UI(props: IPaginations01UIProps) {
  return (
    <div>
      <Page onClick={props.onClickPrevPage}> {`<`} </Page>
      {new Array(10).fill(1).map((_, index) => {
        // 페이지 10개를 맵으로 뿌려줌 여기에선el값을 안쓰고 인덱스값을 사용해서 el대신_
        return (
          index + props.startPage <= props.lastPage && (
            <Page
              key={index + props.startPage}
              id={String(index + props.startPage)}
              onClick={props.onClickPage}
              isActive={props.startPage + index === props.activedPage}
              // 페이지가 만들어질때마다 그 페이지가 현재 페이지와 같으면 isActive가 트루 - 그러면 색상을 변화
              // isActive state 값은 1페이지 그다음에 생성되는것은 2번 근데 1페이지가 아니니까 2번은 색상변화없음
            >
              {index + props.startPage}
            </Page>
          )
        );
      })}

      <Page onClick={props.onClickNextPage}> {`>`} </Page>
    </div>
  );
}
