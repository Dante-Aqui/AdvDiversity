import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

import debug from 'sabio-debug';
const _loggerPage = debug.extend('UserProfile');

function UserProfile(props) {
    _loggerPage('profile', props.profile);
    const aProfile = props.profile;

    return (
        <React.Fragment>
            <Col xl={3}>
                <Card className="text-center">
                    <Card.Body>
                        <img src={aProfile.avatarUrl} className="rounded-circle avatar-lg img-thumbnail" alt="" />
                        <h4 className="mb-0 mt-2">
                            {aProfile.firstName} {aProfile.lastName}
                        </h4>
                        <p className="text-muted font-14">Founder</p>
                        <Button className="btn btn-success btn-sm mb-2">Follow</Button>{' '}
                        <Button className="btn btn-danger btn-sm mb-2">Message</Button>
                        <div className="text-start mt-3">
                            <h4 className="font-13 text-uppercase">About Me :</h4>
                            <p className="text-muted font-13 mb-3">
                                Hi I am {aProfile.firstName} {aProfile.lastName}. I have 100 years of software
                                enginnering experience and I aspire to go time travel one day and meet myself.
                            </p>
                            <p className="text-muted mb-2 font-13">
                                <strong>Full Name :</strong>
                                <span className="ms-2">
                                    {aProfile.firstName} {aProfile.mi} {aProfile.lastName}
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

UserProfile.propTypes = {
    profile: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        mi: PropTypes.string,
    }),
};

export default UserProfile;
