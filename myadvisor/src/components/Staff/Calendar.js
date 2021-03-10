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
      'start': new Date(2021, 2, 1),
      'end': new Date(2021, 2, 6)
    }
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

