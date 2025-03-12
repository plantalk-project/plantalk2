import React from "react";
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

interface getCalenderArrayProps {
  selectMonth:Date;
}

function Clalender({selectMonth}:getCalenderArrayProps) {

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

  const date = new Date();

  //getCalenderArray()の中はdate以外でも大丈夫
  const calender = getCalenderArray(selectMonth);

  const calenderModal = (date:number) => {
    console.log("calenderModal", date);
  }

  return (
    <div >


      {/* <div className="calender-title-text">{format(date, "y年M月")}</div> */}
      <table className="calender-table">
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
              {weekRow.map((date) => (
                //dateの日付標識を変更して出力
                <td key={getDay(date)} onClick={() => calenderModal(getDate(date))}>{getDate(date)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clalender;
