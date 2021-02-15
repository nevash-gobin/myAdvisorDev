import React, { Component } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)
const myEventsList = [
    {
      'id': 1,
      'title': 'Advising Week',
      'allDay': true,
      'start': new Date(2021, 1, 1),
      'end': new Date(2021, 1, 6)
    },
    {
      'id': 2,
      'title': 'Reg. Starts',
      'allDay': true,
      'start': new Date(2021, 1, 8),
      'end': new Date(2021, 1, 8)
    },
    {
      'id': 3,
      'title': 'Meeting 1',
      'allDay': true,
      'start': new Date(2021, 1, 8),
      'end': new Date(2021, 1, 8)
    },
    {
      'id': 4,
      'title': 'Meeting 2',
      'allDay': true,
      'start': new Date(2021, 1, 8),
      'end': new Date(2021, 1, 8)
    },
    {
      'id': 5,
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
          style={{ height: 450 }}
          popup
          selectable
          onSelectEvent={event => alert(event.id)}
        />
      </div>
    );
  }
}

export default StaffCalendar;

