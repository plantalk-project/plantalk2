import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlidePrevButton } from "../components/calender/SlideprevButton";
import { SlideNextButton } from "../components/calender/SlideNextButton";
import "swiper/css";
import Clalender from "../components/calender/Clalender";
import { addMonths, format, getDate, getMonth } from "date-fns";
import Modal from "../components/modal/Modal";
import { useAtom } from "jotai";
import { modalWindowAtom } from "../atoms/isModal";
import "./Slider.css";
import { growthStateAtom } from "../atoms/growthStateAtom";
import Popota from "../components/Popota";
import Title from "./Title";
import PlanTalk from "../components/Plantalk";

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
            `${import.meta.env.VITE_API_URL}/calendar/getCalendar`,
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
        console.log("data",data)

        //setGrowthState(data.eventHistory);
        data.eventHistory.forEach((event) => {
          console.log("event",event.recordedAt);
          const dateObject = new Date(Date.UTC(
            new Date(event.recordedAt).getUTCFullYear(),
            new Date(event.recordedAt).getUTCMonth(),
            new Date(event.recordedAt).getUTCDate()
          ));
          console.log("dateObject",dateObject)

          setGrowthState((prev) => [
            ...prev,
            { grouth: event.growthState.toString(), date: dateObject },
          ]);
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

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        
      }}
    >
      {modalOpen && (
        <div className="modalOverlay" onClick={() => isModalOpen(false)} />
      )}
      <div className="slider-title"><PlanTalk/></div>
      <div >
        <Swiper
          spaceBetween={70}
          onSlideChange={(swiper) => {
            setSlideIndex(swiper.activeIndex - 1);
          }}
          onSwiper={(swiper) => console.log(swiper)}
          initialSlide={1}
          style={{paddingTop:"3vw"}}
        >
          {[...Array(5)].map((_, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="calender-title">
                  <div className="square-left" />
                  <div className="square-right" />
                  <div className="square-top">
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
      <div className="popota">
        <Popota />
      </div>
      <div className="form">
        <Modal />
      </div>
    </div>
  );
}

export default Slider;
