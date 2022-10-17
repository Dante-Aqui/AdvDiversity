import axios from 'axios';
import debug from 'sabio-debug';
import { API_HOST_PREFIX } from './serviceHelpers';
const _logger = debug.extend('subRoutes');

let subService = {
    subServiceEndpoint: `${API_HOST_PREFIX}/api/stripe/`,
    emailServiceEndpoint: `${API_HOST_PREFIX}/api/emails/receipt`,
};

let getSubscriptions = () => {
    const config = {
        method: 'GET',
        url: `${subService.subServiceEndpoint}get-subs`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let checkout = (payload) => {
    const config = {
        method: 'POST',
        url: `${subService.subServiceEndpoint}checkout`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let getSession = (id) => {
    const config = {
        method: 'GET',
        url: `${subService.subServiceEndpoint}get-sess/?id=${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let updateCustomer = (payload, id) => {
    _logger(payload);
    const config = {
        method: 'PUT',
        url: `${subService.subServiceEndpoint}${id}`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let emailReceipt = (payload) => {
    _logger(payload);
    const config = {
        method: 'Post',
        url: `${subService.emailServiceEndpoint}`,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

let getOrder = (id) => {
    const config = {
        method: 'GET',
        url: `${subService.subServiceEndpoint}${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

export { getSubscriptions, checkout, getSession, updateCustomer, emailReceipt, getOrder };
