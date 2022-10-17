import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col } from 'react-bootstrap';
import VenuesValidationForm from '../../schema/VenuesValidationSchema';
import debug from 'sabio-debug';
import * as venueService from '../../services/venueService';
import locationService from '../../services/locationService';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

function VenuesForm() {
    const _logger = debug.extend('ResourcesForm');

    const [venuesData, setVenuesData] = useState({
        formData: {
            id: '',
            name: '',
            description: '',
            locationId: '',
            url: '',
            createdBy: 1,
        },
        locations: [],
    });

    const { state } = useLocation();
    const { id } = useParams();
    const [venueId, setVenueId] = useState({ id: '' });

    useEffect(() => {
        _logger('UseEffect Firing');

        setVenueId(id);
        if (state) {
            setVenuesData((prevState) => {
                let rd = { ...prevState };

                rd.formData.id = id;
                rd.formData.name = state.payload.name;
                rd.formData.description = state.payload.description;
                rd.formData.locationId = state.payload.locationId;
                rd.formData.url = state.payload.url;
                rd.formData.createdBy = state.payload.createdBy;

                return rd;
            });
        }
        locationService.getPagesLocations(0, 50).then(getPagesLocationSuccess).catch(getPagesLocationError);
    }, []);

    const getPagesLocationSuccess = (data) => {
        _logger(data.data.item.pagedItems);
        let returnedArray = data.data.item.pagedItems;

        setVenuesData((prevState) => {
            const ld = { ...prevState };
            ld.locations = returnedArray;
            return ld;
        });
    };

    const mapLocation = (location) => {
        return (
            <option value={location.id} key={`locationId_${location.id}`}>
                {location.lineOne} {location.lineTwo} {location.city} {location.state}
            </option>
        );
    };

    const getPagesLocationError = (error) => {
        _logger(error, 'getLocation Error');
        toastr.error('Unable to retrieve Locations from server', 'Failed To Retrieve Locations');
    };

    const submitForm = (values) => {
        _logger('Submitting Form');
        _logger('submit form values', values);
        _logger(venueId, 'Id being passed');
        if (venueId === undefined) {
            _logger('id not detected, adding new resource');
            venueService.addVenues(values).then(onAddResourceSuccess).catch(onAddResourceError);
        } else {
            _logger('id detected, updating venues');
            venueService
                .updateVenues(venuesData.formData.id, values)
                .then(onUpdateResourceSuccess)
                .catch(onUpdateResourceError);
        }
    };

    const onAddResourceSuccess = (response) => {
        _logger(response, 'Resource Add Success');
        toastr.success('You have successfully added a Venue', 'Venue Added');

        let returnedResponse = response.data.item;
        setVenuesData((prevState) => {
            const form = { ...prevState };
            form.formData.id = returnedResponse;
            return form;
        });
    };

    const onAddResourceError = (error) => {
        _logger(error, 'Resource Add Error');
        toastr.error('You were unsuccessful to add a Venue', 'Failed To Add Venue');
    };

    const onUpdateResourceSuccess = (response) => {
        _logger(response, 'Update Resource Success');
        toastr.success('You have successfully updated a Venue', 'Venue Updated');
    };

    const onUpdateResourceError = (error) => {
        _logger(error, 'Update Resource Error');
        toastr.error('You were unsuccessful to update a Venue', 'Failed To Update Venue');
    };

    return (
        <Row className="m-3">
            <Col>
                <div className="container-fluid">
                    <div className="card p-3">
                        <Formik
                            enableReinitialize={true}
                            initialValues={venuesData.formData}
                            onSubmit={submitForm}
                            validationSchema={VenuesValidationForm}>
                            {(props) => {
                                const { values, handleChange } = props;
                                return (
                                    <Form>
                                        <div>
                                            <h3>Add/Update Venue</h3>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <Field
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="description">Description</label>
                                            <Field
                                                type="text"
                                                name="description"
                                                className="form-control"
                                                value={values.description}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage name="description" component="div" className="text-danger" />
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="locationId">Location</label>
                                            <Field component="select" name="locationId" className="form-control">
                                                <option value="">Select a Location</option>
                                                {venuesData.locations.map(mapLocation)}
                                            </Field>
                                            <ErrorMessage name="locationId" component="div" className="text-danger" />
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <label htmlFor="url">Url</label>
                                            <Field
                                                type="text"
                                                name="url"
                                                className="form-control"
                                                value={values.url}
                                                onChange={handleChange}
                                            />
                                            <ErrorMessage name="url" component="div" className="text-danger" />
                                        </div>
                                        <div className="btn text-center col-md-12">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

VenuesForm.propTypes = {
    values: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        locationId: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
    }),
    handleChange: PropTypes.func,
    func: PropTypes.func,
};

export default VenuesForm;
