import React, { useState, useEffect } from 'react';
import { Card, Row, Modal, ModalHeader, ModalBody } from 'react-bootstrap';
import { BiExpand } from 'react-icons/bi';
import UsersDonutChart from './UsersDonutChart';
import UsersMap from './usersmap/UsersMap';
import worldMapData from './usersmap/worldMapData';
import googleAnalyticsService from '../../../../../services/googleAnalyticsService';
import toastr from 'toastr';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const _loggerUsersTab = debug.extend('UsersTab');

const UsersTab = (props) => {
    const [users, setUsers] = useState({
        users: 0,
        newUsers: 0,
        returningUsers: 0,
        countries: [],
    });

    const [show, setShow] = useState(false);

    useEffect(() => {
        googleAnalyticsService
            .getUsersInfo(props.dateRange.startDate, props.dateRange.endDate)
            .then(onGetUsersInfoSuccessful)
            .catch(onGetUsersInfoError);
    }, [props.dateRange]);

    const onGetUsersInfoSuccessful = (response) => {
        const { users, newUsers, returningUsers, countries } = response;

        setUsers((prevState) => {
            const u = { ...prevState };
            u.users = users;
            u.newUsers = newUsers;
            u.returningUsers = returningUsers;
            u.countries = countries.map(mapCountryToId);
            return u;
        });
    };

    const onGetUsersInfoError = (error) => {
        _loggerUsersTab(error);
        toastr.error(error, 'Oops, something went wrong.');
    };

    const mapCountryToId = (country) => {
        const layers = worldMapData.layers;
        let index = layers.findIndex((layer) => layer['name'] === country);
        return layers[index]['id'];
    };

    const toggleModal = () => setShow(!show);

    return (
        <Row className="d-flex flex-column h-100">
            <Modal show={show} onHide={toggleModal} backdrop="static" keyboard="false" size="lg" centered>
                <ModalHeader closeButton className="w-100" />
                <ModalBody className="w-100 mx-auto p-3">
                    <UsersMap countries={users.countries} />
                </ModalBody>
            </Modal>
            <Card className="tilebox-one border border-primary p-0">
                <Card.Header className="bg-primary text-light">
                    <h4 className="header-title text-center">Users distribution</h4>
                </Card.Header>
                <Card.Body>
                    <UsersDonutChart usersInfo={{ newUsers: users.newUsers, returningUsers: users.returningUsers }} />
                </Card.Body>
            </Card>
            <Card className="tilebox-one border border-primary p-0">
                <Card.Header className="bg-primary text-light">
                    <h4 className="header-title text-center">Users locations</h4>
                </Card.Header>
                <Card.Body className="p-1">
                    {users.countries && (
                        <span>
                            <div className="d-flex justify-content-end align-items-start">
                                <button className="btn btn-link" onClick={toggleModal}>
                                    <h3>
                                        <BiExpand />
                                    </h3>
                                </button>
                            </div>
                            <UsersMap countries={users.countries} />
                        </span>
                    )}
                </Card.Body>
            </Card>
        </Row>
    );
};

UsersTab.propTypes = {
    dateRange: PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    }),
};

export default React.memo(UsersTab);
