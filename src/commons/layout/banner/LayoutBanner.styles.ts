import styled from "@emotion/styled";
import Slider from "react-slick";

export const Wrapper = styled.div`
  height: 400px;
  background-color: white;
`;

export const SliderItem = styled.img`
  margin: auto;
  overflow: hidden;
`;


// react-slick의 디자인을 하는 방법
export const StyledSlider = styled(Slider)`

// 도트 위치
  .slick-dots {
    bottom: 15px;
  }

  // 마우스 오버 색상
  .slick-dots li button:before {
    font-family: "slick";
    font-size: 15px;

    /* width: 10px;
      height: 10px; */

    /* content: "•"; */
    color: white;
    opacity: 0.5;
  }
  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: #ffd600;
  }
`;
