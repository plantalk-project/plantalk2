import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlidePrevButton } from "../components/calender/SlideprevButton";
import { SlideNextButton } from "../components/calender/SlideNextButton";
import "swiper/css";
import Clalender from "../components/calender/Clalender";
import { addMonths, format } from "date-fns";
import Modal from "../components/modal/Modal";
import { useAtom } from "jotai";
import { modalWindowAtom } from "../atoms/isModal";
import "./Slider.css";
import { growthStateAtom } from "../atoms/growthStateAtom";
function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);
  const initialMonth = new Date();
  const [modalOpen, isModalOpen] = useAtom(modalWindowAtom);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [growthState, setGrowthState] = useAtom(growthStateAtom);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:3003/calendar/getCalendar",
          {
            //チャットのAPIを呼び出す
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();
        console.log("data.eventHistory",data.eventHistory)
        
        //setGrowthState(data.eventHistory);
        data.eventHistory.forEach((event) => {
          console.log("event", event);
          const dateObject = new Date(event.recordedAt);
          setGrowthState((prev) => [...prev, {grouth:event.growthState.toString(), date:dateObject}]);
        });
        console.log("取得したチャット履歴:", data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchChatHistory();

    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  console.log("token", token);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#42695A",
        marginTop: "0",
      }}
    >
      {modalOpen && (
        <div className="modalOverlay" onClick={() => isModalOpen(false)} />
      )}
      <div className="slider-title">成長カレンダー</div>
      <div>
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
                  <div className="square-left" />
                  <div className="square-right" />
                  <div className="square-top" />

                  <div className="calender-title-text-container">
                    <div className="slider-prev-button">
                      <SlidePrevButton />
                    </div>
                    <div className="calender-title-text">
                      {format(addMonths(initialMonth, index - 1), "y年M月")}
                    </div>

                    <div className="slider-next-button">
                      <SlideNextButton />
                    </div>
                  </div>

                  <Clalender
                    selectMonth={addMonths(initialMonth, index - 1)}
                    setGrowthState={setGrowthState}
                    growthState={growthState}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="form">
        <Modal />
      </div>
    </div>
  );
}

export default Slider;
