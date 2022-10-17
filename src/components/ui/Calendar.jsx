import React, { useState } from 'react';
import { Card, Row, Col } from "react-bootstrap"

import { BsFillClockFill } from "react-icons/bs"
import AdvDatePicker from './AdvDatePicker';
import CardTitle from './CardTitle';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-3"
                    title="Your Calendar"
                />

                <Row>
                    <Col md={7} className="calendar-widget">
                        <AdvDatePicker value={date} onChange={(date) => setDate(date)} isInline />
                    </Col>
                    <Col md={5}>
                        <ul className='list-unstyled'>
                            <li className='mb-4'>
                                <p className='text-muted mb-1 font-13'>
                                    <BsFillClockFill /> 7:30 AM - 10:00AM
                                </p>
                                <h5>Meeting with mentees</h5>
                            </li>
                            <li className='mb-4'>
                                <p className='text-muted mb-1 font-13'>
                                    <BsFillClockFill /> 1:00 PM - 3:30PM
                                </p>
                                <h5>Activities</h5>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Calendar