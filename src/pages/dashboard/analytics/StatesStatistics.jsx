import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const StatesStatistics = ({ locationStats }) => {
    const _logger = debug.extend('StatesStatistics');
    _logger('locationStats running ->', locationStats);

    return (
        <>
            <Card className="tilebox-one">
                <Card.Body>
                    <i className="uil uil-users-alt float-end"></i>
                    <h6 className="text-uppercase mt-0">Active States</h6>
                    <h2 className="my-2" id="active-users-count">
                        {locationStats?.length}
                    </h2>
                </Card.Body>
            </Card>
        </>
    );
};

StatesStatistics.propTypes = {
    locationStats: PropTypes.arrayOf(
        PropTypes.shape({
            state: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
        })
    ),
};

export default StatesStatistics;
