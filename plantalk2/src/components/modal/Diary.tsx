import React, { useState } from "react";
import { getDateAtom, getMonthAtom } from "../../atoms/dateAtoms";
import { useAtom } from "jotai";
import "./Diary.css";
import { Icon } from "@iconify/react";
import { ReactSVG } from "react-svg";
import { growthStateAtom } from "../../atoms/growthStateAtom";
import Input from "../../layout/Input";
import { useForm } from "react-hook-form";

function Diary() {
  const [date, setDate] = useAtom(getDateAtom);
  const [month, setMonth] = useAtom(getMonthAtom);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [growthState, setGrowthState] = useAtom(growthStateAtom);
  const formName = useForm();
  const event = {
    emoji: 0,
    growth: 0,
    diary:""
  };

  const clickGetEvent = async (
    event: {
      emoji: number;
      growth: number;
      diary:string;
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

    console.log("event",event)

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
      const now = new Date();
      const nowYear = now.getFullYear();

      console.log("data", data);
      const result = await response.json();
      console.log("result", result);

      if (month && date) {
        const SaveData = new Date(nowYear, month - 1, date);
        console.log("SaveData", SaveData);
        setGrowthState((prev) => [
          ...prev,
          { grouth: event.growth.toString(), date: SaveData },
        ]);
      }
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

  const handleEvent = (data:{diary:string}) => {
    //setGrowthState((prev) => [...prev, {grouth:event.growthState, date:event.recorrdedAt}]);
    event.diary = data.diary
    clickGetEvent(event, "http://localhost:3003/calendar");
    console.log("formName.register",typeof data.diary)
  };

  return (
    <div>
      <div>
        <span>{month}</span>月<span>{date}</span>日
      </div>
      <form onSubmit={formName.handleSubmit(handleEvent)}>
        <Input
          label={"今日起きたことを自由に書いてみよう"}
          fieldName={"diary"}
          id={"1"}
          register={formName.register}
        />
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
          <ReactSVG
            src="/img/germinated.svg"
            onClick={() => handleClickSave(2)}
          />
          <ReactSVG src="/img/bloomed.svg" onClick={() => handleClickSave(3)} />
          <ReactSVG src="/img/harvest.svg" onClick={() => handleClickSave(4)} />
          <ReactSVG src="/img/plant.svg" onClick={() => handleClickSave(5)} />
        </div>
        
        {/* <button onClick={() => handleEvent()}>保存</button> */}
        <button type="submit">保存</button>
      </form>
    </div>
  );
}

export default Diary;
