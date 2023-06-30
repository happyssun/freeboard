import {
  DocumentData,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import MyFirebaseListUI from "./MyfirebaseList.presenter";
import { firebaseApp } from "../../../../commons/libraries/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MyFirebaseList() {
  const router = useRouter();
  const [dataBoards, setDataBoards] = useState<DocumentData[]>([]);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    const board = collection(getFirestore(firebaseApp), "board");
    const result = await getDocs(board);
    const boards = result.docs.map((el) => el.data());
    setDataBoards(boards);
  };

  const onClickMoveToBoardNew = () => {
    void router.push("/myfirebase/new");
  };

  return (
    <MyFirebaseListUI
      dataBoards={dataBoards}
      onClickMoveToBoardNew={onClickMoveToBoardNew}
    />
  );
}
