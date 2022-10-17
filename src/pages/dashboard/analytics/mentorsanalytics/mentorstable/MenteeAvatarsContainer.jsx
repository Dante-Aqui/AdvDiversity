import React from 'react';
import MenteeAvatar from './MenteeAvatar';
import { menteeAvatarsPropTypes } from '../proptypes/mentorsAnalyticsPropTypes';

const MenteeAvatarsContainer = (props) => {
    const mentees = props.mentees;

    const mapToAvatar = (mentee) => {
        return <MenteeAvatar key={mentee.id} mentee={mentee} />;
    };

    return (
        <div className="avatar-container">
            {mentees.length === 0 ? <p>This mentor does not have any matches yet.</p> : <>{mentees.map(mapToAvatar)}</>}
        </div>
    );
};

MenteeAvatarsContainer.propTypes = menteeAvatarsPropTypes;

export default React.memo(MenteeAvatarsContainer);
