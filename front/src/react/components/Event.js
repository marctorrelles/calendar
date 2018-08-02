import React, { Component } from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import moment from "moment";

class Event extends Component {

    formatDate(datetime) {
        return (datetime ? moment(datetime).format('YYYY-MM-DD') : "");
    }

    formatTime(datetime) {
        return (datetime ? moment(datetime).format('HH:mm') : "");
    }

    render() {
        const IS_CREATE = !this.props.state.event.id;

        return (
            <div>
                <Button className="create-event" bsSize="large" onClick={this.props.handleTriggerModalEvent}>
                    +
                </Button>

                <Modal show={this.props.state.showModalEvent} onHide={this.props.handleTriggerModalEvent}>
                    <Modal.Header closeButton>
                        <Modal.Title>{IS_CREATE ? "Create event" : "Edit event"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <ControlLabel>Title</ControlLabel>
                            <FormGroup controlId="formControlsTitle">
                                <FormControl
                                    type="text"
                                    placeholder="Enter the event title"
                                    value={this.props.state.event.title}
                                    onChange={(event) => this.props.handleChange(event, "title")}
                                />
                            </FormGroup>
                            <ControlLabel>Description</ControlLabel>
                            <FormGroup controlId="formControlsDescrition">
                                <FormControl
                                    type="text"
                                    placeholder="Enter the event description"
                                    value={this.props.state.event.description}
                                    onChange={(event) => this.props.handleChange(event, "description")}
                                />
                            </FormGroup>
                            <ControlLabel>Start</ControlLabel>
                            <FormGroup controlId="formControlsStartDateTime">
                                <FormControl
                                    className="col-date"
                                    type="date"
                                    placeholder="Enter the event start date"
                                    value={this.formatDate(this.props.state.event.start)}
                                    onChange={(event) => this.props.handleChange(event, "startDate")}
                                />
                                <FormControl
                                    className="col-time"
                                    type="time"
                                    placeholder="Enter the event start time"
                                    value={this.formatTime(this.props.state.event.start)}
                                    onChange={(event) => this.props.handleChange(event, "startTime")}
                                />
                            </FormGroup>
                            <ControlLabel>End</ControlLabel>
                            <FormGroup controlId="formControlsEndDateTime">
                                <FormControl
                                    className="col-date"
                                    type="date"
                                    placeholder="Enter the event end date"
                                    value={this.formatDate(this.props.state.event.end)}
                                    onChange={(event) => this.props.handleChange(event, "endDate")}
                                />
                                <FormControl
                                    className="col-time"
                                    type="time"
                                    placeholder="Enter the event end time"
                                    value={this.formatTime(this.props.state.event.end)}
                                    onChange={(event) => this.props.handleChange(event, "endTime")}
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {!IS_CREATE && <Button className="pull-left" bsStyle="danger" onClick={this.props.handleDeleteEvent}>
                            Delete
                        </Button>}
                        <Button className="" onClick={this.props.handleTriggerModalEvent}>
                            Close
                        </Button>
                        {IS_CREATE && <Button className="create-event-modal" onClick={this.props.handleCreateEvent}>
                            Create
                        </Button>}
                        {!IS_CREATE && <Button className="create-event-modal" onClick={this.props.handleEditEvent}>
                            Edit
                        </Button>}
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Event;