import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import './mentorprofile.css';
import debug from 'sabio-debug';

const _logger = debug.extend('mentorProfile');

const mapFunc = (item) => {
    return (
        <span className={`font-13 pill-${Math.floor(item.id % 10)}`} key={item.id}>
            {item.name}
        </span>
    );
};

const phoneNumberConvert = (tenDigitNum) => {
    if (tenDigitNum) {
        const numString = tenDigitNum.toString();
        const firstThree = numString.slice(0, 3);
        const secondThree = numString.slice(3, 6);
        const lastFour = numString.slice(6, 10);
        const phoneNumber = `${firstThree}-${secondThree}-${lastFour}`;
        return phoneNumber;
    } else {
        return null;
    }
};

const MentorProfile = (props) => {
    const aMentor = props.mentorInfo;
    _logger(aMentor);

    return (
        <React.Fragment>
            {aMentor && (
                <div className="row">
                    <div className="card">
                        <Card className="text-center">
                            <Card.Body>
                                <img
                                    src={aMentor.imageUrl}
                                    className="rounded-circle avatar-lg img-thumbnail"
                                    alt="Not Found"
                                />
                                <h4 className="mb-0 mt-2">
                                    {aMentor.firstName} {aMentor.lastName}
                                </h4>
                                <div className="mt-1 mb-1">
                                    {' '}
                                    <div className="font-13">
                                        <strong>Web Developer</strong>
                                    </div>
                                    <div className="font-13">
                                        <span className="ms-2">
                                            Cell Phone : {phoneNumberConvert(aMentor.phoneNumber)}
                                        </span>
                                    </div>
                                </div>
                                <Link to="/daily" className="btn btn-success btn-sm mb-2">
                                    Zoom
                                </Link>{' '}
                                <button type="button" className="btn btn-danger btn-sm mb-2">
                                    Message
                                </button>
                                <div className="text-start mt-3">
                                    <h4 className="font-13 text-uppercase">About Me</h4>
                                    <div className=" font-13 mb-3">{aMentor.description}</div>
                                    <div className=" font-13">
                                        Email:<span className="ms-2 ">mentortest@email.domain</span>
                                    </div>
                                    <div className="font-13">
                                        Location:<span className="ms-2">Los Angeles, USA</span>
                                    </div>
                                    <div className="font-13 mb-1">
                                        Focus Areas:
                                        {aMentor.focusAreas?.map(mapFunc)}
                                    </div>
                                    <div className="font-13 mb-1">
                                        Gender:
                                        {aMentor.genderTypes?.map(mapFunc)}
                                    </div>
                                    <div className="font-13 mb-1">
                                        Grades:
                                        {aMentor.grades?.map(mapFunc)}
                                    </div>
                                    <div className="font-13 mb-1">
                                        Mentoring Types:
                                        {aMentor.mentoringTypes?.map(mapFunc)}
                                    </div>
                                    <div className="font-13 mb-1">
                                        Specialties:
                                        {aMentor.specialties?.map(mapFunc)}
                                    </div>
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
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

MentorProfile.propTypes = {
    mentorInfo: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        imageUrl: PropTypes.string,
        description: PropTypes.string,
        phoneNumber: PropTypes.string,
        focusAreas: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),

        ages: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
        grades: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
        mentoringTypes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
        genderTypes: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
        specialties: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
            })
        ),
    }),
};

export default React.memo(MentorProfile);
