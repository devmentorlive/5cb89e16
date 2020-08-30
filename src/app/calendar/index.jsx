import React, { useState, useEffect } from "react";
import moment from "moment";
import "./styles.css";
import dayStyles from "./styles";
import buildCalendar from "./build";

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value]);

  return (
    <div className="calendar">
      {calendar.map((week) => (
        <div>
          {week.map((day) => (
            <div className="day" onClick={() => setValue(day)}>
              <div className={dayStyles(day, value)}>
                {day.format("D").toString()}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
