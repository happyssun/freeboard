import { Button } from "antd";
import { IMyFirebaseWriterUIProps } from "./MyfirebaseWrite.types";
import { MyInput, Wrapper } from "./MyfirebaseWrite.styles";

export default function MyFirebaseWriteUI(props: IMyFirebaseWriterUIProps) {
  return (
    <Wrapper>
      <div>
        작성자: <MyInput type="text" onChange={props.onChangeWriter}></MyInput>
      </div>
      <div>
        제 목: <MyInput type="text" onChange={props.onChangeTitle}></MyInput>
      </div>
      <div>
        내 용: <MyInput type="text" onChange={props.onChangeContents}></MyInput>
      </div>
      <Button
        type="primary"
        style={{ margin: "20px" }}
        onClick={props.onClickSubmit}
      >
        등록하기
      </Button>
    </Wrapper>
  );
}
