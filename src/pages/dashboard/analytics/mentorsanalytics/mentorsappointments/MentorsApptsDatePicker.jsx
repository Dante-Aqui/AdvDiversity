import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';

const MentorsApptsDatePicker = (props) => {
    const [dateRange] = useState(props.dateRange);

    const searchByDateRange = (values) => {
        props.searchByDateRange(values);
    };

    return (
        <Formik enableReinitialize={true} initialValues={dateRange} onSubmit={searchByDateRange}>
            <Form>
                <h5>Filter by Date</h5>
                <Row className="d-flex justify-content-around align-items-center">
                    <Col md={5}>
                        <div className="form-group">
                            <Field type="date" name="startDate" className="form-control" />
                            <ErrorMessage component="div" className="alert alert-danger" name="startDate" />
                        </div>
                    </Col>
                    <Col md={5}>
                        <div className="form-group">
                            <Field type="date" name="endDate" className="form-control" />
                            <ErrorMessage component="div" className="alert alert-danger" name="endDate" />
                        </div>
                    </Col>
                    <Col md={2}>
                        <button type="submit" className="btn btn-dark">
                            <FaSearch />
                        </button>
                    </Col>
                </Row>
            </Form>
        </Formik>
    );
};

MentorsApptsDatePicker.propTypes = {
    searchByDateRange: PropTypes.func,
    dateRange: PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    }),
};

export default React.memo(MentorsApptsDatePicker);
