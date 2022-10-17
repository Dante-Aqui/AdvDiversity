import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import usersServices from '../../services/usersServices';
import mentorService from '../../services/mentorService';
import calendarService from '../../services/calendlyService';
import { Card, Col, Button, CloseButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import Calendly from '../calendly/Calendly';
import Modal from "react-modal"

const Matches = (props) => {
    const aMatch = props.matches;
    const _logger = debug.extend('MenteeMatches');

    const [showModal, setShowModal] = useState(false);
    const [userUrl, setUserUrl] = useState("")
    const [emailPerson, setEmailPerson] = useState("")

    _logger(props, "props")
    const onSurveyClick = (e) => {
        _logger('onSubmitClick Firing', e.target.value, { syntheticEvent: e });
        const targetId = e.target.value;
        Swal.fire({
            title: 'Please confirm',
            text: 'Would you like to email a survey to this mentee?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                usersServices.getUserById(targetId).then(onGetCurrentSuccess).catch(onGetCurrentError);
            }
        });
    };

    const onGetCurrentSuccess = (res) => {
        const targetEmail = res.data.item.email;
        _logger('onGetCurrentSuccess', targetEmail);
        const targetObject = {
            fullName: `${aMatch.firstName} ${aMatch.lastName}`,
            email: targetEmail,
            path: '/surveys/forms/130',
        };
        mentorService.sendSurveyEmail(targetObject).then(onSurveySuccess).catch(onSurveyError);
    };

    const onGetCurrentError = () => {
        toastr['error'](`Sorry, I am having trouble locating this mentee.`);
    };

    const onSurveySuccess = () => {
        toastr['success']('Email successfully sent.');
    };

    const onSurveyError = () => {
        toastr['error']('Sorry, something went wrong.');
    };

    const onDeleteMentee = () => {
        props.onDeleteMentee(props.matches.userId);
    };

    useEffect(() => {
        calendarService.getCurrentUserMentor().then(onGetCurrMentorSuccess).catch(onGetCurrMentorError);
    }, []);

    const onGetCurrMentorSuccess = ({ item: { resource } }) => {
        if (resource) {
            setUserUrl(resource?.scheduling_url)
        }
    }

    const onGetCurrMentorError = () => {
        toastr.error("Could not fetch mentor")
    }

    const onLocalPersonClicked = () => {
        getEmailPerson(props.matches)
    }

    const getEmailPerson = (emailToRetrieve) => {
        _logger(emailToRetrieve, "email");

        setEmailPerson(emailToRetrieve.email)
    }

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const openCalendlyPersonData = () => {
        openModal();
        onLocalPersonClicked()
    }

    if (!aMatch) {
        return <p>You have no matches. Connect with a Mentee today!</p>;
    } else {
        return (
            <React.Fragment>
                <Col>
                    <Card className="text-center">
                        <CloseButton onClick={onDeleteMentee} />
                        <Card.Body>
                            <img src={aMatch.avatarUrl} className="rounded-circle avatar-sm img-thumbnail" alt="" />
                            <h4 className="mb-0 mt-2">
                                {aMatch.firstName} {aMatch.lastName}
                            </h4>
                            <p className="text-muted font-14">Founder</p>
                            <Link to="/daily" className="btn btn-success btn-sm mb-2">
                                Zoom
                            </Link>{' '}
                            <Button
                                className="btn btn-danger btn-sm mb-2"
                                onClick={onSurveyClick}
                                value={aMatch.userId}>
                                Survey
                            </Button>
                            <Button onClick={openCalendlyPersonData}>
                                Create Appointment
                            </Button>
                            <Modal isOpen={showModal}
                                onRequestClose={closeModal}
                                contentLabel="Set new appointment"
                                ariaHideApp={false}>
                                <Button onClick={closeModal}>Close</Button>
                                <Calendly ownerUrl={userUrl} emailPerson={emailPerson} />
                            </Modal>
                            <div className="text-start mt-3">
                                <h4 className="font-13 text-uppercase">About Me :</h4>
                                <p className="text-muted font-13 mb-3">
                                    Hi I am {aMatch.firstName} {aMatch.lastName}. I have 100 years of software
                                    enginnering experience and I aspire to go time travel one day and meet myself.
                                </p>
                                <p className="text-muted mb-2 font-13">
                                    <strong>Full Name :</strong>
                                    <span className="ms-2">
                                        {aMatch.firstName} {aMatch.mi} {aMatch.lastName}
                                    </span>
                                </p>

                                <p className="text-muted mb-2 font-13">
                                    <strong>Mobile :</strong>
                                    <span className="ms-2">(909) 231 9042</span>
                                </p>

                                <p className="text-muted mb-2 font-13">
                                    <strong>Email :</strong>
                                    <span className="ms-2 ">{props?.matches?.email}</span>
                                </p>

                                <p className="text-muted mb-1 font-13">
                                    <strong>Location :</strong>
                                    <span className="ms-2">USA</span>
                                </p>
                            </div>
                            <ul className="social-list list-inline mt-3 mb-0">
                                <li className="list-inline-item">
                                    <Link to="#" className="social-list-item border-primary text-primary">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#" className="social-list-item border-danger text-danger">
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#" className="social-list-item border-info text-info">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link to="#" className="social-list-item border-secondary text-secondary">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </Link>
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
};

Matches.propTypes = {
    matches: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        mi: PropTypes.string,
        avatarUrl: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    }),
    onDeleteMentee: PropTypes.func.isRequired,
};

export default Matches;
