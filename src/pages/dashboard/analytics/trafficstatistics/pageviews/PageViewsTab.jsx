import React, { useEffect, useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import PageViewsBarChart from './PageViewsBarChart';
import googleAnalyticsService from '../../../../../services/googleAnalyticsService';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const _loggerMostViewedPages = debug.extend('MostViewed');

const PageViewsTab = (props) => {
    const [pagesInfo, setPagesInfo] = useState({
        pages: [],
        viewsByPage: [],
        avgTimeOnPage: [],
        target: {
            title: '',
            avgTime: 0,
        },
    });

    useEffect(() => {
        googleAnalyticsService
            .getPageViewsInfo(props.dateRange?.startDate, props.dateRange?.endDate)
            .then(onGetPageViewInfoSuccess)
            .catch(onGetPageViewsError);
    }, [props.dateRange]);

    const onGetPageViewInfoSuccess = (response) => {
        setPagesInfo((prevState) => {
            const pi = { ...prevState };

            pi.pages = response.map((page) => page.title).slice(0, 5);
            pi.viewsByPage = response.map((page) => page.views).slice(0, 5);
            pi.avgTimeOnPage = response.map((page) => page.avgTimeOnPage).slice(0, 5);

            pi.target.title = pi.pages[0];
            pi.target.avgTime = pi.avgTimeOnPage[0];

            return pi;
        });
    };

    const onGetPageViewsError = (error) => {
        _loggerMostViewedPages(error);
    };

    const viewAverageTimeOnPage = (index) => {
        setPagesInfo((prevState) => {
            const pi = { ...prevState };
            if (pi.avgTimeOnPage[index] >= 0) {
                pi.target.title = pi.pages[index];
                pi.target.avgTime = pi.avgTimeOnPage[index];
            }
            return pi;
        });
    };

    return (
        <Row className="d-flex flex-column h-100">
            <Row>
                <Card className="tilebox-one border border-primary p-0">
                    <Card.Header className="bg-primary text-light">
                        <h4 className="header-title text-center">Most visited pages</h4>
                    </Card.Header>
                    <Card.Body>
                        <PageViewsBarChart
                            pagesInfo={{ pages: pagesInfo.pages, viewsByPage: pagesInfo.viewsByPage }}
                            viewAverageTimeOnPage={viewAverageTimeOnPage}
                        />
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Card className="tilebox-one bg-primary text-light">
                    <Card.Body>
                        <h1 className="header-title mb-3">Average time spent on {pagesInfo.target.title}</h1>
                        <h2>{pagesInfo.target.avgTime} seconds </h2>
                    </Card.Body>
                </Card>
            </Row>
        </Row>
    );
};

PageViewsTab.propTypes = {
    dateRange: PropTypes.shape({
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    }),
};

export default React.memo(PageViewsTab);
