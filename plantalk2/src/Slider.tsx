import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlidePrevButton } from "./components/calender/SlideprevButton";
import { SlideNextButton } from "./components/calender/SlideNextButton";
import "swiper/css";
import "swiper/css/pagination";

function Slider() {
  const data: string[] = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];
  return (
    <div>
      <Swiper
        spaceBetween={60}
        centeredSlides={true}
        slidesPerView={2}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        //ページネーション
        modules={[Pagination]}
        pagination={{
          type: "fraction",
        }}

        //初期表示
        initialSlide={1}
      >
        {data.map((d,index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                background: "grey",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {d}
            </div>
          </SwiperSlide>
        ))}
        <div>
          <SlidePrevButton />
          <SlideNextButton />
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
