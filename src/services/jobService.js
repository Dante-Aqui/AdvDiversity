import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
import debug from 'sabio-debug';
const _logger = debug.extend('jobService');

const jobsApi = `${API_HOST_PREFIX}/api/jobs`

const getJobs = (pageIndex, pageSize) => {
    _logger('getJobs executing');
    const config = {
        method: 'GET',
        url: `${jobsApi}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchJobs = (pageIndex, pageSize, query) => {
    _logger('searchJobs Executing');
    const config = {
        method: 'GET',
        url: `${jobsApi}/search/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchType = (pageIndex, pageSize, query) => {
    _logger('searchType Executing');
    const config = {
        method: 'GET',
        url: `${jobsApi}/type/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const selectByQueryAndType = (pageIndex, pageSize, query, type) => {
    _logger('searchType Executing');
    const config = {
        method: 'GET',
        url: `${jobsApi}/searchwithtype/?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}&type=${type}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};


const jobService = {
    getJobs,
    searchJobs,
    searchType,
    selectByQueryAndType
}

export default jobService;
