import React, { useState, useEffect } from 'react';
import VenueCard from './VenueCard';
import * as venuesService from './../../services/venuesServices/venuesService';
import debug from 'sabio-debug';
import toastr from 'toastr';

const _logger = debug.extend('Venues');

const Venues = () => {
    const [pageData, setPageData] = useState({
        arrayOfVenues: [],
        venueComponents: [],
    });
    const [isDisplayed, setIsDisplayed] = useState(false);

    const mapVenue = (aVenue) => {
        _logger('mapVenue in progress', aVenue);
        return <VenueCard venue={aVenue} key={aVenue.id} gaige="murillo`" />;
    };

    useEffect(() => {
        venuesService.getVenues().then(onGetVenuesSuccess).catch(onGetVenuesError);
    }, []);

    const onGetVenuesSuccess = (response) => {
        _logger('GetVenueSuccess res', response);
        let arrayOfPlaces = response.data.item.pagedItems;
        _logger(arrayOfPlaces);

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfVenues = arrayOfPlaces;
            pd.venueComponents = arrayOfPlaces.map(mapVenue);

            _logger('pd', pd);
            return pd;
        });
    };

    const onGetVenuesError = (response) => {
        _logger('GetVenue error', { error: response });
        toastr.error('Venues Not Properly Rendered!');
    };

    const handleToggle = () => {
        _logger('show venues btn is working');

        setIsDisplayed(!isDisplayed);
    };
    return (
        <React.Fragment>
            <div className="container">
                <h1>Venues</h1>
                <div>
                    <div>
                        <button className="btn btn-success" onClick={handleToggle}>
                            {!isDisplayed ? 'Show' : 'Hide'}
                        </button>
                    </div>
                </div>
                <div className="row card-deck">{isDisplayed && pageData.venueComponents}</div>
            </div>
        </React.Fragment>
    );
};

export default Venues;
