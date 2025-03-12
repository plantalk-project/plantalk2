import { useSwiper } from "swiper/react";

export const SlideNextButton = () => {
  const swiper = useSwiper();

  return <button onClick={() => swiper.slideNext()} style={{height:"100px",width:"100px"}}>Next</button>;
};