import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)
const myEventsList = [
    {
        'title': 'Advising Week',
        'allDay': true,
        'start': new Date(2021, 1, 1),
        'end': new Date(2021, 1, 6)
    },
    {
        'title': 'Reg. Starts',
        'allDay': true,
        'start': new Date(2021, 1, 8),
        'end': new Date(2021, 1, 8)
    },
    {
        'title': 'Reg. Ends',
        'allDay': true,
        'start': new Date(2021, 1, 26),
        'end': new Date(2021, 1, 26)
    },
    
];

class StaffCalendar extends Component {
  render() {
    return (
        <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          view='month'
          views={['month']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 400 }}
        />
      </div>
    );
  }
}

export default StaffCalendar;

