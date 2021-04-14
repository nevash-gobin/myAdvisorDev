import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

/*
  momentLocalizer is a date localization adapter that is used to localize the data for the calendar component.
*/
const localizer = momentLocalizer(moment)

/*
  StaffCalendar is component that is displayed on the staff dashboard which shows the current advising schedule.
*/
function StaffCalendar () {
  /*
    The eventsList state is used to store the current academic advising window.
  */ 
  const [eventsList, setEventsList] = useState([]);

  /*
    getAdvisingWindow creates a get request to the server that gets the current advising window and stores it to the eventsList state.
  */
  async function getAdvisingWindow() {
    try {
      const res = await fetch("/admin/academic-advising/window", {
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
  }, []);

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

