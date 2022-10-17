import axios from "axios";
import {API_HOST_PREFIX} from "./serviceHelpers"

const emailEndpoint = `${API_HOST_PREFIX}/api/emails` 
// const endpoint = "https://localhost:50001/api/emails"
const addEmail = (payload) => {

  const config = {
    method: "POST",
    url: emailEndpoint + "/contactus",
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };

  return axios(config);
};





let emailService = { addEmail };

export default emailService;
















