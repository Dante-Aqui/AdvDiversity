import React, { useState, useEffect } from 'react';
import { Row, Col, Tab, Card, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MentorProfile from '../../../components/dashboardmentor/MentorProfile';
import MentorAppointments from '../../../components/dashboardmentor/MentorAppointments';
import MentorMatches from '../../../components/dashboardmentor/MentorMatches';
import mentorProfile from '../../../services/mentorProfileService';
import ResourcesPublic from '../../../components/resources/ResourcesPublic';
import * as toastr from 'toastr';
import calendarService from "../../../services/calendlyService"
import 'toastr/build/toastr.css';

import debug from "sabio-debug"


const MentorDashboard = (props) => {
    const [profile, setMentor] = useState({});
    const [userUrl, setUserUrl] = useState("");

    const _logger = debug.extend("mentorDashboard")

    useEffect(() => {
        mentorProfile.getMentorProfile().then(onGetMentorSuccess).catch(onGetMentorError);
    }, []);

    const onGetMentorSuccess = (response) => {
        let profile = { ...response.item };
        setMentor(profile);
    };
    const onGetMentorError = () => {
        toastr.error('Could not retrieve Mentor');
    };



    useEffect(() => {
        calendarService.getCurrentUserMentor().then(onGetCurrUserSuccess).catch(onGetCurrUserError);
    }, []);

    const onGetCurrUserSuccess = ({ item: { resource } }) => {
        if (resource) {
            _logger(resource);
            setUserUrl(resource?.scheduling_url)
        }
    };

    const onGetCurrUserError = () => {
        toastr.error("Could not get Calendly User")
    };



    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right"></div>
                        <h4 className="page-title font-20">Mentor Dashboard</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col sm={3}>
                    <MentorProfile mentorInfo={profile} />
                </Col>

                <Col>
                    <Tab.Container defaultActiveKey="calendar">
                        <Card>
                            <Card.Body>
                                <Nav variant="pills" className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                    <Nav.Item className="nav-item">
                                        <Nav.Link href="#" eventKey="calendar" className="nav-link rounded-0">
                                            Calendar
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link href="#" eventKey="menteeMatches" className="nav-link rounded-0">
                                            Matches
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="nav-item">
                                        <Nav.Link href="#" eventKey="resources" className="nav-link rounded-0">
                                            Resources
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item className="nav-item">
                                        <Nav.Link
                                            href="/mentors/profile/edit"
                                            eventKey="editprofile"
                                            className="nav-link rounded-0">
                                            Edit Profile
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content>
                                    <Tab.Pane eventKey="calendar">
                                        <MentorAppointments currentUser={props.currentUser} userUrl={userUrl} />
                                    </Tab.Pane>
                                </Tab.Content>
                                <Tab.Content>
                                    <Tab.Pane eventKey="menteeMatches">
                                        <MentorMatches currentUser={props.currentUser} />
                                    </Tab.Pane>
                                </Tab.Content>
                                <Tab.Content>
                                    <Tab.Pane eventKey="resources">
                                        <ResourcesPublic />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>
            </Row>
        </>
    );
};

MentorDashboard.propTypes = {
    currentUser: PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool,
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default MentorDashboard;
