import React, {Component} from 'react';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './main.scss'

class CalendarView extends Component {

    render() {
      return (
        <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
      )
    }
}

export default CalendarView;