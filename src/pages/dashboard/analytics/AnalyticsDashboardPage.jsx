import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tab, Nav, Container } from 'react-bootstrap';
import DonationsStatistics from './DonationsStatistics';
import UsersStatistics from './UsersStatistics';
import LocationsStatistics from './LocationsStatistics';
import StatesStatistics from './StatesStatistics';
import SplineUsersGrowth from './SplineUsersGrowth';
import TrafficStatistics from './trafficstatistics/TrafficStatistics';

import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

import './leaflet.css';
import usersServices from '../../../services/usersServices';
import locationService from '../../../services/locationService';
import * as orderService from '../../../services/orderService';
import debug from 'sabio-debug';
import MentorsAnalytics from './mentorsanalytics/MentorsAnalytics';

const AnalyticsDashboardPage = () => {
    const _logger = debug.extend('AnalyticsDashboardPage');

    const [activeUsers, setActiveUsers] = useState({
        arrayOfUsers: [],
        usersComponentsStats: [],
    });

    const [activeLocations, setActiveLocations] = useState({
        arrayOfLocations: [],
    });

    const [activeDonations, setActiveDonations] = useState({
        arrayOfDonations: [],
    });

    useEffect(() => {
        usersServices.getStatistics().then(onGetUserStatsSuccess).catch(onGetUserStatsError);
        locationService.getStatistics().then(onGetLocationStatsSuccess).catch(onGetLocationStatsError);
        orderService.getStatistics().then(onGetOrdersSuccess).catch(onGetOrdersError);
    }, []);

    const onGetUserStatsSuccess = (response) => {
        _logger('OnGetStatsSuccess', response);
        let arrayActiveUsers = response.items;

        setActiveUsers((prevUsers) => {
            let newUsers = { ...prevUsers };
            newUsers.arrayOfUsers = arrayActiveUsers;
            newUsers.usersComponentsStats = arrayActiveUsers.map(mappingUsersStats);
            return newUsers;
        });

        _logger(activeUsers);
    };

    const onGetUserStatsError = (err) => {
        _logger(err);
        toastr['error']('Cannot load users statistics, please refresh the page.', 'Error');
    };

    const mappingUsersStats = (user, index) => {
        return <UsersStatistics actUsers={user} key={index} />;
    };

    const onGetLocationStatsSuccess = (response) => {
        _logger('OnGetLocationsStatsSuccess', response);
        let arrayActiveLocations = response.items;

        setActiveLocations((prevUsers) => {
            let newLocations = { ...prevUsers };
            newLocations.arrayOfLocations = arrayActiveLocations;
            return newLocations;
        });
        _logger(activeUsers);
    };

    const onGetLocationStatsError = (err) => {
        _logger(err);
        toastr['error']('Cannot load Locations statistics, please refresh the page.', 'Error');
    };

    const onGetOrdersSuccess = (response) => {
        _logger('OnGetOrdersStatsSuccess', response);
        let arrayDonations = response.items;

        setActiveDonations((prevDonations) => {
            let donUpdated = { ...prevDonations };
            donUpdated.arrayOfDonations = arrayDonations;
            return donUpdated;
        });
        _logger(activeDonations);
    };

    const onGetOrdersError = (err) => {
        _logger(err);
        toastr['error']('Cannot load donations statistics, please refresh the page.', 'Error');
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <h4 className="page-title">Analytics</h4>
                    </div>
                </Col>
            </Row>
            <Row>
                <Tab.Container defaultActiveKey="traffic">
                    <Card>
                        <Card.Body>
                            <Nav variant="pills" className="nav nav-pills bg-nav-pills nav-justified mb-3">
                            <Nav.Item className="nav-item">
                                    <Nav.Link href="#" eventKey="traffic" className="nav-link rounded-0">
                                        Traffic
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Nav.Link href="#" eventKey="mentors" className="nav-link rounded-0">
                                        Mentors
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Nav.Link href="#" eventKey="users" className="nav-link rounded-0">
                                        Users
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Nav.Link href="#" eventKey="locations" className="nav-link rounded-0">
                                        Locations
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Nav.Link href="#" eventKey="donations" className="nav-link rounded-0">
                                        Donations
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="traffic">
                                    <Row>
                                        <TrafficStatistics/>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="mentors">
                                    <Row>
                                        <MentorsAnalytics/>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="users">
                                    <Row>
                                        <Col xl={3} lg={3}>
                                            {activeUsers.usersComponentsStats}
                                        </Col>
                                        <Col xs={9}>
                                            <SplineUsersGrowth userStats={activeUsers.arrayOfUsers} />
                                        </Col>
                                    </Row>
                                </Tab.Pane>

                                <Tab.Pane eventKey="locations">
                                    <Row>
                                        <Col xl={3} lg={3}>
                                            <LocationsStatistics locationStats={activeLocations.arrayOfLocations} />
                                            <StatesStatistics locationStats={activeLocations.arrayOfLocations} />
                                        </Col>
                                        <Col xl={9} lg={9}>
                                            MAP
                                        </Col>
                                    </Row>
                                </Tab.Pane>

                                <Tab.Pane eventKey="donations">
                                    <Row>
                                        <Col xl={12} lg={12}>
                                            <DonationsStatistics donationsStats={activeDonations.arrayOfDonations} />
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Card.Body>
                    </Card>
                </Tab.Container>
            </Row>
        </Container>
    );
};

export default React.memo(AnalyticsDashboardPage);
