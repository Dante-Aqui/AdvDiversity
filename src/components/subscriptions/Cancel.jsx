import React from 'react';
import { Row, Col } from 'react-bootstrap';
function Cancel() {
    return (
        <React.Fragment>
            {' '}
            <Row>
                <Col>
                    <Row className="my-3 justify-content-center">
                        <Col lg={4}>
                            <h4 className="header-title mb-3 justify-content-center">We are sorry to see you go!</h4>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Cancel;
