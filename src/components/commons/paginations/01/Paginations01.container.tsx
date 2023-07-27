import { useState, MouseEvent } from "react";
import Paginations01UI from "./Paginations01.presenter";
import { IPaginations01Props } from "./Paginations01.types";

export default function Paginations01(props: IPaginations01Props) {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1); // 현재 페이지에 색상을 주기위해
  const lastPage = props.count != null ? Math.ceil(props.count / 10) : 0;

  // 현재 페이지
  const onClickPage = (e: MouseEvent<HTMLSpanElement>) => {
    const activedPage = Number(e.currentTarget.id);
    setActivedPage(activedPage);
    void props.refetch({ page: activedPage });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return; // 1페이지 이전은 이동안되게 하기위해 바로 리턴문적용
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);
    void props.refetch({ page: startPage - 10 });
  };

  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      // 마지막페이지가 10개가 안되면 안넘어가게
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);
      void props.refetch({ page: startPage + 10 });
      console.log(startPage + 10);
    }
  };

  return (
    <Paginations01UI
      startPage={startPage}
      lastPage={lastPage}
      activedPage={activedPage}
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
    ></Paginations01UI>
  );
}
