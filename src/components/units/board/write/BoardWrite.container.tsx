import { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { CREATE_BOARD, UPDATE_BOARD, UPLOAD_FILE } from "./BoardWrite.queries";
import BoardWriteUI from "./BoardWrite.presenter";
import { IBoardWriteProps, IUpdateBoardInput } from "./BoardWrite.types";
import {
  Mutation,
  MutationCreateBoardArgs,
  MutationUpdateBoardArgs,
} from "../../../../commons/types/generated/types";
import { Modal } from "antd";
import { checkValidationFile } from "../../../commons/uploads/01/uploads01.validation";

export default function BoardWrite(props: IBoardWriteProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [writer, setWriter] = useState("");
  const [pw, setPw] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [writerError, setWriterError] = useState("");
  const [pwError, setPwError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentsError, setContentsError] = useState("");

  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // 파일업로드를 구글에 저장하여 url로 바뀐 파일을 담음 (총 ui를 3개 만들꺼라 배열로 3개)
  const [fileUrls, setFileUrls] = useState(["", "", ""]);

  // 게시판등록
  const [createBoard] = useMutation<
    Pick<Mutation, "createBoard">,
    MutationCreateBoardArgs
  >(CREATE_BOARD);

  // 게시판 업데이트
  const [updateBoard] = useMutation<
    Pick<Mutation, "updateBoard">,
    MutationUpdateBoardArgs
  >(UPDATE_BOARD);

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => {
    setWriter(e.target.value);
    if (e.target.value !== "") {
      setWriterError("");
    }
    if (e.target.value && pw && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangePw = (e: ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    if (e.target.value !== "") {
      setPwError("");
    }
    if (writer && e.target.value && title && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value !== "") {
      setTitleError("");
    }
    if (writer && pw && e.target.value && contents) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
    if (e.target.value !== "") {
      setContentsError("");
    }
    if (writer && pw && title && e.target.value) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const onClickAddressSearch = () => {
    setIsModalOpen(true);
  };

  // 주소검색 모달창 안의 동작
  const onClickModalCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeAddressDetail = (e: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const onCompleteAddressSearch = (data: any) => {
    console.log(data);
    setAddress(data.address);
    setZipcode(data.zonecode); // 콘솔창에서 데이터를 확인해보면 zone코드로 들어가있음
    setIsModalOpen(false);
  };

  // 파일 업로드
  // FileUrls라는 state의 특정 index 값이 구글 스토리지에 올라간 이미지 파일의 url로 바뀌게 됨
  const onChangeFileUrls = (fileUrl: string, index: number) => {
    const newFileUrls = [...fileUrls];
    newFileUrls[index] = fileUrl;
    setFileUrls(newFileUrls);
    console.log(fileUrl);
  };

  // 게시판 등록하기
  const onClickSubmitBtn = async () => {
    if (!writer) {
      setWriterError("Please enter a Writer!");
    }
    if (!pw) {
      setPwError("Please enter a Password!");
    }
    if (!title) {
      setTitleError("Please enter a Ttle!");
    }

    if (!contents) {
      setContentsError("Please enter Contents!");
    }
    if (writer && pw && title && contents) {
      try {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer,
              password: pw,
              title,
              contents,

              boardAddress: {
                zipcode,
                address,
                addressDetail,
              },
            },
          },
        });
        if (typeof result.data?.createBoard._id !== "string") {
          alert("일시적인 오류가 있습니다. 다시 시도해 주세요");
          return;
        }
        alert("게시글이 등록되었습니다!");

        void router.push(`/boards/${result.data?.createBoard._id}`);
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }
  };

  /* 
    수정하기(수정하러가기) 버튼클릭 - edit 페이지로 넘어감
    defaultValue에 의해 기존 작성했던 자료가 그대로 넘어옴
    그렇지만 이것은 input속성이라 눈에 보이기만 할 쭌, 실제로 state에 저장안됨 - 초기값인 빈값이 현재 들어가있음
  */

  // 이게 실제로 수정페이지에서 수정하기 버튼을 클릭했을때의 이벤트
  const onClickUpdateBtn = async () => {
    if (!title && !contents) {
      alert("수정한 내용이 없습니다.");
      return;
    }
    if (!pw) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    // 뮤테이션에 변경된 부분만 보내주기
    // 1. 빈객체를 선언
    // 2.꼭들어가야 할 값이 있다면 { }안에 넣어서 선언해주고 아니면 빈객체로
    const updateBoardInput: IUpdateBoardInput = {};

    // 빈 객체안에 수정에 의해 변경된 값만 객체에 key와 value 추가해주기
    if (title) updateBoardInput.title = title;
    if (contents) updateBoardInput.contents = contents;
    if (zipcode || address || addressDetail) {
      updateBoardInput.boardAddress = {};
      if (zipcode) updateBoardInput.boardAddress.zipcode = zipcode;
      if (address) updateBoardInput.boardAddress.address = address;
      if (addressDetail)
        updateBoardInput.boardAddress.addressDetail = addressDetail;
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId: String(router.query.boardId),
          password: pw,
          updateBoardInput, // 완성된 객체
        },
      });
      if (typeof result.data?.updateBoard._id !== "string") {
        alert("일시적인 오류가 있습니다. 다시 시도해 주세요");
        return;
      }

      alert("게시글이 수정되었습니다!");
      void router.push(`/boards/${result.data?.updateBoard._id}`);
    } catch (error) {
      if (error instanceof Error) {
        // error라는 애가 Error안에 속해 있다면(instanceof)
        alert(error.message);
      }
    }
  };

  return (
    <BoardWriteUI
      isActive={isActive}
      writerError={writerError}
      pwError={pwError}
      titleError={titleError}
      contentsError={contentsError}
      onChangeWriter={onChangeWriter}
      onChangePw={onChangePw}
      onChangeTitle={onChangeTitle}
      onChangeContents={onChangeContents}
      onClickAddressSearch={onClickAddressSearch}
      onChangeAddressDetail={onChangeAddressDetail}
      onCompleteAddressSearch={onCompleteAddressSearch}
      onClickSubmitBtn={onClickSubmitBtn}
      onClickUpdateBtn={onClickUpdateBtn}
      isEdit={props.isEdit}
      data={props.data}
      isModalOpen={isModalOpen}
      onClickModalCancel={onClickModalCancel}
      zipcode={zipcode}
      address={address}
      addressDetail={addressDetail}
      fileUrls={fileUrls}
      onChangeFileUrls={onChangeFileUrls}
    ></BoardWriteUI>
  );
}
