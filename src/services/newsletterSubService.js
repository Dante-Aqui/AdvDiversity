import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
import debug from 'sabio-debug';

const _logger = debug.extend('newsletterSubService');

const newsletterSubServiceAPI = {
        endpoint: `${API_HOST_PREFIX}/api/newslettersubscriptions`,
};


const addSub = (payload) => {
        _logger('add newsletterSub firing', payload)
        const config = {
                method: 'POST',
                url: newsletterSubServiceAPI.endpoint,
                data: payload,
                crossdomain: true,
                headers: { 'Content-Type': 'application/json' },
        };
        return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};


const updateSub = (payload) => {
        _logger('update sub')
        const config = {
                method: 'PUT',
                url: newsletterSubServiceAPI.subEndpoint,
                data: payload,
                crossdomain: true,
                headers: { 'Content-Type': 'application/json' },
        };
        return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const newsletterSearch = (pageIndex, pageSize, query) => {
        _logger('searching');
        const config = {
                method: 'GET',
                url: newsletterSubServiceAPI.endpoint + `/query/?query=${query}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
                crossdomain: true,
                headers: { 'Content-Type': 'application/json' },
        }
        return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getAllSubsPaginated = (pageIndex, pageSize) => {
        const config = {
                method: 'GET',
                url: `${newsletterSubServiceAPI.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
                crossdomain: true,
                headers: { 'Content-Type': 'application/json' },
        };
        return axios(config)
                .then(onGlobalSuccess).catch(onGlobalError);
};

const getBySubscribedList = (payload) => {
        _logger('by subscribed');
        const config = {
                method: 'GET',
                url: `${newsletterSubServiceAPI.endpoint}/ `,
                data: payload,
                crossdomain: true,
                headers: { 'Content-Type': 'application/json' },
        }
        return axios(config)
        .then(onGlobalSuccess).catch(onGlobalError);
};

 const newsletterSubService = {
        getAllSubsPaginated,
        addSub,
        updateSub,
        newsletterSearch,
        getBySubscribedList
};

export default newsletterSubService;