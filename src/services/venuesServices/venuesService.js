import axios from 'axios';

var venuesService = {
    endpoint: `${process.env.REACT_APP_API_HOST_PREFIX}/api/venues/`,
};

let getVenues = () => {
    const config = {
        method: 'GET',
        url: venuesService.endpoint + 'paginate/?pageIndex=0&pageSize=8',
        withCredentials: true,
        crossdomain: true,
        headers: { 'Content-Type': 'application/json' },
    };

    return axios(config);
};

export { getVenues };
