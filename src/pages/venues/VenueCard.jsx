import React from 'react';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
const _logger = debug.extend('VenueCard');

const VenueCard = (props) => {
    const aVenue = props.venue;

    _logger('venue card props', props);

    return (
        <div className="col ">
            <div className="h-100 card p-2 my-2 border border-2 rounded" style={{ width: '18rem' }}>
                <img src={aVenue.url} className="venue-img-top" alt="..." />
                <div className="card-body">
                    <h3 className="venue-name">{aVenue.name}</h3>
                    <h5 className="venue-locationId d-none">{aVenue.locationId}</h5>
                    <p className="venue-description">{aVenue.description}</p>
                </div>
            </div>
        </div>
    );
};

VenueCard.propTypes = {
    venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        locationId: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
    }),
};

export default React.memo(VenueCard);
