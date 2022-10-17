import React, { useState, useEffect } from 'react';
import { Tab, Nav, Card, Row, Col } from 'react-bootstrap';
import TrafficStatisticsChart from './TrafficStatisticsChart';
import TrafficDatePicker from '../TrafficDatePicker';
import PageViewsTab from './pageviews/PageViewsTab';
import UsersTab from './users/UsersTab';
import SessionsTab from './sessions/SessionsTab';
import googleAnalyticsService from '../../../../services/googleAnalyticsService';
import toastr from 'toastr';
import debug from 'sabio-debug';

const _loggerTrafficStatics = debug.extend('TrafficStats');

const today = new Date();
const previousWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

const TrafficStatistics = () => {
    const [trafficData, setTrafficData] = useState({
        dateRange: {
            startDate: previousWeek.toISOString().split('T')[0],
            endDate: today.toISOString().split('T')[0],
        },
        pageViews: {
            count: [],
            pages: [],
            countByPage: [],
            avgTimeOnPage: [],
            total: 0,
        },
        users: {
            count: [],
            total: 0,
        },
        sessions: {
            count: [],
            total: 0,
        },
        metricInfoTarget: 'pageViews',
        chartMetricInfo: {
            title: 'Page Views',
            dates: [],
            count: [],
        },
    });

    useEffect(() => {
        googleAnalyticsService
            .getTrafficData(trafficData.dateRange.startDate, trafficData.dateRange.endDate)
            .then(onGetAnalyticDataSuccessful)
            .catch(onGetAnalyticDataError);
    }, [trafficData.dateRange]);

    const onGetAnalyticDataSuccessful = (response) => {
        setTrafficData((prevState) => {
            const td = { ...prevState };
            const { pageViews, users, sessions, dates } = response;
            td.pageViews = pageViews;
            td.users = users;
            td.sessions = sessions;

            const target = td.metricInfoTarget;
            td.chartMetricInfo.title = td[target].title;
            td.chartMetricInfo.count = [...td[target].count];
            td.chartMetricInfo.dates = [...dates];

            return td;
        });
    };

    const onGetAnalyticDataError = (error) => {
        _loggerTrafficStatics(error);
        toastr.error(error, 'Oops, something went wrong.');
    };

    const searchByDateRange = (dateRange) => {
        setTrafficData((prevState) => {
            const td = { ...prevState };
            td.dateRange = dateRange;
            return td;
        });
    };

    const viewMorePagesInfoInChart = () => {
        setTrafficData((prevState) => {
            const td = { ...prevState };
            td.metricInfoTarget = 'pageViews';
            td.chartMetricInfo.title = 'Page Views';
            td.chartMetricInfo.count = td['pageViews'].count;
            return td;
        });
    };

    const viewMoreUsersInfoInChart = () => {
        setTrafficData((prevState) => {
            const td = { ...prevState };
            td.metricInfoTarget = 'users';
            td.chartMetricInfo.title = 'Users';
            td.chartMetricInfo.count = td['users'].count;
            return td;
        });
    };

    const viewMoreSessionssInfoInChart = () => {
        setTrafficData((prevState) => {
            const td = { ...prevState };
            td.metricInfoTarget = 'sessions';
            td.chartMetricInfo.title = 'Sessions';
            td.chartMetricInfo.count = td['sessions'].count;
            return td;
        });
    };

    return (
        <React.Fragment>
            <Tab.Container defaultActiveKey="pageViews">
                <Row className="mb-3 d-flex">
                    <TrafficDatePicker searchByDateRange={searchByDateRange} dateRange={trafficData.dateRange} />
                </Row>
                <Row>
                    <Card>
                        <Card.Body>
                            <Nav variant="pills" className="nav nav-pills bg-nav-pills nav-justified">
                                <Nav.Item className="nav-item">
                                    <Nav.Link
                                        href="#"
                                        eventKey="pageViews"
                                        className="nav-link rounded-0 py-4"
                                        onClick={viewMorePagesInfoInChart}>
                                        <h5 className="text-uppercase">page views</h5>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Nav.Link
                                        href="#"
                                        eventKey="users"
                                        className="nav-link rounded-0 py-4"
                                        onClick={viewMoreUsersInfoInChart}>
                                        <h5 className="text-uppercase">users</h5>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Nav.Link
                                        href="#"
                                        eventKey="sessions"
                                        className="nav-link rounded-0 py-4 px-2"
                                        onClick={viewMoreSessionssInfoInChart}>
                                        <h5 className="text-uppercase">sessions</h5>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Card.Body>
                    </Card>
                </Row>
                <Row>
                    <Col xs={4}>
                        <Tab.Content>
                            <Tab.Pane eventKey="pageViews">
                                {trafficData.metricInfoTarget === 'pageViews' && (
                                    <PageViewsTab dateRange={trafficData.dateRange} />
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="users">
                                {trafficData.metricInfoTarget === 'users' && (
                                    <UsersTab dateRange={trafficData.dateRange} />
                                )}
                            </Tab.Pane>
                            <Tab.Pane eventKey="sessions">
                                {trafficData.metricInfoTarget === 'sessions' && (
                                    <SessionsTab dateRange={trafficData.dateRange} />
                                )}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                    {trafficData.chartMetricInfo.dates.length > 0 && (
                        <Col xs={8}>
                            <TrafficStatisticsChart
                                chartMetricInfo={{
                                    title: trafficData.chartMetricInfo.title,
                                    dates: trafficData.chartMetricInfo.dates,
                                    count: trafficData.chartMetricInfo.count,
                                }}
                            />
                        </Col>
                    )}
                </Row>
            </Tab.Container>
        </React.Fragment>
    );
};

export default React.memo(TrafficStatistics);
