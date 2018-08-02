import React, { Component }  from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import moment from "moment/moment";

export class Navigator extends Component {
    render() {
        const monthNames = moment.months();
        const MONTH = this.props.state.currentMonth;

        return (
            <Row className='calendar-navigator'>
                <div className='month-name'>
                    <span className='align-middle'>
                        {monthNames[MONTH.month()]} {MONTH.year()}
                    </span>
                </div>
                <div className='arrows'>
                    <Button onClick={() => this.props.handleMonthChange(false)}>&lt;</Button>
                    <Button onClick={() => this.props.handleMonthChange(true)}>&gt;</Button>
                </div>
            </Row>
        )
    }
}

export class WeekDays extends Component {
    render() {
        const weekdays = Array.apply(null, Array(7)).map(function (_, i) {
            return moment(i, 'e').startOf('week').isoWeekday(i + 1).format('dddd');
        });
        const weekdaysShort = Array.apply(null, Array(7)).map(function (_, i) {
            return moment(i, 'e').startOf('week').isoWeekday(i + 1).format('ddd');
        });
        return (
            <Row className='calendar-week-names text-left'>
                <div className='hidden-xs'>
                    {weekdays.map( weekday => {
                        return(
                            <Col
                                className='calendar-col'
                                key={weekday.toLowerCase()}>
                                <span>{weekday}</span>
                            </Col>
                        )
                    })}
                </div>
                <div className='hidden-lg hidden-md hidden-sm'>
                    {weekdaysShort.map( weekday => {
                        return(
                            <Col
                                className='calendar-col'
                                key={weekday.toLowerCase()}>
                                <span>{weekday}</span>
                            </Col>
                        )
                    })}
                </div>
            </Row>
        )
    }
}

export class CalendarDays extends Component {
    render() {
        return(
            <Row className='calendar-days text-left'>
                {this.props.state.calendar.map( day => {
                    let classNameDay = !day.isActualMonth ?
                        "text-muted calendar-day" : "calendar-day"
                    classNameDay += day.isToday ? " today" : "";
                    const classNameMonth = !day.isActualMonth ?
                        "text-muted calendar-month hidden-xs" :
                        "calendar-month hidden-xs";
                    return (
                        <Col
                            className='calendar-col'
                            key={day.date}>
                            <span
                                className={classNameDay}
                                itemID={day.date}>
                                {day.dayOfTheMonth}
                            </span>
                            {day.isFirst ?
                                <span
                                    className={classNameMonth}>
                                    &nbsp;{day.day.format('MMM')}
                                </span>
                                : ""
                            }
                            <Col className="event-col">
                                {day.events.map(event => {
                                    return (
                                        <Row
                                            className="event-row"
                                            key={event.id}
                                            onClick={() => this.props.handleShowEvent(event.id)}
                                        >
                                            {moment(event.start).format("HH:mm")}
                                            &nbsp;{event.title}
                                        </Row>
                                    )
                                })}
                            </Col>
                        </Col>
                    )
                })}
            </Row>
        )
    }
}