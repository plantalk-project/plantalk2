import { useSwiper } from "swiper/react";

export const SlidePrevButton = () => {
  const swiper = useSwiper();

  return <button onClick={() => swiper.slidePrev()} style={{height:"100px",width:"100px"}}>Prev</button>;
};