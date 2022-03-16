import './Calendar.css'

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

const CalendarClient = () => {
  const state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "month")
          .toDate(),
        title: "Some title"
      }
    ]
  };
  return (
    <>
      <div className="title">
        <h1> Calendar
        </h1>
      </div>
      <div>
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={state.events}
          style={{ height: "75vh" }}
          className="mt-4"
        />
      </div></>
    
  )
}
export default CalendarClient