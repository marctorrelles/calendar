import React, { Component }  from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

import { makeCalendar, handleDateTime } from '../utils/calendarUtils';
import Event from "./Event";

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
                id: 4,
                title: "I'm an event 2",
                description: "This is my description 2",
                start: "2018-07-29T13:00:00.000Z",
                end: "2018-07-29T14:00:00.000Z",
                created_at: "2018-07-26T14:48:54.649Z",
                updated_at: "2018-07-26T14:48:54.649Z"
            }],
            showModalEvent: false,
            event: {
                id: undefined,
                title: "",
                description: "",
                start: "",
                end: ""
            }
        };

        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleTriggerModalEvent = this.handleTriggerModalEvent.bind(this);
        this.handleShowEvent = this.handleShowEvent.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.renderNavigator = this.renderNavigator.bind(this);
        this.renderWeekDays = this.renderWeekDays.bind(this);
        this.renderCalendarDays = this.renderCalendarDays.bind(this);
    }

    componentWillMount() {
        this.setState({ calendar: makeCalendar(this.state.currentMonth, this.state.events) });
    }

    componentDidUpdate() {
    }

    handleMonthChange(nextMonth = true) {
        const MONTH = this.state.currentMonth;
        nextMonth ?
        this.setState({ currentMonth: MONTH.month(MONTH.month() + 1) }) :
        this.setState({ currentMonth: MONTH.month(MONTH.month() - 1) });
        this.setState({ calendar: makeCalendar(this.state.currentMonth, this.state.events) });
    }

    handleTriggerModalEvent() {
        if (this.state.event !== null && this.state.showModalEvent) {
            setTimeout(() => this.setState({ event: {
                id: undefined,
                title: undefined,
                description: undefined,
                start: undefined,
                end: undefined
            } }), 500);
        }
        this.setState({ showModalEvent: !this.state.showModalEvent });
    }

    handleShowEvent(id) {
        const event = (this.state.events.filter(event => event.id === id))[0];
        this.setState({ event: event });
        this.setState({ showModalEvent: true });
    }

    handleChangeEvent(e, field) {
        const event = this.state.event;
        let value;
        if (field.includes("Date") || field.includes("Time")) {
            value = handleDateTime(field, event, e.target.value);
            if (value)
                event[field.replace("Date","").replace("Time","")] = value;
        }
        else {
            event[field] = e.target.value;
        }
        this.setState({ event: event });
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
            </div>
        )
    }

    renderCalendarDays() {
        return(
            <div>
                {this.state.calendar.map( day => {
                    return (
                        <Col
                            className='calendar-col'
                            key={day.date}>
                            <span
                                className={!day.isActualMonth ? "text-muted calendar-day" : "calendar-day"}
                                itemID={day.date}>
                                {day.dayOfTheMonth}
                                {day.isFirst ? ` ${day.day.format('MMM')}` : ``}
                            </span>
                            <Col className="event-col">
                                {day.events.map(event => {
                                    return (
                                        <Row className="event-row" key={event.id} onClick={() => this.handleShowEvent(event.id)}>
                                            {moment(event.start).format("HH:mm")}
                                            &nbsp;{event.title}
                                        </Row>
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
                <Event
                    state = {this.state}
                    handleTriggerModalEvent = {this.handleTriggerModalEvent}
                    handleChangeEvent = {this.handleChangeEvent}
                />
            </Grid>

        )
    }
}

export default Calendar;
