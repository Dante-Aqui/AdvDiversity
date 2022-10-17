import ReactGa from 'react-ga';
import debug from 'sabio-debug';


const id = process.env.REACT_APP_GA_ID;
const _loggerMyGa = debug.extend("myGa");

const myGa = () => {
    ReactGa.initialize(id);
    _loggerMyGa(window.location.pathname + window.location.search);
    ReactGa.pageview(window.location.pathname + window.location.search);
}

const useAnalyticsEventTracker = (category = "placeholder") => {
    const eventTracker = (action = "test action", label = "test label") => {
        ReactGa.event({category, action, label})
    }
    return eventTracker;
}

export default myGa;
export {useAnalyticsEventTracker}


