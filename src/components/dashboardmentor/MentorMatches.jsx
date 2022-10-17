import React, { useState, useEffect } from 'react';
import Matches from './Matches';
import mentorService from '../../services/mentorService';
import appointmentService from '../../services/appointmentsService';
import PropTypes from 'prop-types';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';

const MentorMatches = (props) => {
    const [mentees, setMentees] = useState({
        arrayOfMentees: [],
        mentorMatches: [],
    });

    useEffect(() => {
        let id = props.currentUser.id;
        mentorService.getMenteesById(id).then(onGetAllMatchesSuccess).catch(onGetAllMatchesError);
    }, []);

    const mapMatches = (aMatch) => {
        return <Matches key={aMatch.id} matches={aMatch} onDeleteMentee={onDeleteMentee}></Matches>;
    };

    const onGetAllMatchesSuccess = (response) => {
        let arrayOfMentees = response.items;
        setMentees((prevState) => {
            let mentee = { ...prevState };
            mentee.arrayOfMentees = arrayOfMentees;
            mentee.mentorMatches = arrayOfMentees.map(mapMatches);
            return mentee;
        });
    };

    const onGetAllMatchesError = () => {
        toastr.error('Could not retrieve matches');
    };

    const onDeleteMentee = (id) => {
        appointmentService.deleteRelations(id).then(onDeleteRelationSuccess).catch(onDeleteRelationError);
    };

    const onDeleteRelationSuccess = () => {
        toastr.success('Mentee deleted, Please refresh page!');
    };
    const onDeleteRelationError = () => {
        toastr.error('Error deleting relation');
    };
    return (
        <React.Fragment>
            <div className="row">{mentees.mentorMatches ? mentees.mentorMatches : 'Loading...'}</div>
        </React.Fragment>
    );
};

MentorMatches.propTypes = {
    currentUser: PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.number.isRequired,
    }),
};

export default MentorMatches;
