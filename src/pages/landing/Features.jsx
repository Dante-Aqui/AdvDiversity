// @flow
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const Features = ({ features }) => {
    return (
        <>
            <section className="py-5">
                <Container>
                    <Row>
                        <Col>
                            <div className="text-center">
                                <h1 className="mt-0">
                                    <i className="mdi mdi-heart-multiple-outline"></i>
                                </h1>
                                <h3>
                                    Features youll <span className="text-danger">love</span>
                                </h3>
                                <p className="text-muted mt-2">
                                    Hyper comes with next generation ui design and have multiple benefits
                                </p>
                            </div>
                        </Col>
                    </Row>

                    {features.map((item, index) => {
                        return item.id % 2 !== 0 ? (
                            <Row key={index} className="mt-2 py-5 align-items-center">
                                <Col lg={5}>
                                    <img src={item.image} className="img-fluid" alt="" />
                                </Col>
                                <Col lg={{ span: 6, offset: 1 }}>
                                    <h3 className="fw-normal">{item.title}</h3>
                                    <p className="text-muted mt-3">{item.desc}</p>

                                    <div className="mt-4">
                                        {item.features.map((item, index) => {
                                            return (
                                                <p key={index} className="text-muted">
                                                    <i className="mdi mdi-circle-medium text-primary"></i> {item}
                                                </p>
                                            );
                                        })}
                                    </div>
                                    <Link to="#" className="btn btn-primary btn-rounded mt-3">
                                        Read More <i className="mdi mdi-arrow-right ms-1"></i>
                                    </Link>
                                </Col>
                            </Row>
                        ) : (
                            <Row key={index} className="pb-3 pt-5 align-items-center">
                                <Col lg={6}>
                                    <h3 className="fw-normal">{item.title}</h3>
                                    <p className="text-muted mt-3">{item.desc}</p>

                                    <div className="mt-4">
                                        {item.features.map((item, index) => {
                                            return (
                                                <p key={index} className="text-muted">
                                                    <i className="mdi mdi-circle-medium text-success"></i> {item}
                                                </p>
                                            );
                                        })}
                                    </div>
                                    <Link to="#" className="btn btn-success btn-rounded mt-3">
                                        Read More <i className="mdi mdi-arrow-right ms-1"></i>
                                    </Link>
                                </Col>
                                <Col lg={{ span: 5, offset: 1 }}>
                                    <img src={item.image} className="img-fluid" alt="" />
                                </Col>
                            </Row>
                        );
                    })}
                </Container>
            </section>
        </>
    );
};
Features.propTypes = {
    // ...prop type definitions here
    features: PropTypes.arrayOf(PropTypes.shape({})),
};
export default Features;
