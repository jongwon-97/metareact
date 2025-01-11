import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "/src/css/CustomCalendar.css";

const CustomCalendar = ({ events, onEventClick, onDateClick }) => {
  const calendarRef = useRef(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    const currentDate = calendarApi.getDate();
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth() + 1);
  }, []);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);
    moveToDate(newYear, month);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setMonth(newMonth);
    moveToDate(year, newMonth);
  };

  const moveToDate = (year, month) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(`${year}-${String(month).padStart(2, "0")}-01`);
  };

  return (
    <div>
      <div className="yearselect">
        <select value={year} onChange={handleYearChange} className="yearvalue">
          {Array.from({ length: 21 }, (_, i) => {
            const optionYear = new Date().getFullYear() - 10 + i;
            return (
              <option key={optionYear} value={optionYear}>
                {optionYear}년
              </option>
            );
          })}
        </select>
        <select value={month} onChange={handleMonthChange} className="monthvalue">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}월
            </option>
          ))}
        </select>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        eventClick={onEventClick}
        dateClick={onDateClick}
        height="700px"
      />
    </div>
  );
};

export default CustomCalendar;
