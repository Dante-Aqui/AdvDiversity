import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { mentorsLeaderBoardCardPropTypes } from '../proptypes/mentorsAnalyticsPropTypes';

const MentorLbCard = (props) => {
    const { rank, avatarPicture, firstName, lastName, profileViews } = props.mentorsInfo;

    return (
        <>
            <hr />
            <Row
                className="d-flex 
                            align-items-center
                            my-3
                            px-3">
                <Col xs={2}>
                    <h4 className="text-center">
                        {rank === 1 ? (
                            <strong>
                                <FaStar className="text-warning" />
                            </strong>
                        ) : (
                            <strong>#{rank}</strong>
                        )}
                    </h4>
                </Col>
                <Col xs={2}>
                    <img
                        className="rounded-circle"
                        width={50}
                        height={50}
                        src={avatarPicture}
                        alt="mentor avatar pic"
                    />
                </Col>
                <Col xs={6}>
                    <h4 className="text-center px-1">
                        {firstName} {lastName}
                    </h4>
                </Col>
                <Col xs={2}>
                    <h4 className="text-center">{profileViews}</h4>
                </Col>
            </Row>
        </>
    );
};

MentorLbCard.propTypes = mentorsLeaderBoardCardPropTypes;

export default React.memo(MentorLbCard);
