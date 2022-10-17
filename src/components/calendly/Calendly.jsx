import React from 'react';
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import PropTypes from "prop-types"
import 'toastr/build/toastr.css';

import debug from 'sabio-debug';
const _logger = debug.extend('calendly');
const _loggerCalendly = _logger.extend('calendlyWidget');

const Calendly = ({ ownerUrl, emailPerson, userName }) => {


    useCalendlyEventListener({
        onProfilePageViewed: () => _loggerCalendly('onProfilePageViewed'),
        onDateAndTimeSelected: () => _loggerCalendly('onDateAndTimeSelected'),
        onEventTypeViewed: () => _loggerCalendly('onEventTypeViewed'),

    });

    _logger(userName)

    return (
        <div className="App">
            {!ownerUrl && <h3>Loading...</h3>}
            {ownerUrl && <InlineWidget url={`${ownerUrl}`} prefill={{ email: emailPerson ? emailPerson : "", name: userName ? userName : "", firstName: "Im test" }} />}
        </div>
    );
};

Calendly.propTypes = {
    ownerUrl: PropTypes.string.isRequired,
    emailPerson: PropTypes.string,
    userName: PropTypes.string
}

export default Calendly;
