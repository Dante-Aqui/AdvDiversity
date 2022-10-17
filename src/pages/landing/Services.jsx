// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Services = () => {
    return (
        <>
            <section className="py-5">
                <Container>
                    <Row className="py-4">
                        <Col>
                            <div className="text-center">
                                <h1 className="mt-0">
                                    <i className="mdi mdi-infinity"></i>
                                </h1>
                                <h3>
                                    The admin is fully <span className="text-primary">responsive</span> and easy to{' '}
                                    <span className="text-primary">customize</span>
                                </h3>
                                <p className="text-muted mt-2">
                                    The clean and well commented code allows easy customization of the theme.Its
                                    designed for
                                    <br />
                                    describing your app, agency or business.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Services;
