import React from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './GoogleMaps';
import { Row, Col } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';

const ResourceModal = (props) => {
    const aResource = props.resource;
    const onLocalHide = () => {
        props.onHide(aResource);
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{aResource.name}</Modal.Title>
            </Modal.Header>
            <Row>
                <Col>
                    <div className="container">
                        <GoogleMap
                            coordinates={{
                                lat: aResource.latitude,
                                lng: aResource.longitude,
                            }}></GoogleMap>
                    </div>
                </Col>
                <Col>
                    <Modal.Body>
                        <div className="container mt-3">
                            <p style={{ fontWeight: 'bold' }}>Description:</p>
                            <p>{aResource.description}</p>
                            <p style={{ fontWeight: 'bold' }}>Contact Name: </p>
                            <p>{aResource.contactName}</p>
                            <p style={{ fontWeight: 'bold' }}>Contact Email: </p>
                            <p>{aResource.contactEmail}</p>
                            <p style={{ fontWeight: 'bold' }}>Phone: </p>
                            <p>{aResource.phone}</p>
                            <p style={{ fontWeight: 'bold' }}>Website:</p>
                            <p>
                                <a href={`https://${aResource.siteUrl}`} target="_blank" rel="noreferrer noopener">
                                    {` ${aResource.siteUrl}`}
                                </a>
                            </p>
                            <p style={{ fontWeight: 'bold' }}>Address:</p>{' '}
                            <p>
                                {aResource.lineOne} {aResource.lineTwo} {aResource.city}, {aResource.state}
                                {aResource.zipCode}
                            </p>
                        </div>
                    </Modal.Body>
                </Col>
                <Modal.Footer>
                    <Button className="button btn btn-warning mx-3" onClick={onLocalHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Row>
        </Modal>
    );
};

ResourceModal.propTypes = {
    resource: PropTypes.shape({
        name: PropTypes.string.isRequired,
        headline: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        locationId: PropTypes.number.isRequired,
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        zipCode: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number,
        contactName: PropTypes.string.isRequired,
        contactEmail: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
    }),
    onHide: PropTypes.func,
};

export default ResourceModal;
