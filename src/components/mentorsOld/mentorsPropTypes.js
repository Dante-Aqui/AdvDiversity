import PropTypes from 'prop-types';

const mentorsPropTypes = {
    MentorData: PropTypes.shape({
        mentorId: PropTypes.number.isRequired,
        Description: PropTypes.string.isRequired,
        SiteUrl: PropTypes.string.isRequired,
        Phone: PropTypes.number.isRequired,
        isApproved: PropTypes.bool,
    }),
};

export { mentorsPropTypes };
