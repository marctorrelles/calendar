import React, { Component }  from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    render() {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const NOW = new Date();

        return (
            <div className="calendar-container">
                <Grid>
                    <Row className="calendar-week-names text-left">
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
                    </Row>
                </Grid>
            </div>
        )
    }

}

export default Calendar;
