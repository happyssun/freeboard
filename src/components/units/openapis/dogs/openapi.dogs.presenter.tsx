import { Wrapper, ImgBox, DogImg } from "./openapi.dogs.styled";
import { IOpenApiDogsPageUIProps } from "./openapi.dogs.types";

export default function OpenApiDogsPageUI(props: IOpenApiDogsPageUIProps) {
  console.log(props.getImgs);
  return (
    <Wrapper>
      <div>
        {props.getImgs.map((el, index) => (
          <>
            <ImgBox key={el}>
              <DogImg src={el} />
              <span>{`강아지${index + 1}.jpg`}</span>
            </ImgBox>
          </>
        ))}
        ;
      </div>
    </Wrapper>
  );
}
