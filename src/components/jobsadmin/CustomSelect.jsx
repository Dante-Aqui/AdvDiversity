import React, { useState, useEffect, Fragment } from 'react';
import Select, { components } from 'react-select';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import JobsFormAddLocation from './JobsFormAddLocation';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import locationService from '../../services/locationService';
import usersServices from '../../services/usersServices';

const _logger = debug.extend('CustomSelect');

const CustomSelect = ({ setJobsData, setPreviewData }) => {
    const [locData, setLocData] = useState({
        locations: [],
        locationsMapped: [],
    });

    const [customSelect, setCustomSelect] = useState({
        locations: [],
        locationsMapped: [],
    });

    const [selectArray, setSelectArray] = useState({
        arrayData: [],
    });

    const [modalShow, setModalShow] = useState(false);

    const [selected, setSelected] = useState({
        value: '',
        label: '',
        key: '',
    });

    useEffect(() => {
        const pageIndex = 0;
        const pageSize = 1000;
        usersServices.getCurrent().then(onGetUserSuccess).catch(onGetUserError);
        locationService
            .getPagesLocations(pageIndex, pageSize)
            .then(getPagesLocationSuccess)
            .catch(getPagesLocationError);
    }, []);

    const onGetUserSuccess = (response) => {
        const userId = response.data.item.id;
        locationService.getCreatedByLocations(userId, 0, 1000).then(onGetLocationSuccess).catch(onGetLocationError);
    };
    const onGetUserError = (error) => {
        _logger(error);
    };

    const onGetLocationSuccess = (response) => {
        _logger('look here', response);
        let returnedArray = response.data.item.pagedItems;
        let pageIndex = response.data.item.pagedIndex;
        let totalCount = response.data.item.totalCount;

        setCustomSelect((prevState) => {
            const prevData = { ...prevState };
            prevData.locations = returnedArray;
            prevData.pageIndex = pageIndex;
            prevData.totalCount = totalCount;
            prevData.locationsMapped = prevData.locations.map((location, index) => {
                return {
                    value: location.id,
                    label: `${location.lineOne} ${location.lineTwo} ${location.city} ${location.state} ${location.zip}`,
                    key: index,
                };
            });
            return prevData;
        });
    };
    const onGetLocationError = (error) => {
        _logger(error);
    };

    const getPagesLocationSuccess = (response) => {
        let returnedArray = response.data.item.pagedItems;
        let pageIndex = response.data.item.pagedIndex;
        let totalCount = response.data.item.totalCount;

        setSelectArray((prevState) => {
            const prevData = { ...prevState };
            prevData.locations = returnedArray;
            prevData.arrayData = prevData.locations.map((location, index) => {
                return {
                    value: location.id,
                    label: `${location.lineOne} ${location.lineTwo} ${location.city} ${location.state} ${location.zip}`,
                    key: index,
                    lineOne: location.lineOne,
                    lineTwo: location.lineTwo,
                    city: location.city,
                    state: location.state,
                    zip: location.zip,
                };
            });
            return prevData;
        });

        setLocData((prevState) => {
            const prevData = { ...prevState };
            prevData.locations = returnedArray;
            prevData.pageIndex = pageIndex;
            prevData.totalCount = totalCount;
            prevData.locationsMapped = prevData.locations.map((location, index) => {
                return {
                    value: location.id,
                    label: `${location.lineOne} ${location.lineTwo} ${location.city} ${location.state} ${location.zip}`,
                    key: index,
                };
            });
            return prevData;
        });
    };
    const getPagesLocationError = (error) => {
        _logger(error, 'getLocation Error');
    };

    const AddAddressClicked = (props) => {
        return (
            <Modal {...props} size="xl" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter centered">
                        <h2 className="formTitle">Add Address</h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JobsFormAddLocation
                        setModalShow={setModalShow}
                        setLocData={setLocData}
                        setSelectArray={setSelectArray}></JobsFormAddLocation>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="rounded">
                        <strong>Close</strong>
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const Menu = (props) => {
        return (
            <Fragment>
                <components.Menu {...props}>
                    <div>
                        <div>
                            <div>{props.children}</div>
                            <div>
                                <Row>
                                    <Col>
                                        <div className="select-button-wrapper">
                                            <button
                                                className="change-data btn btn-primary rounded"
                                                onClick={() => setModalShow(true)}>
                                                <strong>Add An Address</strong>
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </components.Menu>
            </Fragment>
        );
    };

    const changeOptionsData = () => {
        const renderArray = selectArray.arrayData;
        const wholeArray = locData.locationsMapped;
        const userArray = customSelect.locationsMapped;

        if (renderArray.length === wholeArray.length) {
            setSelectArray(() => ({
                arrayData: userArray,
            }));
        } else {
            setSelectArray(() => ({
                arrayData: wholeArray,
            }));
        }
    };

    const handleChange = (event) => {
        _logger('this is event', event);

        setJobsData((prevState) => {
            const locData = { ...prevState };
            locData.mainFormData.locationId = event.value;
            return locData;
        });

        setPreviewData((prevState) => {
            const prevData = { ...prevState };
            prevData.lineOne = event.lineOne;
            prevData.lineTwo = event.lineTwo;
            prevData.city = event.city;
            prevData.state = event.state;
            prevData.zip = event.zip;
            return prevData;
        });

        setSelected((prevState) => {
            const prevData = { ...prevState };
            prevData.value = event.value;
            prevData.label = event.label;
            prevData.key = event.key;
            _logger('this is prevData', prevData);
            return prevData;
        });
    };

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Select
                        options={selectArray.arrayData}
                        components={{ Menu, IndicatorSeparator: () => null }}
                        changeOptionsData={changeOptionsData}
                        onChange={handleChange}
                        value={selected}
                        name="locationId"
                    />
                    <AddAddressClicked show={modalShow} onHide={() => setModalShow(false)} />
                </Col>
            </Row>
        </div>
    );
};

CustomSelect.propTypes = {
    children: PropTypes.func,
    changeOptionsData: PropTypes.func,
    options: PropTypes.func,
    onChange: PropTypes.func,
    onHide: PropTypes.func,
    setJobsData: PropTypes.func,
    setPreviewData: PropTypes.func,
};

export default CustomSelect;
