import PropTypes from 'prop-types';

const mentorsTableProptypes = {
    mentorsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            avatarPicture: PropTypes.string.isRequired,
            mentees: PropTypes.arrayOf(
                PropTypes.object.isRequired
            ),
        })
    ),
};

const mentorsLeaderBoardPropTypes = {
    mentorsInfo: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            avatarPicture: PropTypes.string.isRequired
        })
    )
}

const mentorsLeaderBoardCardPropTypes = {
    mentorsInfo: PropTypes.shape({
            id: PropTypes.number.isRequired,
            rank: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            avatarPicture: PropTypes.string.isRequired,
            profileViews: PropTypes.number.isRequired
        })
}

const menteeAvatarsPropTypes = {
    
        mentees: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                src: PropTypes.string,
                name: PropTypes.string,
            })
        ),
    
}

export { mentorsTableProptypes, mentorsLeaderBoardPropTypes, mentorsLeaderBoardCardPropTypes, menteeAvatarsPropTypes };