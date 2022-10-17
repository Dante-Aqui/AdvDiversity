import { useEffect } from 'preact/hooks';
import React from 'react';
import PropTypes from 'prop-types';

function ScheduleButton({ mentorId }) {
    useEffect(() => {
        sessionStorage.setItem('mentorId', mentorId);
    }, [mentorId]);

    return (
        <div>
            <a
                className="btn btn-primary"
                href={`https://auth.calendly.com/oauth/authorize?client_id=${process.env.CALENDLY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.CALENDLY_REDIRECT_URI}`}>
                Schedule
            </a>
        </div>
    );
}

export default ScheduleButton;

ScheduleButton.propTypes = {
    mentorId: PropTypes.number.isRequired,
};
