import { ChangeEvent, useEffect, useRef, useState } from "react";
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
    setIsModalOpen((prev) => !prev);
  };

  // 파일 업로드
  // FileUrls라는 state의 특정 index 값이 구글 스토리지에 올라간 이미지 파일의 url로 바뀌게 됨
  // fileUrl은 파일이름이 될것이고 index는 그 배열의 넘버가 될것
  // 예로 강아지.jpg 파일을 세번째 업로드버튼에 업로드 했다고 가정하고
  const onChangeFileUrls = (fileUrl: string, index: number) => {
    // 스프레드 연산자로 가져옴. 그렇지 않고 fileUrls를 그냥 바꾸면 원본 자체가 바뀌는 문제가 생김
    const newFileUrls = [...fileUrls]; // [...fileUrls]은 위의 state에 있는 ["","",""]
    newFileUrls[index] = fileUrl; // ["","","강아지.jpg"]
    setFileUrls(newFileUrls); // ["","","강아지.jpg"]로 setState가 변경되고 리렌더가 될것임
    console.log(fileUrl);
  };

  // 게시판의 수정하기 버튼클릭으로 수정하기 화면에 들어왔을때 등록했던 이미지가 처음 등록하기처럼 보여지게 하기위해
  // 디폴트값을 넣어줘야하는데 이름,내용과 같은식으로 디폴트값을 넣기가 힘듬 그래서 useState부분에 처음부터 값을 넣어줌 디폴트가 된다
  // 그래서 여기에 useEffect를 사용 한 것
  // ~images?.length -- 이미지가 있으면(length는 길이니깐 이게 있으면 이미지가 있다는뜻)
  // 그 이미지들을 setFileUrls에 넣어줘 -- 디폴트값을 넣어주란 얘기
  useEffect(() => {
    if (props.data?.fetchBoard.images?.length) {
      setFileUrls([...props.data?.fetchBoard.images]);
    }
  }, [props.data]);

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
              images: [...fileUrls],
            },
          },
        });
        if (typeof result.data?.createBoard._id !== "string") {
          alert("일시적인 오류가 있습니다. 다시 시도해 주세요");
          return;
        }
        alert("게시글이 등록되었습니다!");
        console.log(router.query.boardId);

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
    // 업로드한 파일의 현재와 기본값이 같은지 다른지 확인
    // 두개가 내용은 같다 하더라도 이것은 안의 내용만 같을뿐 주소가 같지 않다 - 비교대상은 주소기에 오류발생
    // 배열이나 객체의 값을 비교할때는 그 값을 JSON.stringify로 만들어(문자열로 변경하여) 상수에 넣어 확인하게 하고
    // 그 상수를 서로 비교하여 같은지를 확인하는것
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles; // 현재파일과 기본파일값이 같니??

    if (
      !title &&
      !contents &&
      !address &&
      !addressDetail &&
      !addressDetail &&
      !zipcode &&
      !isChangedFiles
    ) {
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
    if (isChangedFiles) updateBoardInput.images = fileUrls;

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
