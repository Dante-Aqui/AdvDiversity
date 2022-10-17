import axios from 'axios';
import * as helper from '../services/serviceHelpers';
import debug from 'sabio-debug';

const _logger = debug.extend('orderService');

const endpoint = `${process.env.REACT_APP_API_HOST_PREFIX}/api/orders/`;

const getStatistics = () => {
    _logger('orderService getStatistics executing');
    const config = {
        method: 'GET',
        url: endpoint + 'statistics',
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

export { getStatistics };
