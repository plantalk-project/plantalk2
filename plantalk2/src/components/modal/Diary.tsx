import React, { useState } from "react";
import { getDateAtom, getMonthAtom } from "../../atoms/dateAtoms";
import { useAtom } from "jotai";
import "./Diary.css";
import { Icon } from "@iconify/react";
import { ReactSVG } from "react-svg";

function Diary() {
  const [date, setDate] = useAtom(getDateAtom);
  const [month, setMonth] = useAtom(getMonthAtom);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const event = {
    emoji: 0,
    growth: 0,
  };

  const clickGetEvent = async (
    event: {
      emoji: number;
      growth: number;
    },
    link: string
  ) => {
    const data = {
      date: date,
      month: month,
      event: event,
    };

    if (event.emoji === 0 && event.growth === 0) {
      alert("選択してください");
      return;
    }

    try {
      const response = await fetch(link, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify(data),
      });
      console.log("data", data);
      const result = await response.json();
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClickEmoji = (emoji: number) => {
    event.emoji = emoji;
    console.log("event", event.emoji);
  };

  const handleClickSave = async (data: number) => {
    event.growth = data;
    console.log("event", event.growth);
  };

  const handleEvent = () => {
    clickGetEvent(event, "http://localhost:3003/calendar");
  };

  return (
    <div>
      <div>
        <span>{month}</span>月<span>{date}</span>日
      </div>
      <div>この日の振り返り</div>
      <div>水やり</div>
      <div>植物の健康状態</div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ReactSVG
          src="/img/dissatisfied.svg"
          onClick={() => handleClickEmoji(1)}
        />
        <ReactSVG src="/img/dizzy.svg" onClick={() => handleClickEmoji(2)} />
        <ReactSVG
          src="/img/satisfied.svg"
          onClick={() => handleClickEmoji(3)}
        />
        <ReactSVG src="/img/wink.svg" onClick={() => handleClickEmoji(4)} />
        <ReactSVG src="/img/cool.svg" onClick={() => handleClickEmoji(5)} />
      </div>
      <span>できごと</span>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ReactSVG src="/img/wither.svg" onClick={() => handleClickSave(1)} />
        <ReactSVG src="/img/germinated.svg" onClick={() => handleClickSave(2)} />
        <ReactSVG src="/img/bloomed.svg" onClick={() => handleClickSave(3)} />
        <ReactSVG src="/img/harvest.svg" onClick={() => handleClickSave(4)} />
        <ReactSVG src="/img/plant.svg" onClick={() => handleClickSave(5)} />
      </div>
      <button onClick={() => handleEvent()}>保存</button>
    </div>
  );
}

export default Diary;
