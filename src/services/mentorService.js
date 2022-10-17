import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from '../services/serviceHelpers';

const mentorServiceApi = `${API_HOST_PREFIX}/api/mentors`;

const addMentor = (payload) => {
    const config = {
        method: 'POST',
        url: mentorServiceApi,
        data: payload,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const updateMentor = (id, payload) => {
    const config = {
        method: 'PUT',
        url: `${mentorServiceApi}/${id}`,
        crossdomain: true,
        data: payload,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config);
};

const deleteMentor = (id) => {
    const config = {
        method: 'DELETE',
        url: `${mentorServiceApi}/${id}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(() => {
        return id;
    });
};

const getMentorById = (id) => {
    const config = {
        method: 'GET',
        url: `${mentorServiceApi}/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMentors = (pageIndex, pageSize) => {
    const config = {
        method: 'GET',
        url: `${mentorServiceApi}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const getMenteesById = (id) => {
    const config = {
        method: 'GET',
        url: `${mentorServiceApi}/mentees/${id}`,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const sendSurveyEmail = (payload) => {
    const config = {
        method: 'PUT',
        url: mentorServiceApi,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const mentorService = {
    addMentor,
    updateMentor,
    deleteMentor,
    getMentorById,
    getMentors,
    getMenteesById,
    sendSurveyEmail,
};

export default mentorService;
