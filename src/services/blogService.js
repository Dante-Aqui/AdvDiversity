import axios from 'axios';
import * as helper from '../services/serviceHelpers';
import debug from 'sabio-debug';

const blogService = {
    endpoint: `${process.env.REACT_APP_API_HOST_PREFIX}/api/blogs`,
};

const _logger = debug.extend('blogService');

blogService.getBlogs = (pageIndex, pageSize) => {
    _logger('getBlogs executing');
    const config = {
        method: 'GET',
        url: blogService.endpoint + `/pages?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

blogService.getLookups = (payload) => {
    _logger('getLookups executing');
    const config = {
        method: 'POST',
        url: process.env.REACT_APP_API_HOST_PREFIX + '/api/lookups',
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

blogService.searchBlogs = (formData, pageIndex, pageSize) => {
    _logger('searchBlog Executing');
    const config = {
        method: 'GET',
        url: blogService.endpoint + `/query/?query=${formData}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

export default blogService;
