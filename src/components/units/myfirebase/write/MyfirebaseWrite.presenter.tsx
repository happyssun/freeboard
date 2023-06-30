import { IMyFirebaseWriterUIProps } from "./MyfirebaseWrite.types";

export default function MyFirebaseWriteUI(props: IMyFirebaseWriterUIProps) {
  return (
    <div>
      <div>
        작성자: <input type="text" onChange={props.onChangeWriter}></input>
      </div>
      <div>
        제 목: <input type="text" onChange={props.onChangeTitle}></input>
      </div>
      <div>
        내 용: <input type="text" onChange={props.onChangeContents}></input>
      </div>
      <button onClick={props.onClickSubmit}>등록하기</button>
    </div>
  );
}
