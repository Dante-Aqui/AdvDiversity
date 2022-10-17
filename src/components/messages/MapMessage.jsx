import React from 'react';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import classnames from 'classnames';
import { CgMoreVerticalO } from 'react-icons/cg';

function MapMessage(props) {
    const _logger = debug.extend('MapMessage');

    _logger('MapMessage props', props.message, 'userId', props.userId);
    return (
        <li className={classnames('clearfix', { odd: props.message.recipientProfile.userId === props.userId })}>
            <div className="chat-avatar">
                <img src={props.message.recipientProfile.avatarUrl} className="rounded" alt="" />
                <i>{new Date().getHours() + ':' + new Date().getMinutes()}</i>
            </div>

            <div className="conversation-text">
                <div className="ctext-wrap">
                    <i>
                        {props.message.recipientProfile.firstName} {props.message.recipientProfile.lastName}
                    </i>
                    <p>{props.message.messageContent}</p>
                </div>
            </div>

            <Dropdown className="conversation-actions" align="end">
                <Dropdown.Toggle variant="link" className="btn btn-sm btn-link arrow-none shadow-none">
                    <CgMoreVerticalO />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Copy Message</Dropdown.Item>
                    <Dropdown.Item>Edit</Dropdown.Item>
                    <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </li>
    );
}

MapMessage.propTypes = {
    userId: PropTypes.number,
    message: PropTypes.shape({
        messageContent: PropTypes.string.isRequired,
        recipientProfile: PropTypes.shape({
            userId: PropTypes.number.isRequired,
            avatarUrl: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }),

        senderProfile: PropTypes.shape({
            userId: PropTypes.number,
            avatarUrl: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }),
    }),
};

export default MapMessage;
