import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const LocationsStatistics = ({ locationStats }) => {
    const [sumLocations, setSumLocations] = useState();
    const _logger = debug.extend('LocationsStatistics');
    _logger('locationStats running ->', locationStats);

    useEffect(() => {
        const sumL = locationStats?.reduce((partialSum, item) => partialSum + item.quantity, 0);
        setSumLocations(sumL);
        _logger(sumL);
    }, [locationStats]);

    return (
        <>
            <Card className="tilebox-one">
                <Card.Body>
                    <i className="uil uil-users-alt float-end"></i>
                    <h6 className="text-uppercase mt-0">Active Locations</h6>
                    <h2 className="my-2" id="active-users-count">
                        {sumLocations}
                    </h2>
                </Card.Body>
            </Card>
        </>
    );
};

LocationsStatistics.propTypes = {
    locationStats: PropTypes.arrayOf(
        PropTypes.shape({
            state: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            latitude: PropTypes.number,
            longuitude: PropTypes.number,
            quantity: PropTypes.number.isRequired,
        })
    ),
};

export default LocationsStatistics;
