import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { mentorsTableProptypes } from '../proptypes/mentorsAnalyticsPropTypes';
import MenteeAvatarsContainer from './MenteeAvatarsContainer';

const MentorRow = (props) => {
    const { avatarPicture, firstName, lastName, mentees } = props.mentorInfo;

    return (
        <Card>
            <Link to={`#`} target={'_blank'}>
                <Card.Title className="text-center d-flex bg-dark text-white">
                    <Col xs={2}>
                        <Card.Img
                            className="rounded-circle"
                            variant="left"
                            width={70}
                            height={70}
                            src={avatarPicture}
                            alt="mentor avatar pic"></Card.Img>
                    </Col>

                    <Col xs={9} className="d-flex align-items-center">
                        <h3>
                            {firstName} {lastName}
                        </h3>
                    </Col>
                </Card.Title>
            </Link>
            <Card.Footer>
                <Row>
                    <h4>Current Mentees</h4>
                    <MenteeAvatarsContainer mentees={mentees} />
                </Row>
            </Card.Footer>
        </Card>
    );
};

MentorRow.propTypes = mentorsTableProptypes;

export default React.memo(MentorRow);
