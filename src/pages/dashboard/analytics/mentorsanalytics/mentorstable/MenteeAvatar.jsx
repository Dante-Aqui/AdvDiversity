import React from 'react';
import { Link } from 'react-router-dom';
import { menteeAvatarsPropTypes } from '../proptypes/mentorsAnalyticsPropTypes';
import '../styles/menteeavatar.css';

const MenteeAvatar = (props) => {
    const mentee = props.mentee;
    return (
        <>
            <Link to={`#`} className="mentee-avatar-container">
                <img src={mentee?.src} alt="menteeImag" className="rounded-circle mentee-avatar-picture" />
                <small className="bg-dark w-30 px-1 mt-1 text-light rounded mentee-avatar-tooltip">
                    {mentee?.name}
                </small>
            </Link>
        </>
    );
};

MenteeAvatar.propTypes = menteeAvatarsPropTypes;

export default React.memo(MenteeAvatar);
