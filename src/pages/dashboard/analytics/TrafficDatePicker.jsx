import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import analyticsDatePickerSchema from '../../../schema/analyticsDatePickerSchema';

const TrafficDatePicker = (props) => {
    const [dateRange] = useState(props.dateRange);

    const searchByDateRange = (values) => {
        props.searchByDateRange(values);
    };

    return (
        <Formik
            enableReinitialize={true}
            initialValues={dateRange}
            onSubmit={searchByDateRange}
            validationSchema={analyticsDatePickerSchema}>
            <Form className="d-flex justify-content-end">
                <Row className="w-50">
                    <Col>
                        <div className="form-group">
                            <label htmlFor="startDate">Start Date</label>
                            <Field type="date" name="startDate" className="form-control" />
                            <ErrorMessage component="div" className="alert alert-danger" name="startDate" />
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group">
                            <label htmlFor="endDate">End Date</label>
                            <Field type="date" name="endDate" className="form-control" />
                            <ErrorMessage component="div" className="alert alert-danger" name="endDate" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button type="submit" className="btn btn-primary mt-3 mx-2 py-1">
                            <FaSearch />
                        </button>
                    </Col>
                </Row>
            </Form>
        </Formik>
    );
};

TrafficDatePicker.propTypes = {
    searchByDateRange: PropTypes.func.isRequired,
    dateRange: PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    }),
};

export default React.memo(TrafficDatePicker);
