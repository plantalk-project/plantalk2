import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlidePrevButton } from "../components/calender/SlideprevButton";
import { SlideNextButton } from "../components/calender/SlideNextButton";
import "swiper/css";
import "swiper/css/pagination";
import Clalender from "../components/calender/Clalender";
import { addMonths, format } from "date-fns";
import Modal from "../components/modal/Modal";
import { useAtom } from "jotai";
import { modalWindowAtom } from "../atoms/isModal";
import "./Slider.css";
function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const initialMonth = new Date();
  const [modalOpen, isModalOpen] = useAtom(modalWindowAtom);

  return (
    <div style={{ width: "100%" }}>
      {modalOpen && (
        <div className="modalOverlay" onClick={() => isModalOpen(false)} />
      )}
      <div className="slider-title">成長カレンダー</div>
      <div style={{ marginTop: "30px" }}>
        <Swiper
          spaceBetween={70}
          onSlideChange={(swiper) => {
            console.log("slide change");
            setSlideIndex(swiper.activeIndex - 1);
          }}
          onSwiper={(swiper) => console.log(swiper)}
          initialSlide={1}
        >
          {[...Array(5)].map((_, index) => {
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
          <div className="slider-prev-button">
            <SlidePrevButton />
          </div>
          <div className="slider-next-button">
            <SlideNextButton />
          </div>
        </Swiper>
      </div>
      <div className="form">
        <Modal />
      </div>
    </div>
  );
}

export default Slider;
