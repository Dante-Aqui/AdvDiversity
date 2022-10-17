import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import userProfileService from '../../services/userProfilesService';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
import Swal from 'sweetalert2';
import FileUploader from '../files/FileUploader';
import debug from 'sabio-debug';
import { formValidationSchema } from '../../schema/userProfileEditFormSchema';
const _loggerPage = debug.extend('UserProfileEdit');

function UserProfileEdit() {
    const [profileFormData, setProfileFormData] = useState({
        id: 0,
        metaData: { firstName: '', lastName: '', mi: '', avatarUrl: '' },
    });

    const handleSubmit = (values) => {
        let payload = values;
        Swal.fire({
            title: !profileFormData.id ? 'Please Confirm Registration' : 'Please Confirm Update',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
        }).then((result) => {
            if (result.isConfirmed) {
                if (!profileFormData.id) {
                    userProfileService.profileRegister(payload).then(onAddProfileSuccess).catch(onAddProfileError);
                } else {
                    userProfileService
                        .updateById(profileFormData.id, payload)
                        .then(onEditProfileSuccess)
                        .catch(onEditProfileError);
                }
            }
        });
    };

    const onAddProfileSuccess = (response) => {
        _loggerPage('onAddProfileSuccess', response);
        setProfileFormData((prevState) => {
            const newProfileObject = {
                ...prevState,
            };
            newProfileObject.id = response.id;
            return newProfileObject;
        });
        toastr.success('User Profile has been successufully added');
        Swal.fire('Registration Complete', 'Your profile has been registered.', 'success');
    };
    const onAddProfileError = (err) => {
        _loggerPage('onAddProfileError', err);
        toastr.error('Unable to register profile');
    };

    const onEditProfileSuccess = (response) => {
        _loggerPage('onEditProfileSuccess', response);
        toastr.success('User Profile has been successufully updated');
        Swal.fire('Update Complete', 'Your profile has been updated.', 'success');
    };

    const onEditProfileError = (err) => {
        _loggerPage('onEditProfileError', err);
        toastr.error('Unable to update profile');
    };

    useEffect(() => {
        userProfileService.getUserProfile().then(onGetProfileSuccess).catch(onGetProfileError);
    }, []);

    const onGetProfileSuccess = (response) => {
        _loggerPage('onGetProfileSuccess', response);
        setProfileFormData((prevState) => {
            const newProfileObject = {
                ...prevState,
            };
            newProfileObject.metaData.firstName = response.firstName;
            newProfileObject.metaData.mi = response.mi;
            newProfileObject.metaData.lastName = response.lastName;
            newProfileObject.metaData.avatarUrl = response.avatarUrl;
            newProfileObject.id = response.id;
            return newProfileObject;
        });
    };
    const onGetProfileError = (err) => {
        _loggerPage('Profile does not exist for the user', err);
        toastr.error('User Profile needs to be created');
    };

    const onHandleUploadSuccess = (response, setFieldValue) => {
        _loggerPage('onHandleUploadSuccess url', response[0].url);
        setFieldValue('avatarUrl', response[0].url);
    };

    return (
        <React.Fragment>
            <div className="row mt-3" />
            <Card className="text-center h-100">
                <Card.Body>
                    <Formik
                        enableReinitialize={true}
                        initialValues={profileFormData.metaData}
                        onSubmit={handleSubmit}
                        validationSchema={formValidationSchema}>
                        {({ values, touched, errors, setFieldValue }) => (
                            <>
                                <div className="row mt-1">
                                    <Col xl={2} />
                                    <Col xl={3}>
                                        <Card className="text-center h-100">
                                            <Card.Body>
                                                <img
                                                    src={values.avatarUrl ? values.avatarUrl : 'https://bit.ly/3wSLYqv'}
                                                    className="rounded-circle avatar-lg img-thumbnail"
                                                    alt=""
                                                />
                                                <h4 className="mb-0 mt-2">
                                                    {values.firstName} {values.lastName}
                                                </h4>
                                                <p className="text-muted font-14">Founder</p>
                                                <Button className="btn btn-success btn-sm mb-2">Follow</Button>{' '}
                                                <Button className="btn btn-danger btn-sm mb-2">Message</Button>
                                                <div className="text-start mt-3">
                                                    <h4 className="font-13 text-uppercase">About Me :</h4>
                                                    <p className="text-muted font-13 mb-3">
                                                        Hi I am {values.firstName} {values.lastName}. I have 100 years
                                                        of software enginnering experience and I aspire to go time
                                                        travel one day and meet myself.
                                                    </p>
                                                    <p className="text-muted mb-2 font-13">
                                                        <strong>Full Name :</strong>
                                                        <span className="ms-2">
                                                            {values.firstName} {values.mi} {values.lastName}
                                                        </span>
                                                    </p>

                                                    <p className="text-muted mb-2 font-13">
                                                        <strong>Mobile :</strong>
                                                        <span className="ms-2">(123) 123 1234</span>
                                                    </p>

                                                    <p className="text-muted mb-2 font-13">
                                                        <strong>Email :</strong>
                                                        <span className="ms-2 ">user@email.domain</span>
                                                    </p>

                                                    <p className="text-muted mb-1 font-13">
                                                        <strong>Location :</strong>
                                                        <span className="ms-2">USA</span>
                                                    </p>
                                                </div>
                                                <ul className="social-list list-inline mt-3 mb-0">
                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="#"
                                                            className="social-list-item border-primary text-primary">
                                                            <FontAwesomeIcon icon={faFacebook} />
                                                        </Link>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="#"
                                                            className="social-list-item border-danger text-danger">
                                                            <FontAwesomeIcon icon={faGoogle} />
                                                        </Link>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <Link to="#" className="social-list-item border-info text-info">
                                                            <FontAwesomeIcon icon={faTwitter} />
                                                        </Link>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <Link
                                                            to="#"
                                                            className="social-list-item border-secondary text-secondary">
                                                            <FontAwesomeIcon icon={faGithub} />
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xl={5}>
                                        <Card className="text-center h-100">
                                            <div className="row mt-3" />
                                            <h4>User Profile Information</h4>
                                            <div className="row mt-3" />
                                            <Form>
                                                <label
                                                    htmlFor="firstName"
                                                    className="w-75"
                                                    style={{ textAlign: 'left' }}>
                                                    First Name
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control mt-1 w-75 mx-auto"
                                                />
                                                {touched.firstName && errors.firstName && (
                                                    <div
                                                        className="text-danger w-50"
                                                        style={{ alignContent: 'left', paddingLeft: '2.3rem' }}>
                                                        {errors.firstName}
                                                    </div>
                                                )}
                                                <label htmlFor="mi" className="my-1 w-75" style={{ textAlign: 'left' }}>
                                                    Middle Initial
                                                </label>
                                                <Field type="text" name="mi" className="form-control w-75 mx-auto" />
                                                <label
                                                    htmlFor="lastName"
                                                    className="my-1 w-75"
                                                    style={{ textAlign: 'left' }}>
                                                    Last Name
                                                </label>
                                                <Field
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control w-75 mx-auto"
                                                />
                                                {touched.lastName && errors.lastName && (
                                                    <div
                                                        className="text-danger w-50"
                                                        style={{ alignContent: 'left', paddingLeft: '2.3rem' }}>
                                                        {errors.lastName}
                                                    </div>
                                                )}

                                                <div className="row mt-4" />
                                                <label htmlFor="url" className="form-label text-left">
                                                    Profile Image
                                                </label>
                                                <div className="row mt-1" />
                                                <div className="px-2">
                                                    <FileUploader
                                                        onHandleUploadSuccess={(response) =>
                                                            onHandleUploadSuccess(response, setFieldValue)
                                                        }
                                                        isMultilple={true}
                                                    />
                                                </div>
                                                {touched.avatarUrl && errors.avatarUrl && (
                                                    <div className="text-danger">{errors.avatarUrl}</div>
                                                )}
                                                <div className="row mt-4" />
                                                <Button
                                                    className="btn-primary"
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit">
                                                    {!profileFormData.id ? 'Add' : 'Update'}
                                                </Button>
                                            </Form>
                                        </Card>
                                    </Col>
                                </div>
                            </>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
}

export default UserProfileEdit;
