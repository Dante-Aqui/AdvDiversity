import React from 'react';
import debug from 'sabio-debug';
import AllFaqs from './AllFaqs';
import './faqtab.css';

import { Tab, Tabs } from 'react-bootstrap';

const _logger = debug.extend('FaqAdmin');

const FaqAdmin = () => {
    _logger('FAQAdmin rendering');

    return (
        <React.Fragment>
            <div className="faq-container container mt-3 bg-light">
                <div className="mt-2 mb-2">
                    <Tab.Container>
                        <Tabs>
                            <Tab.Content eventKey="AllFaqs">
                                <div className="faq-content active-content">
                                    <h2>Current FAQs</h2>
                                    <hr />
                                    <AllFaqs />
                                </div>
                            </Tab.Content>
                        </Tabs>
                    </Tab.Container>
                </div>
            </div>
        </React.Fragment>
    );
};

export default FaqAdmin;
