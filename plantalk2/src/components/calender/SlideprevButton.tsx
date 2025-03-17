import { ReactSVG } from "react-svg";
import { useSwiper } from "swiper/react";

export const SlidePrevButton = () => {
  const swiper = useSwiper();

  // return <button onClick={() => swiper.slidePrev()} style={{height:"100px",width:"100px"}}>Prev</button>;

  return (
    <button
      onClick={() => swiper.slidePrev()}
      style={{
        background: "none",
        border: "none",
      }}
    >
      <ReactSVG src="/img/transitionLocate.svg" />
    </button>
  );
};
