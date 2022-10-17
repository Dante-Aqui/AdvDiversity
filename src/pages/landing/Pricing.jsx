// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// components

const Pricing = () => {
    return (
        <>
            <section className="py-5 bg-light-lighten border-top border-bottom border-light">
                <Container>
                    <Row>
                        <Col>
                            <div className="text-center">
                                <h1 className="mt-0">
                                    <i className="mdi mdi-tag-multiple"></i>
                                </h1>
                                <h3>
                                    Choose Simple <span className="text-primary">Pricing</span>
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

export default Pricing;
