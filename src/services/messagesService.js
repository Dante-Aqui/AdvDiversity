import axios from 'axios';
import { onGlobalError, onGlobalSuccess, API_HOST_PREFIX } from '../services/serviceHelpers';

var messagesService = {
    endpoint: `${API_HOST_PREFIX}/api/messages`,
};

messagesService.getAll = () => {
    const config = {
        method: 'GET',
        url: `${messagesService.endpoint}?pageIndex=0&pageSize=2`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

messagesService.getCreatedBy = (id) => {
    const config = {
        method: 'GET',
        url: `${messagesService.endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

messagesService.getConvo = (id) => {
    const config = {
        method: 'GET',
        url: `${messagesService.endpoint}/conversations/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

messagesService.newMessage = (message) => {
    const config = {
        method: 'POST',
        url: `${messagesService.endpoint}`,
        data: message,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

messagesService.getMessageById = (id) => {
    const config = {
        method: 'GET',
        url: `${messagesService.endpoint}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

export default messagesService;
