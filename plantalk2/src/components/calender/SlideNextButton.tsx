import { ReactSVG } from "react-svg";
import { useSwiper } from "swiper/react";

export const SlideNextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      style={{ background:"none",border:"none" }}
    >
      <ReactSVG src="/img/transition.svg"/>
    </button>
  );
};
