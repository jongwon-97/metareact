// src/components/CustomCalendar.js
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "/src/css/CustomCalendar.css"; // 캘린더 전용 CSS

const CustomCalendar = ({ events, onEventClick, onDateClick }) => {
  return (
    <FullCalendar
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
      dayCellClassNames={(arg) => {
        const isWeekend = arg.date.getDay() === 0 || arg.date.getDay() === 6;
        return isWeekend ? "fc-weekend" : "";
      }}
      height="600px"
    />
  );
};

export default CustomCalendar;
