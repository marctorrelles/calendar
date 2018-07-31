import React, { Component }  from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

import { makeCalendar } from '../utils/calendar';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: moment(),
            currentDay: moment(),
            calendar: [],
            events: [{
                id: 3,
                title: "I'm an event",
                description: "This is my description",
                start: "2018-07-26T12:00:00.000Z",
                end: "2018-07-26T14:00:00.000Z",
                created_at: "2018-07-26T14:48:54.649Z",
                updated_at: "2018-07-26T14:48:54.649Z"
            }, {
                id: 3,
                title: "I'm an event",
                description: "This is my description",
                start: "2018-07-26T12:00:00.000Z",
                end: "2018-07-26T14:00:00.000Z",
                created_at: "2018-07-26T14:48:54.649Z",
                updated_at: "2018-07-26T14:48:54.649Z"
            }]
        }
    }

    componentWillMount() {
        this.setState({ calendar: makeCalendar(this.state.currentMonth, this.state.events) });
    }

    componentDidUpdate() {
    }

    handleMonthChange(nextMonth = true) {
        const MONTH = this.state.currentMonth;
        nextMonth ?
        this.setState({
            currentMonth: MONTH.month(MONTH.month() + 1)
        }) :
        this.setState({
            currentMonth: MONTH.month(MONTH.month() - 1)
        })
        this.setState({ calendar: makeCalendar(this.state.currentMonth, this.state.events) });
    }

    renderNavigator() {
        const monthNames = moment.months();
        const MONTH = this.state.currentMonth;

        return (
            <Row className='calendar-navigator'>
                <div className='month-name'>
                    <span className='align-middle'>
                        {monthNames[MONTH.month()]} {MONTH.year()}
                    </span>
                </div>
                <div className='arrows'>
                    <Button onClick={() => this.handleMonthChange(false)}>&lt;</Button>
                    <Button onClick={() => this.handleMonthChange(true)}>&gt;</Button>
                </div>
            </Row>
        )
    }

    renderWeekDays() {
        const weekdays = Array.apply(null, Array(7)).map(function (_, i) {
            return moment(i, 'e').startOf('week').isoWeekday(i + 1).format('dddd');
        });
        const weekdaysShort = Array.apply(null, Array(7)).map(function (_, i) {
            return moment(i, 'e').startOf('week').isoWeekday(i + 1).format('ddd');
        });
        return (
            <div>
                <div className='hidden-xs'>
                    {weekdays.map( weekday => {
                        return(
                            <Col className='calendar-col'>
                                <span>{weekday}</span>
                            </Col>
                        )
                    })}
                </div>
                <div className='hidden-lg hidden-md hidden-sm'>
                    {weekdaysShort.map( weekday => {
                        return(
                            <Col className='calendar-col'>
                                <span>{weekday}</span>
                            </Col>
                        )
                    })}
                </div>
            </div>
        )
    }

    renderCalendarDays() {
        return(
            <div>
                {this.state.calendar.map( day => {
                    return (
                        <Col className='calendar-col'>
                            <span
                                className={!day.isActualMonth ? "text-muted" : ""}
                                itemID={day.date}>
                                {day.dayOfTheMonth}
                                {day.isFirst ? ` ${day.day.format('MMM')}` : ``}
                            </span>
                            <Col className="event-col">
                                {day.events.map(event => {
                                    return (
                                        <Row className="event-row">{moment(event.start).format("HH:mm")} {event.title}</Row>
                                    )
                                })}
                            </Col>
                        </Col>
                    )
                })}
            </div>
        )
    }

    render() {
        return (
            <Grid className='calendar-container'>
                {this.renderNavigator()}
                <Row className='calendar-week-names text-left'>
                    {this.renderWeekDays()}
                </Row>
                <Row className='calendar-days text-left'>
                    {this.renderCalendarDays()}
                </Row>
            </Grid>
        )
    }
}

export default Calendar;
