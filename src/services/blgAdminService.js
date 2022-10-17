import axios from 'axios';
import { API_HOST_PREFIX, onGlobalSuccess, onGlobalError } from './serviceHelpers';
const blogsAdminApi = `${API_HOST_PREFIX}/api/blogsadmin`;
const addBlog = (payload) => {
    const config = {
        method: 'POST',
        url: `${blogsAdminApi}`,
        data: payload,
        crossdomain: true,
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const blogAdminService = {
    addBlog,
};
export default blogAdminService;
