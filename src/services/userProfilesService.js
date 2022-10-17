import axios from "axios";
import { API_HOST_PREFIX } from './serviceHelpers';

const endpoint= `${API_HOST_PREFIX}/api/profiles`;

const getById = (id) => {
    const config = {
        method: "GET",
        url:endpoint + `/${id}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"},
    };

    return axios(config).then(response => {
        return response.data.item;
    })
}

const getProfilesByPage = (pageIndex, pageSize) => {
    const config = {
        method: "GET",
        url: `${endpoint}/?pageIndex=${pageIndex}&pageSize=${pageSize}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };

    return axios(config)
}

const getUserProfile = () => {
    const config = {
        method: "GET",
        url: `${endpoint}/current/user/?pageIndex=0&pageSize=1`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"},
    };

    return axios(config).then(response => {
        return response.data.item.pagedItems[0];
    })
}

const profileRegister = (payload) => {
    const config = {
        method: "POST",
        url: endpoint,
        data: payload,
        crossdomain: true,
        headers: { "Content-Type": "application/json"},
    };

    return axios(config).then(response => {
        payload.id = response.data.item;
        return payload;
    });
}

const updateById = (id, payload) => {
    const config = {
        method: "PUT",
        url: endpoint + `/${id}`,
        data: payload,
        crossdomain: true,
        headers: {"Content-Type": "application/json"},
    };

    return axios(config)
}

const deleteById = (id) => {
    const config = {
        method: "DELETE",
        url: endpoint + `/${id}`,
        crossdomain: true,
        headers: {"Content-Type": "application/json"},
    }

    return axios(config)
}

const userProfilesService ={ getById, getProfilesByPage, profileRegister, updateById, deleteById, getUserProfile };

export default userProfilesService;