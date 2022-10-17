import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import debug from 'sabio-debug';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import mentorService from '../../services/mentorService';
import MentorsSchema from './MentorsValidationSchema';
import * as MentorsPropTypes from './mentorsPropTypes';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import { Card, Col, Row } from 'react-bootstrap';
import Logo from '../../assets/images/users/banner.png';
const _logger = debug.extend('MentorsForm');

function MentorsForm() {
    const [MentorData, setMentorData] = useState({
        id: '',
        summary: '',
        description: '',
        siteUrl: '',
        phone: '',
        isApproved: 1,
    });

    const { state } = useLocation();
    const { id } = useParams();
    const [mentorId, setMentorId] = useState({ id: '' });

    useEffect(() => {
        _logger('UseEffect Firing');

        setMentorId(id);
        if (state) {
            setMentorData((prevState) => {
                let md = { ...prevState };
                md.id = id;
                md.summary = state.payload.summary;
                md.description = state.payload.description;
                md.siteUrl = state.payload.siteUrl;
                md.phone = state.payload.phone;
                md.isApproved = state.payload.isApproved;

                return md;
            });
        }
    }, []);

    const onSubmitClick = (values) => {
        _logger(values);
        if (mentorId === undefined) {
            _logger('id not detected, adding new resource');
            mentorService.addMentor(values).then(onAddMentorSuccess).catch(onAddMentorError);
        } else {
            _logger('id detected, updating resource');
            mentorService.updateMentor(MentorData.id, values).then(onUpdateMentorsSuccess).catch(onUpdateMentorsError);
        }
    };

    const onUpdateMentorsSuccess = (response) => {
        toastr.success('Mentor Update Successful');
        _logger('onUpdateMentorsSuccess', response);
    };

    const onUpdateMentorsError = (error) => {
        toastr.error('Mentor Update Failed');
        _logger(error, 'onUpdateMentorsError');
    };

    const onAddMentorSuccess = (response) => {
        toastr.success('Mentor added Successfully!');
        _logger(response, 'onAddMentorSuccess');
    };

    const onAddMentorError = (error) => {
        toastr.error('Failed to add Mentor');
        _logger(error, 'onAddMentorError');
    };

    return (
        <Row className="m-3">
            <Col>
                <div className="container-fluid">
                    <div className="card p-3">
                        <Formik
                            enableReinitialize={true}
                            initialValues={MentorData}
                            onSubmit={onSubmitClick}
                            validationSchema={MentorsSchema}>
                            {({ values }) => (
                                <Form>
                                    <div>
                                        <h3>Mentor Form</h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-6 card">
                                            <Row className="mb-3">
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="phone">Phone</label>
                                                        <Field
                                                            type="text"
                                                            name="phone"
                                                            className="form-control"
                                                            placeholder="(123) 456-789"></Field>
                                                        <ErrorMessage
                                                            name="phone"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <div className="form-group">
                                                        <label htmlFor="siteUrl">E-Mail</label>
                                                        <Field
                                                            type="text"
                                                            name="siteUrl"
                                                            className="form-control"
                                                            placeholder="JonDoe@Email.com"></Field>
                                                        <ErrorMessage
                                                            name="siteUrl"
                                                            component="div"
                                                            className="text-danger"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="summary">Summary</label>
                                                    <Field
                                                        type="text"
                                                        name="summary"
                                                        className="form-control"
                                                        placeholder="Brief Summary"></Field>
                                                    <ErrorMessage
                                                        name="summary"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </div>
                                            </Row>
                                            <Row className="mb-3">
                                                <div className="form-group">
                                                    <label htmlFor="description">Description</label>
                                                    <Field
                                                        type="text"
                                                        name="description"
                                                        className="form-control"
                                                        placeholder="Tell us more!"></Field>
                                                    <ErrorMessage
                                                        name="description"
                                                        component="div"
                                                        className="text-danger"
                                                    />
                                                </div>
                                                <div className="d-grid my-2 d-md-flex justify-content-md-end">
                                                    <button type="submit" className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div>
                                            </Row>
                                        </div>

                                        <Col>
                                            <Card>
                                                <Card.Header className="bg-primary">
                                                    <span>
                                                        <img src={Logo} className="card-img-top h-75 w-100" alt="" />
                                                    </span>
                                                </Card.Header>
                                                <Card.Body className={values.siteUrl ? 'position-relative' : ''}>
                                                    <div className="fw-semibold">Phone: {values.phone}</div>
                                                    <div className="fw-semibold">Website: {values.siteUrl}</div>
                                                    <div className="fw-semibold">Summary: {values.summary}</div>
                                                    <div className="fw-semibold">Description: {values.description}</div>
                                                </Card.Body>
                                                <div
                                                    className="container justify-content-center"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Link
                                                        to="/mentors"
                                                        element=""
                                                        className="btn btn-primary"
                                                        style={{ margin: `5px` }}>
                                                        Mentors List
                                                    </Link>
                                                </div>
                                            </Card>
                                        </Col>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default MentorsForm;

MentorsForm.propTypes = MentorsPropTypes.mentorsPropTypes;
