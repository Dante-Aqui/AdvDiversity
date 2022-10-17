import axios from 'axios';
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from '../services/serviceHelpers';

const shareStoryEndpoint = `${API_HOST_PREFIX}/api/sharestory`;

const addShareStory = (payload) => {
    const config = {
        method: 'POST',
        url: shareStoryEndpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getShareStory = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${shareStoryEndpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export { getShareStory, addShareStory };
