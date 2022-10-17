import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { SiGooglescholar } from "react-icons/si";
import { GiTeacher } from "react-icons/gi";
import { Card, Row, Col, Container } from "react-bootstrap"

const OrganizationDashboard = () => {
    return (
        <Container>
            <h3>Count</h3>
            <Container>
                <Row>
                    <Col>
                        <Card className='shadow-none m-0'>
                            <Card.Body className='text-center'>
                                <FaUserAlt size={25} />
                                <h3>
                                    <span>244</span>
                                </h3>
                                <p className='text-muted font-15 mb-0'>Total Followers</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='shadow-none m-0 border-start'>
                            <Card.Body className='text-center'>
                                <SiGooglescholar size={25} />
                                <h3>
                                    <span>4238</span>
                                </h3>
                                <p className='text-muted font-15 mb-0'>Total Mentees Followers</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Card className='shadow-none m-0 border-start'>
                            <Card.Body className='text-center'>
                                <GiTeacher size={25} />
                                <h3>
                                    <span>42</span>
                                </h3>
                                <p className='text-muted font-15 mb-0'>Total Mentor Followers</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default OrganizationDashboard