
import React, { useState, useEffect } from 'react';

import calendarService from '../../services/calendlyService';

import AppointmentCalendly from '../appointments/AppointmentCalendly';
import SimpleBar from 'simplebar-react';
import { Tab, Card, Nav, Row } from 'react-bootstrap';
import Calendly from "../calendly/Calendly"
import PropTypes from 'prop-types';
import './mentorappointments.css';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

import debug from "sabio-debug";

const MentorAppointments = (props) => {

    const _logger = debug.extend("MentorAppointment")

    const [appointmentData, setAppointmentData] = useState({
        arrAppointments: [],
        appointmentsComponents: []
    });

    const mapCalendlyAppointment = (aAppointment, index) => {
        return (
            <AppointmentCalendly
                key={index}
                appointment={aAppointment}
            />
        );
    };



    useEffect(() => {
        calendarService.getListEventsMentee().then(onGetEventsSuccess).catch(onGetAppointmentsError);
    }, []);



    const onGetEventsSuccess = ({ item }) => {
        _logger(item);
        if (item?.collection) {
            setAppointmentData((prevState) => {
                const pd = { ...prevState };
                pd.arrAppointments = item.collection;
                pd.appointmentsComponents = item?.collection?.map(mapCalendlyAppointment);
                return pd;
            });
        }

    }
    const onGetAppointmentsError = () => {
        toastr.error('Could not retrieve appointments');

    };


    return (
        <React.Fragment>
            <Tab.Container defaultActiveKey="upcomingAppts">
                <Card>
                    <Card.Body>
                        <Nav variant="pills" className="nav nav-pills bg-nav-pills nav-justified mb-3">
                            <Nav.Item className="nav-item">
                                <Nav.Link href="#" eventKey="upcomingAppts" className="nav-link rounded-0">
                                    Upcoming Appointments
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='nav-item'>
                                <Nav.Link href='#' eventKey="calendly" className='nav-link rounded-0'>
                                    Create Appointment
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content>
                            <Tab.Pane eventKey="upcomingAppts">
                                <SimpleBar className="upcomingAppts">
                                    <Row>
                                        <h2 className="text-secondary m-2">Upcoming Appointments</h2>
                                        <div className='appointmentCardCtn'>
                                            {appointmentData.appointmentsComponents}

                                        </div>
                                    </Row>
                                </SimpleBar>
                            </Tab.Pane>
                        </Tab.Content>

                        <Tab.Content>
                            <Tab.Pane eventKey="calendly">
                                <Calendly ownerUrl={props.userUrl} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Card.Body>
                </Card>
            </Tab.Container>
        </React.Fragment>
    );
};

MentorAppointments.propTypes = {
    currentUser: PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool,
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
    userUrl: PropTypes.string.isRequired
};
export default MentorAppointments;



