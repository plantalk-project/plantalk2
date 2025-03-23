import React from "react";
import { getDateAtom, getMonthAtom } from "../../atoms/dateAtoms";
import { useAtom } from "jotai";
import "./Diary.css";
import { Icon } from "@iconify/react";
import { ReactSVG } from "react-svg";

function Diary() {
  const [date, setDate] = useAtom(getDateAtom);
  const [month, setMonth] = useAtom(getMonthAtom);

  const handleClickEmoji = (emoji: string) => {
    console.log("emoji", emoji);
    
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
          onClick={() => handleClickEmoji("dissatisfied")}
        />
        <ReactSVG src="/img/dizzy.svg" onClick={() => handleClickEmoji("dizzy")} />
        <ReactSVG src="/img/satisfied.svg" onClick={() => handleClickEmoji("satisfied")} />
        <ReactSVG src="/img/wink.svg" onClick={() => handleClickEmoji("wink")} />
        <ReactSVG src="/img/cool.svg" onClick={() => handleClickEmoji("cool")} />
      </div>
    </div>
  );
}

export default Diary;
