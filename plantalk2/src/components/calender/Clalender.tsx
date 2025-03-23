import React, { useState } from "react";
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

interface getCalenderArrayProps {
  //選択している月
  selectMonth: Date;
}

function Clalender({ selectMonth }: getCalenderArrayProps) {
  const [modalOpen, isModalOpen] = useAtom(modalWindowAtom);
  const [date, setDate] = useAtom(getDateAtom);
  const [month, setMonth] = useAtom(getMonthAtom);

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

  const calenderModal = (date: number) => {
    isModalOpen(true);
    setDate(date);
    setMonth(selectMonth.getMonth() + 1);
  };

  return (
    <div className="calender-container">
      {/* <div className="calender-title-text">{format(date, "y年M月")}</div> */}
      <table className="calender-table">
        <thead>
          <tr className="calender-table-thead-tr">
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
              {weekRow.map((date, index) => (
                //dateの日付標識を変更して出力

                <td
                  key={getDay(date)}
                  onClick={() => calenderModal(getDate(date))}
                  className={
                    index % 2 == 0
                      ? "calender-table-td-even"
                      : "calender-table-td-odd"
                  }
                >
                  <div className="calender-table-td-text">{getDate(date)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clalender;
