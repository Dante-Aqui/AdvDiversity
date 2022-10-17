import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { LoadScript } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import toastr from 'toastr';

import debug from 'sabio-debug';
const _logger = debug.extend('locations');
const _loggerAddress = _logger.extend('AutoAddress');

const api = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

function AddressAutoComplete({ addressFromAuto }) {
    const [address, setAddress] = useState('');

    const handleSelect = async (value) => {
        let results = await geoCode(value);

        _logger('results ->', results);

        if (results.grid) {
            let addressComponents = results.geoData[0].address_components;

            if (addressComponents[0].types.includes('street_number') && addressComponents[1].types.includes('route')) {
                let streetAddress = addressComponents[0].long_name + ' ' + addressComponents[1].long_name;
                setAddress(streetAddress);
                await addressFromAuto(addressComponents, streetAddress, results.grid);
            } else {
                toastr.error('No street address found');
            }
        }

        _loggerAddress('Location Data', results.geoData, value);
    };

    const geoCode = async (value) => {
        const geoAddress = await geocodeByAddress(value);
        const latLng = await getLatLng(geoAddress[0]);

        if (geoAddress && latLng) {
            return { grid: latLng, geoData: geoAddress };
        }
    };

    return (
        <div>
            <LoadScript googleMapsApiKey={api} libraries={['places']}>
                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                        return (
                            <div>
                                <input className="form-control" {...getInputProps({})}/>
                                <div style={{ position: 'absolute' }}>
                                    {loading && <div>Loading...</div>}

                                    {suggestions.map((suggestion, index) => {
                                        const style = { backgroundColor: suggestion.active ? '#ddd' : '#fff' };
                                        return (
                                            <div
                                                key={`suggestion_${index++}`}
                                                {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    }}
                </PlacesAutocomplete>
            </LoadScript>
        </div>
    );
}

export default AddressAutoComplete;

AddressAutoComplete.propTypes = {
    addressFromAuto: PropTypes.func,
};
