import React, { useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlidePrevButton } from "./components/calender/SlideprevButton";
import { SlideNextButton } from "./components/calender/SlideNextButton";
import "swiper/css";
import "swiper/css/pagination";
import Clalender from "./Clalender";
import { addMonths, format } from "date-fns";

function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const initialMonth = new Date();
  const currentMonth = addMonths(initialMonth, slideIndex); // addMonthsでinitialMonthからslideIndex分を加算
  const data: string[] = ["Slide 1", "Slide 2", "Slide 3", "Slide 4"];

  return (
    <>
      <div className="slider-title">成長カレンダー</div>
      <div style={{ marginTop: "30px" }}>
        <Swiper
          spaceBetween={70}
          onSlideChange={(swiper) => {
            console.log("slide change");
            setSlideIndex(swiper.activeIndex - 1);
          }}
          onSwiper={(swiper) => console.log(swiper)}
          //ページネーション
          modules={[Pagination]}
          pagination={{
            type: "fraction",
          }}
          //初期表示
          initialSlide={1}
        >
          {[...Array(5)].map((_, index) => {
            console.log("index", index);
            return (
              <SwiperSlide key={index}>
                <div className="calender-title">
                  <div className="calender-title-text">
                    {format(addMonths(initialMonth, index - 1), "y年M月")}
                  </div>
                  <Clalender selectMonth={addMonths(initialMonth, index - 1)} />
                </div>
              </SwiperSlide>
            );
          })}
          <div>
            <SlidePrevButton />
            <SlideNextButton />
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default Slider;
