import axios from 'axios';
import * as helper from "../services/serviceHelpers";

let calendarService = {
    endpoint: `${process.env.REACT_APP_API_HOST_PREFIX}/api/calendly`,
};



calendarService.getEvent = (payload) => {
    const config = {
        method: 'POST',
        url: `${calendarService.endpoint}/events`,
        data: payload,
        crossdomain: true,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

calendarService.getCurrentUserMentor = () => {
    const config = {
        method: "GET",
        url: `${calendarService.endpoint}/user/current/mentor`,
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

calendarService.getCurrentUserMentee = () => {
    const config = {
        method: "GET",
        url: `${calendarService.endpoint}/user/current/mentee`,
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

calendarService.getListEventsMentor = () => {
    const config = {
        method: 'GET',
        url: `${calendarService.endpoint}/events/mentor`,
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

calendarService.getListEventsMentee = () => {
    const config = {
        method: 'GET',
        url: `${calendarService.endpoint}/events/mentee`,
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

calendarService.getMenteesEvent = () => {
    const config = {
        method: 'GET',
        url: `${calendarService.endpoint}/invitees/mentor`,
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

calendarService.getType = () => {
    const config = {
        method: 'GET',
        url: `${calendarService.endpoint}/type`,
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
}

export default calendarService;
