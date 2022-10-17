import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
import debug from 'sabio-debug';

const _logger = debug.extend('newsletterTemplatesServices');

const templatesService = {
    endpoint: `${API_HOST_PREFIX}/api/newslettertemplates`,
};

let getPaginated = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${templatesService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getSearchPaginated = (pageIndex, pageSize, query) => {
    const config = {
        method: 'GET',
        url: `${templatesService.endpoint}/paginate/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let add = (payload) => {
    _logger('add firing', payload);
    const config = {
        method: 'POST',
        url: templatesService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

let update = (id, payload) => {
    _logger('updating firing');
    const config = {
        method: 'PUT',
        url: templatesService.endpoint + '/' + id,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let deleting = (id) => {
    const config = {
        method: 'DELETE',
        url: templatesService.endpoint + '/' + id,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(() => {
        return id;
    });
};

export { getPaginated, getSearchPaginated, add, update, deleting };
