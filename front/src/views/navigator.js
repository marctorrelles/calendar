import React, { Component }  from 'react';
import { Grid, Row, Col, Button } from "react-bootstrap";

class Navigator extends Component {

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
            <Row className="calendar-navigator">
                <div className="month-name">
                    <span className="align-middle">{monthNames[NOW.getMonth()]} {NOW.getFullYear()}</span>
                </div>
                <div className="arrows">
                    <Button className="pull-left">&larr;</Button>
                    <Button className="pull-right">&rarr;</Button>
                </div>
            </Row>
        )
    }
}

export default Navigator;