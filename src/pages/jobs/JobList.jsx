import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { Form, Col, Container, Stack, Row, Button, InputGroup } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import jobService from '../../services/jobService';
import jobTypes from '../../services/jobTypeService';
import JobCard from './JobCard';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import toastr from 'toastr';
import Loader from './Loader';

const _logger = debug.extend('JobList');

const JobList = (props) => {
    const [pageData, setPageData] = useState({
        searchJobs: '',
        filterJobType: '',
        jobComponents: [],
        jobArray: [],
        jobTypesArray: [],
        jobTypesMapped: [],
        jobTypesFilter: [],
        totalCount: 0,
        current: 1,
        pageIndex: 0,
        pageSize: 5,
        hasMore: true,
    });

    useEffect(() => {
        jobTypes.getAllJobTypes().then(onGetAllJobTypesSuccess).catch(onGetAllJobTypesError);
    }, []);
    const renderAllJobFairs = () => {
        setPageData((prevState) => ({
            ...prevState,
            searchJobs: '',
            filterJobType: '',
            pageIndex: 0,
            pageSize: 5,
            totalCount: 0,
            hasMore: true,
            jobComponents: [],
            jobArray: [],
            jobTypesArray: [],
        }));
        jobService.getJobs(pageData.pageIndex, pageData.pageSize).then(onGetJobsSuccess).catch(onGetJobsError);
    };

    useEffect(() => {
        if (pageData.searchJobs === '') {
            jobService.getJobs(pageData.pageIndex, pageData.pageSize).then(onGetJobsSuccess).catch(onGetJobsError);
        } else if (pageData.filterJobType && !pageData.searchJobs) {
            jobService
                .searchType(pageData.pageIndex, pageData.pageSize, pageData.filterJobType)
                .then(onGetJobsSuccess)
                .catch(onGetJobsError);
        } else if (pageData.filterJobType && pageData.searchJobs) {
            jobService
                .selectByQueryAndType(
                    pageData.pageIndex,
                    pageData.pageSize,
                    pageData.searchJobs,
                    pageData.filterJobType
                )
                .then(onGetJobsSuccess)
                .catch(onGetJobsError);
        } else if (!pageData.filterJobType && pageData.searchJobs) {
            jobService
                .searchJobs(pageData.pageIndex, pageData.pageSize, pageData.searchJobs)
                .then(onGetJobsSuccess)
                .catch(onGetJobsError);
        }
    }, [pageData.pageIndex, pageData.searchJobs, pageData.filterJobType]);

    const onGetJobsSuccess = (data) => {
        const jobsAr = data.item.pagedItems;
        _logger('jobsAr after axios call', jobsAr);

        setPageData((prevState) => {
            let pd = { ...prevState };
            pd.totalCount = data.item.totalCount;
            pd.hasMore = true;
            pd.jobArray = [...pd.jobArray, ...jobsAr];
            pd.jobComponents = pd.jobArray.map(mapJob);
            return pd;
        });
    };

    const mapJob = (aJob) => {
        return <JobCard key={aJob.id} jobData={aJob} detailsClick={props.detailsClick} />;
    };

    const onPageChange = () => {
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.pageIndex = pd.pageIndex + 1;
            return pd;
        });
    };

    const onGetJobsError = (err) => {
        _logger('getJobs Error', err);
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.hasMore = false;
            return pd;
        });
    };

    const onGetAllJobTypesSuccess = (data) => {
        const jobTypeArray = data.data.items;
        _logger('onGetAllJobTypesSuccess', jobTypeArray);
        setPageData((prevState) => {
            const typeData = { ...prevState };
            typeData.jobTypesArray = jobTypeArray;
            typeData.jobTypesFilter = jobTypeArray.type;
            typeData.jobTypesMapped = typeData.jobTypesArray.map(mapJobTypes);
            return typeData;
        });
    };
    const mapJobTypes = (jobType) => {
        return (
            <option value={jobType.name} key={`jobFairType_${jobType.id}`} onClick={handleChange}>
                {jobType.type}
            </option>
        );
    };
    const onGetAllJobTypesError = (err) => {
        _logger(err, 'jobtypedataerror');
        toastr.error(err, 'Please try another search', {
            iconClass: 'toast-custom',
            preventDuplicates: true,
            preventOpenDuplicates: true,
        });
    };

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        _logger('handleChange value:', value);

        if (value === pageData.jobTypesFilter) {
            _logger('handleChange pageData:', pageData);
            setPageData((prevState) => ({
                ...prevState,
                filterJobType: value,
                pageIndex: 0,
                pageSize: 15,
                totalCount: 0,
                hasMore: true,
                jobComponents: [],
                jobArray: [],
                jobTypesArray: [],
            }));
        } else if (value.length >= 1) {
            setPageData((prevState) => ({
                ...prevState,
                searchJobs: value,
                pageIndex: 0,
                pageSize: 15,
                totalCount: 0,
                hasMore: true,
                jobComponents: [],
                jobArray: [],
                jobTypesArray: [],
            }));
        } else {
            return;
        }
    };

    return (
        <Col className="simplebar-content-wrapper">
            <Container className="p-1 mb-2 d-flex align-items-center">
                <Stack fluid="md" gaqp={3} className="d-flex align-items-center">
                    <Row className="w-50 h-50">
                        <Button variant="outline-secondary" size="sm" type="submit" onClick={renderAllJobFairs}>
                            View All
                        </Button>
                    </Row>
                    <InputGroup className="mb-1 p-1 w-50 h-50">
                        <InputGroup.Text id="basic-addon1">Search:</InputGroup.Text>
                        <Form.Control
                            id="jobSearchInput1"
                            onChange={handleChange}
                            type="text"
                            placeholder="...generic"
                            aria-label="text"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Form.Select className="form-control w-50 h-50" onChange={handleChange}>
                        <option value="0"> Search by location type</option>
                        {pageData.jobTypesMapped}
                    </Form.Select>
                </Stack>
            </Container>
            <SimpleBar scrollableNodeProps={{ id: 'scrollableDiv' }} className="card-body py-0 job-list-container">
                <InfiniteScroll
                    dataLength={pageData.jobComponents.length}
                    next={onPageChange}
                    hasMore={pageData.hasMore}
                    loader={<Loader />}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Oh no! There are no more jobs that match your search.</b>
                        </p>
                    }>
                    {pageData.jobComponents}
                </InfiniteScroll>
            </SimpleBar>
        </Col>
    );
};

JobList.propTypes = {
    detailsClick: PropTypes.func,
    searchJobs: PropTypes.func,
};

export default JobList;
