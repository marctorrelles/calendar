import React, { Component }  from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentMonth: moment(),
            currentDay: moment(),
            events: []
        }
    }

    handleMonthChange(nextMonth = true) {
        console.log("click")
        const MONTH = this.state.currentMonth;
        nextMonth ?
        this.setState({
            currentMonth: MONTH.month(MONTH.month() + 1)
        }) :
        this.setState({
            currentMonth: MONTH.month(MONTH.month() - 1)
        })
    }

    renderNavigator() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const MONTH = this.state.currentMonth;

        return (
            <Row className="calendar-navigator">
                <div className="month-name">
                    <span className="align-middle">
                        {monthNames[MONTH.month()]} {MONTH.year()}
                    </span>
                </div>
                <div className="arrows">
                    <Button onClick={() => this.handleMonthChange(false)}>&lt;</Button>
                    <Button onClick={() => this.handleMonthChange(true)}>&gt;</Button>
                </div>
            </Row>
        )
    }

    renderWeekDays() {
        return (
            <div>
                <Col className="calendar-col">
                    <span className="hidden-xs">Monday</span>
                    <span className="hidden-lg hidden-md hidden-sm">Mo</span>
                </Col>
                <Col className="calendar-col">
                    <span className="hidden-xs">Tuesday</span>
                    <span className="hidden-lg hidden-md hidden-sm">Tu</span>
                </Col>
                <Col className="calendar-col">
                    <span className="hidden-xs">Wednesday</span>
                    <span className="hidden-lg hidden-md hidden-sm">We</span>
                </Col>
                <Col className="calendar-col">
                    <span className="hidden-xs">Thursday</span>
                    <span className="hidden-lg hidden-md hidden-sm">Th</span>
                </Col>
                <Col className="calendar-col">
                    <span className="hidden-xs">Friday</span>
                    <span className="hidden-lg hidden-md hidden-sm">Fr</span>
                </Col>
                <Col className="calendar-col">
                    <span className="hidden-xs">Saturday</span>
                    <span className="hidden-lg hidden-md hidden-sm">Sa</span>
                </Col>
                <Col className="calendar-col">
                    <span className="hidden-xs">Sunday</span>
                    <span className="hidden-lg hidden-md hidden-sm">Su</span>
                </Col>
            </div>
        )
    }

    render() {
        return (
            <Grid className="calendar-container">
                {this.renderNavigator()}
                <Row className="calendar-week-names text-left">
                    {this.renderWeekDays()}
                </Row>
            </Grid>
        )
    }
}

export default Calendar;
