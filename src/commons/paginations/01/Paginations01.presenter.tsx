import { Page } from "./Paginations01.styles";
import { IPaginations01UIProps } from "./Paginations01.types";

export default function Paginations01UI(props: IPaginations01UIProps) {
  return (
    <div>
      <Page onClick={props.onClickPrevPage}> {`<`} </Page>
      {new Array(10).fill(1).map((data, index) => { // 페이지 10개를 맵으로 뿌려줌
        return (
          index + props.startPage <= props.lastPage && (
            <Page
              key={index + props.startPage}
              id={String(index + props.startPage)}
              onClick={props.onClickPage}
              isActive={props.startPage + index === props.activedPage}
              // 페이지가 만들어질때마다 그 페이지가 현재 페이지와 같으면 isActive가 트루 - 그러면 색상을 변화
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
