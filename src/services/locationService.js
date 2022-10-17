import axios from 'axios';
import logger from 'sabio-debug';
import * as helper from '../services/serviceHelpers';

const _logger = logger.extend('locations');
const _loggerService = _logger.extend('locationService');

const locationService = {
    endpoint: `${process.env.REACT_APP_API_HOST_PREFIX}/api/locations`,
};

locationService.getPagesLocations = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: locationService.endpoint + `/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

locationService.getCreatedByLocations = (id, pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: locationService.endpoint + `/users/?creatorId=${id}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

locationService.add = (payload) => {
    const config = {
        method: 'POST',
        url: locationService.endpoint,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config)
        .then(function (response) {
            let idNumber = response.data.item;
            payload.id = idNumber;
            return payload;
        })
        .catch(function (response) {
            _loggerService(response);
        });
};

locationService.update = (id, payload) => {
    const config = {
        method: 'PUT',
        url: locationService.endpoint + '/' + id,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config)
        .then(function () {
            payload.id = id;
            return payload;
        })
        .catch(function (response) {
            _loggerService(response);
        });
};

locationService.getLookups = (payload) => {
    const config = {
        method: 'POST',
        url: process.env.REACT_APP_API_HOST_PREFIX + '/api/lookups',
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

locationService.getStatistics = () => {
    _logger('userService getStatistics executing');
    const config = {
        method: 'GET',
        url: locationService.endpoint + '/statistics',
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(helper.onGlobalSuccess);
};

export default locationService;
