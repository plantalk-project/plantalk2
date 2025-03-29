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
    <div className="home-area">
      <br></br>
      <div className="Diary_date">
        <span>{month}</span>月<span>{date}</span><span>日</span><span>(月)</span>
      </div>

      <h2 className="settings-title">
  <span className="underline"></span>
</h2>
<div className="diary_text">日記</div>
      <form onSubmit={formName.handleSubmit(handleEvent)}>
        <textarea className = "diary" placeholder="今日起きたことを自由に書いてみよう">

        </textarea>

        <h2 className="settings-title">
  <span className="underline"></span>
</h2>
        <div className="diary_text">植物の健康状態</div>
        <div style={{ display: "flex", justifyContent: "center",　gap:"1em" }}>
          <div className="health-stamp">
            <ReactSVG
              src="/img/dizzy.svg"
              onClick={() => handleClickEmoji(1)}
            />
            <div>よくない</div>
          </div>
          <div className="health-stamp">
            <ReactSVG src="/img/dissatisfied.svg" onClick={() => handleClickEmoji(2)} />
          </div>
          <div className="health-stamp">
            <ReactSVG
            src="/img/satisfied.svg"
            onClick={() => handleClickEmoji(3)}
            />
            <div>ふつう</div>
          </div>
          <div className="health-stamp">
            <ReactSVG src="/img/wink.svg" onClick={() => handleClickEmoji(4)} />
          </div>
          <div className="health-stamp">
            <ReactSVG src="/img/cool.svg" onClick={() => handleClickEmoji(5)} />
            <div>よい</div>
          </div>
        </div>
        <h2 className="settings-title">
  <span className="underline"></span>
</h2>
        <div  className="diary_text">できごと</div>
          <div style={{ display: "flex", justifyContent: "center",　gap:"1em" }}>
            <div className="event-stamp">
              <ReactSVG src="/img/wither.svg" onClick={() => handleClickSave(1)} />
              <div>枯れた</div>
            </div> 
            <div className="event-stamp">
              <ReactSVG
                src="/img/germinated.svg"
                onClick={() => handleClickSave(2)}
              />
              <div>発芽した</div>
              </div>
            <div className="event-stamp">
              <ReactSVG src="/img/bloomed.svg" onClick={() => handleClickSave(3)} />
              <div>咲いた</div>
            </div>
            <div className="event-stamp">
              <ReactSVG src="/img/harvest.svg" onClick={() => handleClickSave(4)} />
              <div>収穫した</div>
            </div>
            <div className="event-stamp">
              <ReactSVG src="/img/plant.svg" onClick={() => handleClickSave(5)} />
              <div>植えた</div>
            </div>
          </div>
        
        <p></p>
        <form style={{ textAlign: "center" }}></form>
        {/* <button onClick={() => handleEvent()}>保存</button> */}
        <a href="" className="btn_03">保存</a>
      </form>
      <p></p>
    </div>
  );
}

export default Diary;
