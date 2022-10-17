import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardGroup } from 'react-bootstrap';
import classNames from 'classnames';
import debug from 'sabio-debug';

import { format } from 'date-fns';

function EventCard(aEvent) {
    const _logger = debug.extend('EventCard');
    _logger('aEvent');
    const navigate = useNavigate();
    const navigateToEventPage = () => {
        const state = { type: 'EVENT_VIEW', payload: aEvent.aEvent };
        navigate(`/events/${aEvent.aEvent.id}`, { state });
    };
    const dateTime = aEvent.aEvent.dateStart;
    const dateEvent = format(new Date(dateTime), 'Pp');

    return (
        <React.Fragment>
            <CardGroup>
                <Card className="d-block card h-100 border border-2 rounded">
                    {aEvent.aEvent.imageUrl && (
                        <div className="event-img-container">
                            <img className="event-img" src={aEvent.aEvent.imageUrl} alt="" />
                            <div className="card-img-overlay  text-end">
                                {aEvent.aEvent.isFree && <div className="badge bg-success">Free Event!</div>}
                            </div>
                        </div>
                    )}
                    <Card.Body className={aEvent.aEvent.imageUrl ? 'position-relative' : ''}>
                        <h4 className="text-title mt-0">{aEvent.aEvent.title}</h4>
                        {!aEvent.aEvent.imageUrl && (
                            <div
                                className={classNames('badge', {
                                    'bg-success': 'Free',
                                })}>
                                {aEvent.aEvent.isFree}
                            </div>
                        )}

                        {
                            <p className=" fw-bold">
                                <button
                                    onClick={navigateToEventPage}
                                    type="button"
                                    className="btn btn-link justify-name-md-end ">
                                    {aEvent.aEvent.eventName}
                                </button>
                            </p>
                        }

                        {
                            <p className="fw-normal">
                                {aEvent.aEvent.summary.slice(0, 150)}
                                <button
                                    onClick={navigateToEventPage}
                                    type="button"
                                    className="btn btn-link justify-summary-md-end "></button>
                            </p>
                        }
                        {
                            <p className="fw-normal">
                                {dateEvent}
                                <button
                                    onClick={navigateToEventPage}
                                    type="button"
                                    className="btn btn-link justify-name-md-end "></button>
                            </p>
                        }
                    </Card.Body>
                </Card>
            </CardGroup>
        </React.Fragment>
    );
}

export default EventCard;
