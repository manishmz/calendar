import React, { useState } from "react";

const Calendar = () => {
  let todaysDate = new Date();
  let [year, changeYear] = useState(todaysDate.getFullYear());
  let [monthInd, changeMonthInd] = useState(todaysDate.getMonth() + 1);
  let [selectedDate, changeDate] = useState(todaysDate.getDate());
  let weekR = 0,
    weekCol = 0;
  const yearAdd = () => {
    if (year < 2050) {
      changeYear(year + 1);
    }
  };

  const yearSub = () => {
    if (year > 2010) {
      changeYear(year - 1);
    }
  };

  const selectMonth = (mon) => {
    const ind = months.indexOf(mon);
    if (ind === -1) {
      return;
    }
    changeMonthInd(ind + 1);
  };

  var days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  var months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let selectedMonth = months[monthInd - 1];

  let monthDays = monthInd === 0 ? 31 : new Date(year, monthInd, 0).getDate();

  let monthsMap = [1, 2, 3].map(() =>
    days.map((day, i) => {
      return " ";
    })
  );

  months.map((month, i) => {
    const d = new Date(i + 1 + "-01-" + year);
    let day = d.getDay();
    day = day === 0 ? 6 : day - 1;
    for (let j = 0; j < 3; j++) {
      if (monthsMap[j][day] === " ") {
        monthsMap[j][day] = month;
        break;
      }
    }
  });

  let monthsTable = monthsMap.map((n, i) => {
    let cols = monthsMap[i].map((n, j) => {
      return (
        <td
          onClick={() => selectMonth(n)}
          className={n == selectedMonth ? "blue" : ""}
        >
          {n}
        </td>
      );
    });
    if (i === 0) {
      return (
        <tr>
          <th rowSpan="3" colSpan="5">
            <button onClick={yearSub}>{"<"}</button> {year}
            <button onClick={yearAdd}>{">"}</button>
          </th>
          {cols}
        </tr>
      );
    }
    return <tr>{cols}</tr>;
  });

  const weekTable = days.map((val, i) => {
    let dateI = i + 1;
    let leftCols = [1, 2, 3, 4, 5].map((n, i) => {
      let date = dateI + 7 * i;
      return (
        <th
          className={selectedDate === date ? "blue width-20" : "width-20"}
          onClick={() => {
            changeDate(date);
          }}
        >
          {date <= monthDays ? date : " "}
        </th>
      );
    });
    let rightCols = days.map((day, id) => {
      return (
        <th className={(id + i) % days.length === 6 ? "red" : ""}>
          {days[(id + i) % days.length]}
        </th>
      );
    });
    return <tr>{leftCols.concat(rightCols)}</tr>;
  });

  return (
    <div>
      <table border="1">
        <tbody>
          {monthsTable}

          {weekTable}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
