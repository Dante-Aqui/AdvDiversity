import axios from 'axios';
import { API_HOST_PREFIX, } from './serviceHelpers';

const jobTypeApi = {
    endpoint: `${API_HOST_PREFIX}/api/jobtype`
}

const getJobTypes = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${jobTypeApi.endpoint}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
}

const getAllJobTypes = () => {
    const config = {
        method: 'GET',
        url: `${jobTypeApi.endpoint}`,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    }
    return axios(config);
}
const jobTypes = {
    getJobTypes,
    getAllJobTypes,
}

export default jobTypes;