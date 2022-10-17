import React, { useState, useEffect } from 'react';
import { Card, Row } from 'react-bootstrap';
import SessionsRadarChart from './SessionsRadarChart';
import googleAnalyticsService from '../../../../../services/googleAnalyticsService';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import SessionsBarChart from './SessionsBarChart';

const _loggerSessionsTab = debug.extend('SessionsTab');

const SessionsTab = (props) => {
    const [sessions, setSessions] = useState({
        browsers: {
            names: [],
            count: [],
        },
        devices: {
            categories: [],
            count: [],
        },
    });

    useEffect(() => {
        googleAnalyticsService
            .getSessionsInfo(props.dateRange.startDate, props.dateRange.endDate)
            .then(onGetSessionsInfoSuccessful)
            .catch(onGetSessionsInfoError);
    }, [props.dateRange]);

    const onGetSessionsInfoSuccessful = (response) => {
        const { browsers, devices } = response;

        setSessions((prevState) => {
            const s = { ...prevState };
            s.browsers = browsers;
            s.devices = devices;
            return s;
        });
    };

    const onGetSessionsInfoError = (error) => {
        _loggerSessionsTab(error);
        toastr.error(error, 'Oops, something went wrong.');
    };

    return (
        <Row className="d-flex flex-column">
            <Card className="tilebox-one border border-primary p-0">
                <Card.Header className="bg-primary text-light">
                    <h4 className="header-title text-center">Sessions by browser</h4>
                </Card.Header>
                <Card.Body>
                    <SessionsRadarChart
                        sessionsInfo={{ browsers: sessions.browsers.names, count: sessions.browsers.count }}
                    />
                </Card.Body>
            </Card>
            <Card className="tilebox-one border border-primary p-0">
                <Card.Header className="bg-primary text-light">
                    <h4 className="header-title text-center">Sessions by device</h4>
                </Card.Header>
                <Card.Body>
                    <SessionsBarChart
                        sessionsInfo={{ devices: sessions.devices.categories, count: sessions.devices.count }}
                    />
                </Card.Body>
            </Card>
        </Row>
    );
};

SessionsTab.propTypes = {
    dateRange: PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    }),
};

export default React.memo(SessionsTab);
