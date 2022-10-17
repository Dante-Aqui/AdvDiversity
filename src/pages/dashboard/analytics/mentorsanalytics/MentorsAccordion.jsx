import React from 'react';
import { Accordion } from 'react-bootstrap';
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import MentorsAppts from './mentorsappointments/MentorsAppts';
import MentorsLeaderBoard from './mentorsleaderboard/MentorsLeaderBoard';
import { mentorsLeaderBoardPropTypes } from './proptypes/mentorsAnalyticsPropTypes';

const MentorsAccordion = (props) => {
    const mentors = props.mentorsInfo;
    return (
        <Accordion>
            <Accordion.Item eventKey="1">
                <Accordion.Header className="bg-dark bg-gradient m-0">
                    <h4>
                        <FaTrophy className="text-warning mx-2" />
                    </h4>
                    <h3 className="align-baseline text-secondary">Leaderboard</h3>
                </Accordion.Header>
                <Accordion.Body className="border border-warning">
                    {mentors && <MentorsLeaderBoard mentorsInfo={mentors} />}
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header className="bg-dark bg-gradient m-0">
                    <h4>
                        <FaCalendarAlt className="text-secondary mx-2" />
                    </h4>
                    <h3 className="align-baseline text-secondary">Appointments</h3>
                </Accordion.Header>
                <Accordion.Body className="border border-warning">
                    {mentors && <MentorsAppts mentorsInfo={mentors} />}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

MentorsAccordion.propTypes = mentorsLeaderBoardPropTypes;

export default React.memo(MentorsAccordion);
