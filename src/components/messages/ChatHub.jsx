import { React, useEffect } from 'react';
import Chat from '../messages/Chat';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import messagesService from '../../services/messagesService';
import Conversation from '../messages/Conversation';

function ChatHub(props) {
    const _logger = debug.extend('ChatHub');

    const onGetAllSuccess = (response) => {
        _logger('getAll', response);
    };

    const onGetAllError = (error) => {
        _logger(error);
    };

    useEffect(() => {
        messagesService.getAll().then(onGetAllSuccess).catch(onGetAllError);
    }, []);

    _logger('ChatHub props: ', props);

    const image = props.currentUser;
    const profile = props.currentUser;

    _logger('prof obj', profile);

    return (
        <div className="row">
            <div className="col-4">
                <div className="card center shadow" style={{ margin: '3%' }}>
                    <img src={image} className="avatar-sm rounded-circle" alt="..." />
                    <div className="card-body">
                        <p>User information</p>
                    </div>
                </div>
            </div>
            <div className="col-4">
                <div className="card center" style={{ margin: '3%' }}>
                    <h1>Messages</h1>
                    <Chat fullProfile={props.currentUser} />
                </div>
            </div>
            <div className="col-4">
                <div className="card shadow" style={{ margin: '3%' }}>
                    <div className="card-title">
                        <h1>Conversations</h1>
                        <Conversation convos={props.currentUser.conversations} />
                    </div>
                    <div className="card-body"></div>
                </div>
            </div>
        </div>
    );
}

ChatHub.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
        conversations: PropTypes.arrayOf(
            PropTypes.shape({
                senderProfile: PropTypes.shape({
                    userId: PropTypes.number,
                    avatarUrl: PropTypes.string,
                    firstName: PropTypes.string,
                    lastName: PropTypes.string,
                }),
                recipientProfile: PropTypes.shape({
                    userId: PropTypes.number,
                    avatarUrl: PropTypes.string,
                    firstName: PropTypes.string,
                    lastName: PropTypes.string,
                }),
            })
        ),
    }),
};

export default ChatHub;
