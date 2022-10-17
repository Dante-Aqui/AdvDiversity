import axios from 'axios';
import * as helper from '../services/serviceHelpers';

const endpoint = `${helper.API_HOST_PREFIX}/api/events`;

const getEvents = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/paginate/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const searchEvents = (formData, pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/search/?query=${formData}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const add = (payload) => {
    const config = {
        method: 'POST',
        data: payload,
        url: `${endpoint}/events`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getById = (id) => {
    const config = {
        method: 'GET',
        url: `${endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

const update = (payload) => {
    const config = {
        method: 'PUT',
        data: payload,
        url: `${endpoint}/${payload.id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

export { getEvents, searchEvents, add, getById, update };
