import React from 'react';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import MapConversation from '../messages/MapConversation';

const _logger = debug.extend('Conversation');
const Conversation = (props) => {
    _logger('convos', props.convos);

    const mapMessage = (m) => {
        _logger(m.messageContent);
    };

    props.convos.map(mapMessage);

    return (
        <>
            <Card>
                <Card.Body className="p-0">
                    <ul className="nav nav-tabs nav-bordered">
                        <li></li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane show active">
                            <div className="app-search p-3">
                                <div className="form-group position-relative">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="People, groups & messages..."
                                    />
                                    <span className="mdi mdi-magnify search-icon"></span>
                                </div>
                            </div>

                            <SimpleBar className="px-3" style={{ maxHeight: '550px', width: '100%' }}>
                                <MapConversation />
                            </SimpleBar>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

Conversation.propTypes = {
    convos: PropTypes.arrayOf(
        PropTypes.shape({
            recipientProfile: PropTypes.shape({
                userId: PropTypes.number.isRequired,
                avatarUrl: PropTypes.string.isRequired,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
            }),

            senderProfile: PropTypes.shape({
                userId: PropTypes.number.isRequired,
                avatarUrl: PropTypes.string.isRequired,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
            }),
        })
    ),
};

export default Conversation;
