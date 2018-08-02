import React, { Component }  from 'react';
import { Grid } from 'react-bootstrap';
import moment from 'moment';

import Event from "./Event";
import { Navigator, WeekDays, CalendarDays } from "./CalendarComponents";

import { makeCalendar, handleDateTime, checkEventParams } from '../utils/CalendarUtils';

import EventActions from '../actions/EventActions';
import EventStore from '../stores/EventStore';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showModalEvent: false,
            mustLoadEvents: false,
            currentMonth: moment(),
            currentDay: moment(),
            calendar: [],
            events: [],
            event: {
                id: undefined,
                title: "",
                description: "",
                start: "",
                end: ""
            }
        };

        this.eventStore = null;

        this.handleMonthChange = this.handleMonthChange.bind(this);
        this.handleTriggerModalEvent = this.handleTriggerModalEvent.bind(this);
        this.handleShowEvent = this.handleShowEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);
        this.handleEditEvent = this.handleEditEvent.bind(this);
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);
    }

    componentWillMount() {
        this.setState({ calendar: makeCalendar(this.state.currentMonth, this.state.events) });
        EventActions.get();
    }

    componentDidMount() {
        if (!this.eventStore) {
            this.eventStore = EventStore.listen((value, key) => {
                const state = {};
                state[key] = value;
                this.setState(state);
            });
        }
    }

    componentDidUpdate() {
        if (this.state.mustLoadEvents) {
            this.setState({ mustLoadEvents: false });
            this.setState({ calendar: makeCalendar(this.state.currentMonth, this.state.events) });
        }
    }

    componentWillUnmount() {
        this.eventStore();
    }

    // Handlers

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
                title: "",
                description: "",
                start: "",
                end: ""
            } }), 500);
        }
        this.setState({ showModalEvent: !this.state.showModalEvent });
    }

    handleShowEvent(id) {
        const event = { ...(this.state.events.filter(event => event.id === id))[0] };
        this.setState({ event: event });
        this.setState({ showModalEvent: true });
    }

    handleChange(e, field) {
        const event = this.state.event;
        let value;
        if (field.includes("Date") || field.includes("Time")) {
            value = handleDateTime(field, event, e.target.value);
            if (value)
                event[field.replace("Date","").replace("Time","")] = value;
            if (value && event.start.length && (event.end === "" || !event.end))
                event["end"] = event["start"];
        }
        else {
            event[field] = e.target.value;
        }
        this.setState({ event: event });
    }

    handleCreateEvent() {
        const checkEvent = checkEventParams(this.state.event);
        if (checkEvent === true) {
            EventActions.create(this.state.event, this.state.events);
            // TODO: Wait till event creation
            this.handleTriggerModalEvent();
        } else {
            // TODO NOTIFY
            console.log(checkEvent)
        }
    }

    handleEditEvent() {
        const checkEvent = checkEventParams(this.state.event);
        if (checkEvent === true) {
            EventActions.edit(this.state.event, this.state.events);
            // TODO: Wait till event creation
            this.handleTriggerModalEvent();
        } else {
            // TODO NOTIFY
            console.log(checkEvent)
        }
    }

    handleDeleteEvent() {
        EventActions.delete(this.state.event.id, this.state.events);
        // TODO: Wait till event removal
        this.handleTriggerModalEvent();
    }

    // Renders

    render() {
        return (
            <Grid className='calendar-container'>
                <Navigator
                    state = {this.state}
                    handleMonthChange = {this.handleMonthChange}
                />
                <WeekDays/>
                <CalendarDays
                    state = {this.state}
                    handleShowEvent = {this.handleShowEvent}
                />
                <Event
                    state = {this.state}
                    handleTriggerModalEvent = {this.handleTriggerModalEvent}
                    handleChange = {this.handleChange}
                    handleCreateEvent = {this.handleCreateEvent}
                    handleEditEvent = {this.handleEditEvent}
                    handleDeleteEvent = {this.handleDeleteEvent}
                />
            </Grid>
        )
    }
}

export default Calendar;
