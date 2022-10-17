import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatWindow from './ChatWindow';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import { API_HOST_PREFIX } from '../../services/serviceHelpers';
import toastr from 'toastr';
const _logger = debug.extend('Chat');

toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};
const Chat = (props) => {
    _logger('chat test', props);
    const [connection, setConnection] = useState(null);
    const [chat, setChat] = useState([]);

    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${API_HOST_PREFIX}/hubs/chat`)
            .configureLogging(LogLevel.Information)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start().then(onConnectionSuccess).catch(onConnectionFailure);
        }
    }, [connection]);

    const onConnectionSuccess = () => {
        _logger('Connected!');

        connection.on('ReceiveMessage', (message) => {
            const updatedChat = [...latestChat.current];
            updatedChat.push(message);

            setChat(updatedChat);
        });
    };

    const onConnectionFailure = (error) => {
        _logger('Connection failed: ', error);
    };

    const sendMessage = async (message) => {
        const chatMessage = {
            message: message,
        };

        if (connection._connectionStarted) {
            try {
                setTimeout(connection.send('SendMessage', chatMessage), 1000000);
            } catch (e) {
                _logger(e);
            }
        } else {
            _logger(connection);
            toastr['error']('No Connection to server yet.');
        }
    };
    return (
        <div>
            <ChatWindow chat={chat} convos={props.fullProfile} sendMessage={sendMessage} />
        </div>
    );
};

Chat.propTypes = {
    fullProfile: PropTypes.shape({
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
        email: PropTypes.string,
        id: PropTypes.number,
        isLoggedIn: PropTypes.bool,
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
};

export default Chat;
