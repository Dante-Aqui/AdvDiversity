import axios from 'axios';
import { onGlobalSuccess, onGlobalError } from './serviceHelpers';

const endpoint = `${process.env.REACT_APP_API_HOST_PREFIX}/api/daily/meeting`;

const getDailyRoom = () => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    url: `${endpoint}`,
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};



export {
  getDailyRoom
};
