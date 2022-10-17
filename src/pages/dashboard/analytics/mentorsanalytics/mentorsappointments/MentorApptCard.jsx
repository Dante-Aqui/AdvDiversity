import React from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MenteeAvatar from '../mentorstable/MenteeAvatar';

const MentorApptCard = (props) => {
    const { apptType, apptDateTime, description, mentor, mentee } = props.appointment;

    const getParsedDate = (strDate) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const strSplitDate = String(strDate).split(' ');
        let date = new Date(strSplitDate[0]);
        let dd = date.getDate();
        let mm = date.getMonth();

        const yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        date = `${months[mm]} ${dd}, ${yyyy}`;

        return date;
    };

    const parsedDate = getParsedDate(apptDateTime);

    return (
        <div>
            <Card className="border shadow">
                <Card.Header className="bg-dark text-light">
                    <Row>
                        <Col md={8}>
                            <h4>{apptType}</h4>
                        </Col>
                        <Col md={4} className="d-flex align-items-center">
                            {new Date(apptDateTime) > new Date() ? (
                                <Badge className="bg-warning text-dark">Upcoming</Badge>
                            ) : (
                                <Badge className="bg-secondary text-dark">Past</Badge>
                            )}
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body className="d-flex flex-column justify-content-evenly">
                    <Row>
                        <p>{description}</p>
                    </Row>
                    <Row>
                        <small>{parsedDate}</small>
                    </Row>
                    <Row className="mt-2">
                        <Col className="d-flex flex-column align-items-center">
                            <h5>Mentor: </h5>
                            <div>
                                <MenteeAvatar mentee={mentor} />
                            </div>
                        </Col>
                        <Col>
                            <h5>Mentee: </h5>
                            <div>
                                <MenteeAvatar mentee={mentee} />
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

MentorApptCard.propTypes = {
    appointment: PropTypes.shape({
        apptType: PropTypes.string.isRequired,
        apptDateTime: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        mentor: PropTypes.shape({
            id: PropTypes.number,
            userId: PropTypes.number,
        }).isRequired,
        mentee: PropTypes.shape({
            id: PropTypes.number,
        }),
    }),
};

export default React.memo(MentorApptCard);
