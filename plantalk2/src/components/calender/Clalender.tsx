import React, { useEffect, useMemo, useState } from "react";
import "./Calender.css";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDay,
  getMonth,
  startOfDay,
  startOfMonth,
} from "date-fns";
import Modal from "../modal/Modal";
import { useAtom } from "jotai";
import { modalWindowAtom } from "../../atoms/isModal";
import { getDateAtom, getMonthAtom } from "../../atoms/dateAtoms";
import { growthStateAtom } from "../../atoms/growthStateAtom";
import { ReactSVG } from "react-svg";

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

  //console.log("growthState", growthState);

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
  //console.log("calender", calender);

  const calenderModal = (date: number, month: number) => {
    console.log("month", month);
    isModalOpen(true);
    setDate(date);
    setMonth(month + 1);
  };

  // const isSameDate = (date1: Date, date2: Date, grouth: string) => {
  //   console.log("grouth", grouth);

  //   if (grouth == "1") {
  //     return format(date1, "yyyy-MM-dd") == format(date2, "yyyy-MM-dd");
  //   }

  // };

  const wither = "/img/wither_calendar.svg";

  const growthMap = useMemo(() => {
    const map = new Map();

    growthState.forEach((entry) => {
      if (entry.grouth == "1") {
        const key = format(startOfDay(entry.date), "yyyy-MM-dd");
        map.set(key, 1);
      }
      if (entry.grouth == "2") {
        const key = format(startOfDay(entry.date), "yyyy-MM-dd");
        map.set(key, 2);
      }
      if (entry.grouth == "3") {
        const key = format(startOfDay(entry.date), "yyyy-MM-dd");
        map.set(key, 3);
      }
      if (entry.grouth == "4") {
        const key = format(startOfDay(entry.date), "yyyy-MM-dd");
        map.set(key, 4);
      }
      if (entry.grouth == "5") {
        const key = format(startOfDay(entry.date), "yyyy-MM-dd");
        map.set(key, 5);
      }
    });
    //console.log("map", map);
    return map;
  }, [growthState]);

  const color = "#5BC8AC";

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
                const key = format(date, "yyyy-MM-dd");
                //console.log("date",date)
                return (
                  <td
                    key={getDay(date)}
                    onClick={() => calenderModal(getDate(date), getMonth(date))}
                    className="calender-table-td"
                  >
                    <div className="calender-table-td-text">
                      {getDate(date)}
                      {/* 一致した日付に🌱を表示 */}

                      <div className="calender-icon">
                        {growthMap.get(key) == 1 ? (
                          <img src="/img/wither_calendar.svg" />
                        ) : growthMap.get(key) == 2 ? (
                          <img src="/img/germinated_calendar.svg" />
                        ) : growthMap.get(key) == 3 ? (
                          <img src="/img/bloomed_calendar.svg" />
                        ) : growthMap.get(key) == 4 ? (
                          <img src="/img/harvest_calendar.svg" />
                        ) : growthMap.get(key) == 5 ? (
                          <img src="/img/plant_calendar.svg" />
                        ) : (
                          <> </>
                        )}
                      </div>
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
