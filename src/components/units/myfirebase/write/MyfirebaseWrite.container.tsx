import { addDoc, collection, getFirestore } from "firebase/firestore";
import MyFirebaseWriteUI from "./MyfirebaseWrite.presenter";
import { firebaseApp } from "../../../../commons/libraries/firebase";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";

export default function MyFirebaseWrite() {
  const router = useRouter();
  const [writer, setWriter] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const onClickSubmit = async () => {
    // if (!writer || !title || !contents) {
    //   alert("내용을 입력하세요");
    // }
    const board = await addDoc(collection(getFirestore(firebaseApp), "board"), {
      writer,
      title,
      contents,
    });
    console.log(board);
    alert("게시물이 등록되었습니다!");
    void router.push("/myfirebase");
  };

  const onChageWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
    console.log(e.target.value);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContents = (e: ChangeEvent<HTMLInputElement>) => {
    setContents(e.target.value);
  };

  return (
    <MyFirebaseWriteUI
      onClickSubmit={onClickSubmit}
      onChangeWriter={onChageWriter}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
    ></MyFirebaseWriteUI>
  );
}
