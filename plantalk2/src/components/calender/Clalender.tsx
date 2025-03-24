import React, { useEffect, useState } from "react";
import "./Calender.css";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDay,
  startOfMonth,
} from "date-fns";
import Modal from "../modal/Modal";
import { useAtom } from "jotai";
import { modalWindowAtom } from "../../atoms/isModal";
import { getDateAtom, getMonthAtom } from "../../atoms/dateAtoms";
import { growthStateAtom } from "../../atoms/growthStateAtom";

interface getCalenderArrayProps {
  //選択している月
  selectMonth: Date;
  setGrowthState: (growthState: { grouth: string; date: Date }[]) => void;
  growthState: { grouth: string; date: Date }[];
}

function Clalender({
  selectMonth,
  setGrowthState,
  growthState,
}: getCalenderArrayProps) {
  const [modalOpen, isModalOpen] = useAtom(modalWindowAtom);
  const [date, setDate] = useAtom(getDateAtom);
  const [month, setMonth] = useAtom(getMonthAtom);

  console.log("growthState", growthState);

  const getCalenderArray = (date: Date) => {
    //1ヶ月分の日曜日の日付を取得
    const sundays = eachWeekOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    });

    //1週間分の日付を取得
    return sundays.map((sunday) =>
      eachDayOfInterval({ start: sunday, end: endOfWeek(sunday) })
    );
  };

  //getCalenderArray()の中はdate以外でも大丈夫
  const calender = getCalenderArray(selectMonth);
  console.log("calender", calender);

  const calenderModal = (date: number) => {
    isModalOpen(true);
    setDate(date);
    setMonth(selectMonth.getMonth() + 1);
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (format(date1,"yyyy-MM-dd") == format(date2,"yyyy-MM-dd") );
  }

  return (
    <div className="calender-container">
      {/* <div className="calender-title-text">{format(date, "y年M月")}</div> */}
      <table>
        <thead>
          <tr>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </tr>
        </thead>
        <tbody>
          {calender.map((weekRow, rowNum) => (
            <tr key={rowNum}>
              {weekRow.map((date, index) => {
                //console.log("date", date.toString());
                //dateの日付標識を変更して出力
                //console.log("growthState", growthState[index]?.date.toString());

                

                return (
                  <td
                    key={getDay(date)}
                    onClick={() => calenderModal(getDate(date))}
                    className="calender-table-td"
                  >
                    <div className="calender-table-td-text">
                      {getDate(date)}
                      {growthState.some((get) => isSameDate(get.date, date)) && <div>🌱</div>}
                    </div>
                    
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clalender;
