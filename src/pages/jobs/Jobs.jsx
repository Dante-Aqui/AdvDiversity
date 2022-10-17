import React from 'react';
import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import "rc-pagination/assets/index.css"
import Container from 'react-bootstrap/Container'
import JobList from './JobList';
import JobDetails from './JobDetails';
import JobDetailsPlaceholder from './JobDetailsPlaceholder';
import "./jobs.css";
import debug from 'sabio-debug';

const _logger = debug.extend("Jobs");

function Jobs() {

    const [details, setDetails] = useState({})
    const [showDetails, setShowDetails] = useState(false);
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const onDetailsClick = (job) => {
        _logger(job);
        setDetails(job);
        setShowDetails(true);
        setShowPlaceholder(false)
    };

    return (
        <>
            <Container>
                <Row >
                    <JobList
                        detailsClick={onDetailsClick} />
                    <Col>
                        {showDetails &&
                            <JobDetails
                                jobData={details} />
                        }

                        {showPlaceholder &&
                            <JobDetailsPlaceholder />
                        }
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Jobs;