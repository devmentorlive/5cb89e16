import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Calendar({ value, onChange }) {
  const [calendar, setCalendar] = useState([]);

  function buildCalendar(date) {
    const a = [];

    const startDay = date.clone().startOf("month").startOf("week");
    const endDay = date.clone().endOf("month").endOf("week");

    const _date = startDay.clone().subtract(1, "day");

    while (_date.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => _date.add(1, "day").clone())
      );
    }
    return a;
  }

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className="calendar">
      {calendar.map((week, wi) => (
        <div key={wi}>
          {week.map((day, di) => (
            <div key={di} className="day">
              {day.format("D").toString()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
