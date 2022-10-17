import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MentorsTable from './mentorstable/MentorsTable';
import MentorsAccordion from './MentorsAccordion';
import mentorProfileService from '../../../../services/mentorProfileService';
import toastr from 'toastr';
import debug from 'sabio-debug';

const _loggerMentorsAnalytics = debug.extend('MentorsAnalytics');

const MentorsAnalytics = () => {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        mentorProfileService
            .getAllMentorMatches()
            .then(onGetAllMentorMatchesSuccessful)
            .catch(onGetAllMentorMatchesError);
    }, []);

    const onGetAllMentorMatchesSuccessful = (response) => {
        const mentors = response.item;
        _loggerMentorsAnalytics(response);

        setMentors(() => {
            return mentors.map(mapMentorInfo);
        });
    };

    const onGetAllMentorMatchesError = (error) => {
        toastr.error(error, "Couldn't get mentors information.");
    };

    const mapMentorInfo = (mentor) => {
        let mentees;
        if (mentor.mentees !== null) {
            mentees = mentor.mentees.map(mapToMenteeAvatar);
        } else {
            mentees = [];
        }

        const mentorInfo = {
            id: mentor.id,
            userId: mentor.userId,
            avatarPicture: mentor.imageUrl,
            firstName: mentor.firstName,
            lastName: mentor.lastName,
            mentees: mentees,
        };
        return mentorInfo;
    };

    const mapToMenteeAvatar = (mentee) => {
        return {
            id: mentee.id,
            userId: mentee.userId,
            name: `${mentee.firstName} ${mentee.lastName}`,
            href: `https://advancingdiversity.azurewebsites.net/mentees/${mentee.id}`,
            target: '_blank',
            src: mentee.avatarUrl,
        };
    };

    return (
        <Row className="d-flex h-100">
            <Col xs={8}>{mentors.length > 0 && <MentorsTable mentorsInfo={mentors} />}</Col>
            <Col>
                <MentorsAccordion mentorsInfo={mentors} />
            </Col>
        </Row>
    );
};

export default React.memo(MentorsAnalytics);
