import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Card } from 'react-bootstrap';
import surveysService from '../../services/surveysService';

import debug from 'sabio-debug';

const _logger = debug.extend('SurveyDetail');

function SurveyAnalytics() {
    const id = useParams().surveyId;

    useEffect(() => {
        _logger(id);
        surveysService.getSurveyAnalytics(id).then(onGetSuccess).catch(onGetError);
    });

    const onGetSuccess = (response) => {
        _logger(response);
    };
    const onGetError = (response) => {
        _logger(response);
    };

    return (
        <Card>
            <Card.Header>
                <h1>Survey {id} Analytics</h1>
            </Card.Header>
        </Card>
    );
}

export default SurveyAnalytics;
