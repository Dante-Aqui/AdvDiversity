import React, { useState } from 'react'
import PropTypes from "prop-types"
import { Container, Card, Button, Anchor } from "react-bootstrap"
import Modal from "react-modal"
import "./appointmentcalendly.css"

import debug from 'sabio-debug'

const AppointmentCalendly = (props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const _logger = debug.extend("AppointmentCalendly");


    const openModal = () => {
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const customStyles = {
        content: {
            width: '500px',
            height: '300px',
        }
    }

    var locationName = "";
    if (props.appointment.location.type === "google_conference") {
        locationName = "Google Meet";
    } else if (props.appointment.location.type === "custom") {
        locationName = "Custom event"
    } else {
        locationName = props.appointment.location.location;
    }

    var locationString = `Where: ${locationName}`
    var statusString = `Status: ${props.appointment.status}`
    var totalInvitees = `Total Invitees: ${props.appointment.invitees_counter.total}`
    var activeInvitees = `Active Invitees: ${props.appointment.invitees_counter.active}`;
    var limitInvitees = `Limit Invitees: ${props.appointment.invitees_counter.limit}`
    var getStartDate = new Date(props.appointment.start_time);
    var startDate = getStartDate.toLocaleString();
    var startDateString = `Starts at: ${startDate}`;
    var getEndDate = new Date(props.appointment.end_time);
    var endDate = getEndDate.toLocaleString();
    var endDateSrting = `Ends at: ${endDate}`;
    _logger("appointment", props.appointment);
    _logger(props)
    return (

        <Container>
            <Card className='appointmentCard'>
                <Card.Body>
                    <button type='button' className='btn btn-link' onClick={openModal}>View More</button>
                    <Modal style={customStyles} ariaHideApp={false} isOpen={modalOpen} onRequestClose={closeModal}>
                        <Button onClick={closeModal}>Close</Button>
                        <h3>{locationString}</h3>
                        <h4>{statusString}</h4>
                        <br />
                        <h4>Invitees counter</h4>
                        <h5>{totalInvitees}</h5>
                        <h5>{activeInvitees}</h5>
                        <h5>{limitInvitees}</h5>
                    </Modal>
                    <h3>{props.appointment.name}</h3>
                    <h4>{locationString}</h4>
                    <p>{startDateString}</p>
                    <p>{endDateSrting}</p>

                    {props.appointment.location.type === "physical" ? <p><strong>Physical Meeting</strong></p>
                        : <Anchor className='btn btn-primary' href={props.appointment.location.join_url}>Join Meeting!</Anchor>}
                </Card.Body>
            </Card>
        </Container>

    )
}

AppointmentCalendly.propTypes = {
    appointment: PropTypes.arrayOf({
        uri: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        startTime: PropTypes.instanceOf(Date),
        endTime: PropTypes.instanceOf(Date),
        eventType: PropTypes.string.isRequired,
        location: PropTypes.shape({
            join_: PropTypes.string.isRequired,
            status: PropTypes.string,
            type: PropTypes.string.isRequired
        }),
        createdAt: PropTypes.instanceOf(Date),
        updatedAt: PropTypes.instanceOf(Date),
        eventMembershp: PropTypes.arrayOf({
            user: PropTypes.string.isRequired
        }),
        eventGuests: PropTypes.arrayOf({
            email: PropTypes.string.isRequired,
            createdAt: PropTypes.instanceOf(Date),
            updatedAt: PropTypes.instanceOf(Date)
        }),
        cancellation: PropTypes.objectOf({
            canceledBy: PropTypes.string,
            reason: PropTypes.string,
            cancelerType: PropTypes.string
        })
    }),
    event: PropTypes.shape({
        isActive: PropTypes.bool.isRequired,
        bookingMethod: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        customQuestions: PropTypes.objectOf({
            answerChoices: PropTypes.string.isRequired,
            isEnabled: PropTypes.bool.isRequired,
            isIncludeOther: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            position: PropTypes.number.isRequired,
            isRequired: PropTypes.bool.isRequired,
            type: PropTypes.string.isRequired
        }),
        deletedAt: PropTypes.instanceOf(Date).isRequired,
        descriptionHtml: PropTypes.string.isRequired,
        descriptionPlan: PropTypes.string.isRequired,
        internalNote: PropTypes.string.isRequired,
        kind: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.number.isRequired,
        poolingType: PropTypes.string.isRequired,
        profile: PropTypes.shape({
            name: PropTypes.string.isRequired,
            owner: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired
        }),
        schedulingUrl: PropTypes.string.isRequired,
        isSecret: PropTypes.bool.isRequired,
        slug: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        uri: PropTypes.string.isRequired

    })
}

export default AppointmentCalendly