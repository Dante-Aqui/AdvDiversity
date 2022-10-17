import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
import debug from 'sabio-debug';

const _logger = debug.extend('resourceServices');

const resourceService = {
    endpoint: `${API_HOST_PREFIX}/api/resources`,
};

let getPaginatedResources = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${resourceService.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let getPaginatedResourcesByTypeId = (typeId, pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${resourceService.endpoint}/paginatebytypeid?typeId=${typeId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

let addResources = (payload) => {
    _logger('addResources firing', payload);
    const config = {
        method: 'POST',
        url: resourceService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

let updateResources = (id, payload) => {
    _logger('updatingResources firing');
    const config = {
        method: 'PUT',
        url: resourceService.endpoint + '/' + id,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let deleteResources = (id) => {
    const config = {
        method: 'DELETE',
        url: resourceService.endpoint + '/' + id,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(() => {
        return id;
    });
};

const getResourceType = () => {
    const config = {
        method: 'GET',
        url: `${resourceService.endpoint}/resourcetype`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const searchResource = (query) => {
    const config = {
        method: 'GET',
        url: `${resourceService.endpoint}/search?pageIndex=0&pageSize=4&query=${query}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const getResourcesByTypeId = (id) => {
    const config = {
        method: 'GET',
        url: `${resourceService.endpoint}/resourcetype/${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};
export {
    getPaginatedResources,
    addResources,
    updateResources,
    deleteResources,
    getResourceType,
    searchResource,
    getResourcesByTypeId,
    getPaginatedResourcesByTypeId,
};
