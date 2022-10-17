import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import MapMessage from '../messages/MapMessage';
import { TbPaperclip } from 'react-icons/tb';
import { FaSmileWink } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { messageFormSchema } from '../../schema/messageFormSchema';
import messagesService from '../../services/messagesService';
import toastr from 'toastr';

const _logger = debug.extend('ChatWindow');

const ChatWindow = (props) => {
    const [state] = useState({ message: 'test' });

    const mapMessage = (message) => {
        _logger(message);
        return <MapMessage message={message} userId={props.convos.id} />;
    };

    _logger('window  props', props);

    const onHandleSubmit = (e) => {
        const isMessageProvided = e.message && e.message !== '';

        if (isMessageProvided) {
            props.sendMessage(e.message);
        } else {
            _logger('enter a message');
        }
        const newMessage = {
            messageContent: e.message,
            subject: 'message',
            recipientId: 2,
        };
        messagesService.newMessage(newMessage).then(onAddMessageSuccess).catch(onAddMessageError);
    };

    const onAddMessageSuccess = (response) => {
        _logger('new message', response.item);
        toastr.success('Message sent');
    };

    const onAddMessageError = (error) => {
        _logger('new messageerror', error);
        toastr.error('Message was not sent');
    };

    return (
        <>
            <Card>
                <Card.Body className="position-relative px-0 pb-0">
                    <SimpleBar style={{ height: '538px', width: '100%' }}>
                        <ul className="conversation-list px-3">{props.convos.conversations.map(mapMessage)}</ul>
                    </SimpleBar>

                    <Row className="px-3 pb-3">
                        <Col>
                            <div className="mt-2 bg-light p-3 rounded">
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={state}
                                    onSubmit={onHandleSubmit}
                                    validationSchema={messageFormSchema}>
                                    <Form>
                                        <div className="form-group">
                                            <Field name="message" />
                                            <ErrorMessage name="message" />
                                        </div>
                                        <div className="col-sm-auto">
                                            <div className="btn-group">
                                                <Link to="#" className="btn btn-light">
                                                    <TbPaperclip />
                                                </Link>
                                                <Link to="#" className="btn btn-light">
                                                    {' '}
                                                    <FaSmileWink />{' '}
                                                </Link>
                                                <button type="submit" className="btn btn-success chat-send btn-block">
                                                    <IoSend />
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    );
};

ChatWindow.propTypes = {
    chat: PropTypes.arrayOf(PropTypes.string),
    sendMessage: PropTypes.func,
    convos: PropTypes.shape({
        id: PropTypes.number,
        conversations: PropTypes.arrayOf(
            PropTypes.shape({
                senderProfile: PropTypes.shape({
                    userId: PropTypes.number.isRequired,
                    avatarUrl: PropTypes.string.isRequired,
                    firstName: PropTypes.string.isRequired,
                    lastName: PropTypes.string.isRequired,
                }),
                recipientProfile: PropTypes.shape({
                    userId: PropTypes.number.isRequired,
                    avatarUrl: PropTypes.string.isRequired,
                    firstName: PropTypes.string.isRequired,
                    lastName: PropTypes.string.isRequired,
                }),
            })
        ),
    }),
};

export default ChatWindow;
