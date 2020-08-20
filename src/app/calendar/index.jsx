import React, { useState, useEffect } from "react";
import moment from "moment";
import buildCalendar from "./build";
import "./styles.css";

export default function Calendar({ value, onChange }) {
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  function isSelected(day) {
    return value.isSame(day, "day");
  }

  function beforeToday(day) {
    return moment(day).isBefore(new Date(), "day");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  function dayStyles(day) {
    if (beforeToday(day)) return "before";
    if (isSelected(day)) return "selected";
    if (isToday(day)) return "today";
    return "";
  }

  function prevMonthName() {
    return value.clone().subtract(1, "month").format("MMMM");
  }

  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  function nextMonthName() {
    return value.clone().add(1, "month").format("MMMM");
  }

  return (
    <div className="calendar">
      <div className="header">
        {currMonthName()} {currYear()}
      </div>

      <div className="body">
        <div className="day-names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d) => (
            <div className="week">{d}</div>
          ))}
        </div>

        {calendar.map((week, wi) => (
          <div
            key={wi}
            style={{
              margin: 0,
              padding: 0,
            }}
          >
            {week.map((day, di) => (
              <div
                key={di}
                className="day"
                onClick={() => {
                  if (day < moment(new Date()).startOf("day")) return;
                  onChange(day);
                }}
              >
                <div className={dayStyles(day)}>
                  {day.format("D").toString()}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="footer">
        <div className="previous">
          <a
            onClick={() => {
              const newDate = value.clone().subtract(1, "month");
              onChange(newDate);
            }}
          >
            {moment(new Date()).isBefore(value, "month")
              ? String.fromCharCode(171) + prevMonthName()
              : null}
          </a>
        </div>

        <div className="next">
          <a
            onClick={() => {
              const newDate = value.clone().add(1, "month");
              onChange(newDate);
            }}
          >
            {nextMonthName() + String.fromCharCode(187)}
          </a>
        </div>
      </div>
    </div>
  );
}
