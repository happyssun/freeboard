import axios from "axios";
import { useEffect, useState } from "react";
import OpenApiDogsPageUI from "./openapi.dogs.presenter";

export default function OpenApiDogsPage() {
  const [getImgs, setGetImgs] = useState<string[]>([]);

  useEffect(() => {
    const getDogs = async () => {
      new Array(9).fill(1).forEach(async (_) => {
        const response = await axios.get(
          "https://dog.ceo/api/breeds/image/random"
        );
        setGetImgs((prev) => [...prev, response.data.message]);
        // setGetImgs([ response.data.message]);
        // 이렇게 하면 기존꺼에 뒤에오는 자료들이 덮어씌어지고 총 9개가 아닌 한개만 나옴
        // 그래서 (prev) => [...기존 자료에다가 , 더해지게]
      });
    };
    void getDogs();
  }, []);

  return <OpenApiDogsPageUI getImgs={getImgs}></OpenApiDogsPageUI>;
}

// new Array(9).fill(1).map 대신 여기선 forEach 사용
// map은 실행이 끝나면 그 결과를 다시 원래 자리로 리턴 - 끝에 리턴 해주면 그값이 들어감
// 그래서 map은 원본에 내용을 채워주고 싶을때 쓰고 아니면f forEach
// forEach는 리턴이 필요없어 빠르다
