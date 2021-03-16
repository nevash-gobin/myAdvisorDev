import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

function StaffCalendar () {

  const [eventsList, setEventsList] = useState([]);

  //Get Advising Window
  async function getAdvisingWindow() {
    try {
      const res = await fetch("http://localhost:5000/admin/academic-advising/window", {
        method: "GET",
      });

      const parseData = await res.json();

      const startDate = new Date(parseData.advisingStart)
      startDate.setDate(startDate.getDate() + 1);
      
      const endDate = new Date(parseData.advisingEnd)
      endDate.setDate(endDate.getDate() + 1);


      setEventsList(
        [{
          'title': 'Advising',
          'allDay': true,
          'start': startDate,
          'end': endDate
        }]
      )
      
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAdvisingWindow();
  });

  return (
      <div>
      <Calendar
        localizer={localizer}
        events={eventsList}
        view='month'
        views={['month']}
        style={{ height: 450 }}
        popup
        selectable
        //onSelectEvent={event => alert(event.id)}
      />
    </div>
  );
}

export default StaffCalendar;

