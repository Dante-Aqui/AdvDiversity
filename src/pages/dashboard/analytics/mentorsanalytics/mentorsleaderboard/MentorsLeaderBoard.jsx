import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import MentorLbCard from './MentorLbCard';
import { mentorsLeaderBoardPropTypes } from '../proptypes/mentorsAnalyticsPropTypes';
import googleAnalyticsService from '../../../../../services/googleAnalyticsService';
import debug from 'sabio-debug';
import toastr from 'toastr';
const _loggerMentorsLeaderboard = debug.extend('MentorsLeaderboard');

const MentorsLeaderBoard = (props) => {
    const [mentorLbCards, setMentorLbCards] = useState([]);

    useEffect(() => {
        if (props.mentorsInfo.length > 0) {
            googleAnalyticsService
                .getMentorsProfileViews()
                .then(onGetMentorsProfileViewsSuccessful)
                .catch(onGetMentorsProfileViewsError);
        }
    }, [props.mentorsInfo]);

    const onGetMentorsProfileViewsSuccessful = (response) => {
        const data = response;
        const top5Mentors = getTop5Mentors(props.mentorsInfo, data);
        _loggerMentorsLeaderboard(top5Mentors);
        setMentorLbCards(() => {
            return top5Mentors.map(mapToCard);
        });
    };

    const onGetMentorsProfileViewsError = (error) => {
        _loggerMentorsLeaderboard(error);
        toastr.error(error, 'Oops, something went wrong.');
    };

    const getTop5Mentors = (mentorsInfo, data) => {
        let mentors = [];
        let rank = 1;
        for (let record of data) {
            let mentor = mentorsInfo.find((mentor) => mentor.id === record.id);
            mentor.profileViews = record.profileViews;
            mentor.rank = rank++;
            mentors.push(mentor);
        }
        return mentors;
    };

    const mapToCard = (mentor) => {
        return <MentorLbCard key={mentor.id} mentorsInfo={mentor} />;
    };

    return (
        <>
            <Row>
                <Col>
                    <h4 className="text-start">
                        <strong>Rank</strong>
                    </h4>
                </Col>
                <Col>
                    <h4 className="text-end">
                        <strong>Profile Views</strong>
                    </h4>
                </Col>
            </Row>
            {props.mentorsInfo.length > 0 && mentorLbCards}
        </>
    );
};

MentorsLeaderBoard.propTypes = mentorsLeaderBoardPropTypes;

export default React.memo(MentorsLeaderBoard);
