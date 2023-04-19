
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderItem, StyledSlider, Wrapper } from "./LayoutBanner.styles";

export default function LayoutBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <StyledSlider {...settings}>
        <div>
          <SliderItem src="/images/layout/image01.png"></SliderItem>
        </div>
        <div>
          <SliderItem src="/images/layout/image03.png"></SliderItem>
        </div>
      </StyledSlider>
    </Wrapper>
  );
}
