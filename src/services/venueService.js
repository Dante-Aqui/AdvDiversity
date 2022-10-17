import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
import debug from 'sabio-debug';

const _logger = debug.extend('venueServices');

const venueService = {
    endpoint: `${API_HOST_PREFIX}/api/venues`,
};

let getPaginatedVenues = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${venueService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let addVenues = (payload) => {
    _logger('addVenues firing', payload);
    const config = {
        method: 'POST',
        url: venueService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

let updateVenues = (id, payload) => {
    _logger('updatingVenues firing');
    const config = {
        method: 'PUT',
        url: venueService.endpoint + '/' + id,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let deleteVenues = (id) => {
    const config = {
        method: 'DELETE',
        url: venueService.endpoint + '/' + id,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(() => {
        return id;
    });
};

export { getPaginatedVenues, addVenues, updateVenues, deleteVenues };
