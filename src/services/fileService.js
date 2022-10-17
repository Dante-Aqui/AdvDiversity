import axios from 'axios';
import debug from 'sabio-debug';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';

const _logger = debug.extend('fileService');

const uploadFile = function (payload) {
    _logger("Payload --->",{payload});
    const config = {
        method: 'POST',
        url: `${API_HOST_PREFIX}/api/files/`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getByCreatedBy = function (pageIndex, pageSize) {
    const config = {
        method: 'GET',
        url: `${API_HOST_PREFIX}/api/files/paginate/current/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const deleteById = function (fileId) {
    const config = {
        method: 'DELETE', // put a http method here
        url: `${API_HOST_PREFIX}/api/files/${fileId}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(() => {
        return fileId;
    });
};
const fileService = { uploadFile, getByCreatedBy, deleteById };
export default fileService;
