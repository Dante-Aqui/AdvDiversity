import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, Container, Card, Stack, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import jobsAdminSchema from '../../schema/jobsAdminSchema';
import debug from 'sabio-debug';
import * as jobAdminService from '../../services/jobAdminService';
import * as lookUpService from '../../services/lookupService';
import locationService from '../../services/locationService';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import 'toastr/build/toastr.min.css';
import './JobsForm.css';
import CustomSelect from './CustomSelect';
import SimpleBar from 'simplebar-react';
import Select from 'react-select';

const _logger = debug.extend('JobsAdmin');

function JobsForm() {
    const navigate = useNavigate();
    const [jobsData, setJobsData] = useState({
        mainFormData: {
            id: '',
            jobTypeId: '',
            jobTypeName: '',
            location: {
                locationTypeId: 0,
                lineOne: '',
                lineTwo: '',
                city: '',
                stateId: 0,
                zip: '',
                latitude: 90,
                longitude: -90,
            },
            createdBy: '',
            title: '',
            description: '',
            requirements: '',
            isActive: true,
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            isRemote: false,
        },
        locations: [],
        jobTypes: [],
        jobTypesSelect: [],
        locationTypes: [],
        states: [],
    });

    const [previewData, setPreviewData] = useState({
        lineOne: '',
        lineTwo: '',
        city: '',
        state: '',
        zip: '',
        jobTypeName: '',
    });

    useEffect(() => {
        const pageIndex = 0;
        const pageSize = 1000;
        let payload = ['JobType', 'LocationTypes', 'States'];
        lookUpService.getTypes(payload).then(onGetLookupSuccess).catch(onGetLookupError);
        locationService
            .getPagesLocations(pageIndex, pageSize)
            .then(getPagesLocationSuccess)
            .catch(getPagesLocationError);
    }, []);

    const getPagesLocationSuccess = (response) => {
        let returnedArray = response.data.item.pagedItems;
        let pageIndex = response.data.item.pagedIndex;
        let totalCount = response.data.item.totalCount;
        setJobsData((prevState) => {
            const locData = { ...prevState };
            locData.locations = returnedArray;
            locData.pageIndex = pageIndex;
            locData.totalCount = totalCount;
            locData.locationsMapped = locData.locations.map(mapLocation);
            return locData;
        });
    };
    const mapLocation = (location) => {
        return (
            <option value={location.id} key={`locationId_${location.id}`}>
                {location.lineOne} {location.lineTwo} {location.city} {location.state}
            </option>
        );
    };
    const getPagesLocationError = (error) => {
        _logger(error, 'getLocation Error');
        toastr.error(`${error}. Error retrieving locations`);
    };

    const onGetLookupSuccess = (response) => {
        _logger('This is response', response);
        setJobsData((prevState) => {
            _logger('this is prevState', prevState);
            const pd = { ...prevState };
            pd.jobTypes = response.item.jobType;
            pd.jobTypesSelect = response.item.jobType.map((jobType, index) => {
                return {
                    value: jobType.id,
                    label: jobType.name,
                    key: index,
                };
            });
            pd.locationTypes = response.item.locationTypes;
            pd.states = response.item.states;
            pd.statesMapped = response.item.states.map(mapStates);
            return pd;
        });
    };
    const mapStates = (states) => {
        return (
            <option value={states.id} key={`locationType_${states.id}`}>
                {states.name}
            </option>
        );
    };
    const onGetLookupError = (error) => {
        _logger(error, 'getJobTypes Error');
        toastr.error(`${error}. Error retrieving job types`);
    };

    const handleSubmit = (values) => {
        jobAdminService.addJob(values).then(onAddJobSuccess).catch(onAddJobError);
    };
    const onAddJobSuccess = (response) => {
        _logger(response);
        Swal.fire({
            title: '<strong>Job was created successfully</strong>',
            icon: 'success',
            confirmButtonText: 'Yes',
        });
        _logger('Job Created', response);
        navigate('/jobs');
    };
    const onAddJobError = (error) => {
        _logger(error);
        toastr.error(error);
    };

    const handleChange = (event) => {
        _logger('this is event', event);

        setJobsData((prevState) => {
            const prevData = { ...prevState };
            prevData.mainFormData.jobTypeId = event.value;
            return prevData;
        });

        setPreviewData((prevState) => {
            const prevData = { ...prevState };
            prevData.jobTypeName = event.label;
            return prevData;
        });

        _logger('this is jobTypeId', jobsData.mainFormData.jobTypeId);
    };

    return (
        <React.Fragment>
            <Container>
                <Formik
                    enableReinitialize={true}
                    initialValues={jobsData.mainFormData}
                    validateOnChange
                    validationSchema={jobsAdminSchema}
                    onSubmit={handleSubmit}>
                    {({ values }) => (
                        <Row className="m-3">
                            <Col xs={5} className="card p-3 me-2">
                                <Form>
                                    <div>
                                        <h3 className="formTitle">Add A Job</h3>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jobTypeId">Job Type</label>
                                        <Select
                                            options={jobsData.jobTypesSelect}
                                            onChange={handleChange}
                                            placeholder=" "
                                            components={{
                                                IndicatorSeparator: () => null,
                                            }}></Select>
                                        <ErrorMessage name="jobTypeId" component="div" className="text-danger" />
                                        <div className="form-group">
                                            <label className="mt-1">
                                                <Field type="checkbox" name="isRemote" /> Remote Job?
                                            </label>
                                        </div>
                                    </div>
                                    <br />
                                    <label htmlFor="location">Location</label>
                                    <CustomSelect
                                        setJobsData={setJobsData}
                                        setPreviewData={setPreviewData}></CustomSelect>
                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="contactName">Company Name</label>
                                        <Field className="form-control" type="text" name="contactName" />
                                        <ErrorMessage name="contactName" component="div" className="text-danger" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <div className="form-group">
                                            <label htmlFor="title">Title</label>
                                            <Field className="form-control" type="text" name="title" />
                                            <ErrorMessage name="title" component="div" className="text-danger" />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <Field className="form-control" rows={2} as="textarea" name="description" />
                                        <ErrorMessage name="description" component="div" className="text-danger" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="requirements">Requirements</label>
                                        <Field className="form-control" rows={2} as="textarea" name="requirements" />
                                        <ErrorMessage name="requirements" component="div" className="text-danger" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="contactPhone">Contact Phone (Optional)</label>
                                        <Field className="form-control" type="text" name="contactPhone" />
                                        <ErrorMessage name="contactPhone" component="div" className="text-danger" />
                                    </div>
                                    <br />
                                    <div className="form-group">
                                        <label htmlFor="contactEmail">Contact Email (Optional)</label>
                                        <Field className="form-control" type="text" name="contactEmail" />
                                        <ErrorMessage name="contactEmail" component="div" className="text-danger" />
                                    </div>
                                    <div className="btn text-center col-md-12">
                                        <Button type="submit" className="btn btn-primary rounded">
                                            <strong>Submit</strong>
                                        </Button>
                                    </div>
                                </Form>
                            </Col>
                            <Col className="card p-3">
                                <Card>
                                    <Card.Body className="p-1 jobs-shadow rounded ">
                                        <div className="my-4">
                                            <Stack direction="horizontal" gap={4}>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="image-holder p-2 m-1">
                                                        <div className="jobs-logo-jd" id="DIV-2">
                                                            {values?.contactName.charAt(0)}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="p-2 ">
                                                            <h4 className="center-jobs">
                                                                {values?.title || 'Job title '}
                                                                <br />
                                                            </h4>
                                                            <h3
                                                                className="card-title jobs-purp-text"
                                                                title="Job title"
                                                                name="card-title">
                                                                {values?.contactName || 'Company Name'}
                                                            </h3>
                                                            <h4>{previewData?.city || 'City '}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4 center-jobs p-2 m-2 ms-auto">
                                                    <Button
                                                        className="jobs-purp"
                                                        variant="primary"
                                                        type="submit"
                                                        title="Apply">
                                                        Apply on company site
                                                    </Button>
                                                </div>
                                            </Stack>
                                        </div>
                                    </Card.Body>
                                    <SimpleBar className="card-body py-0 job-details-container">
                                        <div className="border rounded p-1 m-1">
                                            <Stack direction="horizontal" gap={4}>
                                                <div className="details-table-row">
                                                    <Stack direction="horizontal" gap={4}>
                                                        <p className="center-jobs m-1" id="jobPostedCity">
                                                            {previewData?.city || 'City '},
                                                        </p>

                                                        <p className="center-jobs m-1" id="jobPostedState">
                                                            {previewData?.state || 'State '}
                                                        </p>
                                                    </Stack>
                                                </div>
                                                <div className="vr ms-auto" />
                                                <span
                                                    md={{ span: 4, offset: 4 }}
                                                    className="center-jobs p-2 m-1 ms-auto">
                                                    <Badge pill bg="secondary">
                                                        {!values?.isRemote || 'Remote'}
                                                    </Badge>{' '}
                                                </span>
                                                <div className="vr ms-auto" />
                                                <div className="details-table-row">
                                                    <Stack direction="horizontal" gap={4}>
                                                        <p className="center-jobs m-1" id="jobPostedLabel">
                                                            Today
                                                        </p>
                                                    </Stack>
                                                </div>
                                            </Stack>
                                        </div>
                                        <Container className="jobDescriptionContainer">
                                            <div>
                                                <div>
                                                    <div>
                                                        <p>
                                                            <strong>
                                                                {previewData?.jobTypeName || '  Job Type'} Full Job
                                                                Description:
                                                            </strong>
                                                        </p>
                                                        <p>{values?.description || 'Job description'}</p>
                                                        <strong>Requirements:</strong>
                                                        <p>{values?.requirements || 'Job requirements'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Container>
                                        <div className="border rounded p-1 m-1 job-fields-wrapper">
                                            <ul className="center-job-fields list-inline m-2">
                                                <li className="list-inline-item font-16 fw-semibold">
                                                    <Link to="#" className="text-secondary">
                                                        {previewData?.lineOne || 'address Line 1'}
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item text-muted"></li>
                                                <li className="list-inline-item font-13 fw-semibold text-muted">
                                                    {previewData?.lineTwo || ' '}
                                                </li>
                                                <p className="text-muted mb-0">{previewData?.city || '  City '}</p>
                                                <p className="text-muted mb-0">
                                                    <b>
                                                        {previewData?.state || 'State '}, {previewData?.zip || 'Zip '}
                                                    </b>
                                                </p>
                                            </ul>
                                        </div>
                                        <div className="border rounded p-1 m-1  job-fields-wrapper">
                                            <ul className="center-job-fields list-inline mb-2">
                                                <li className="list-inline-item font-16 fw-semibold">
                                                    <Link to="#" className="text-secondary">
                                                        {values?.contactName || 'Company Name'}
                                                    </Link>
                                                </li>
                                                <li className="list-inline-item text-muted"></li>
                                                <li className="center-job-fields list-inline-item font-13 fw-semibold text-muted">
                                                    {values?.contactEmail || 'Company Email'}
                                                </li>

                                                <p className="center-job-fields text-muted mb-0">
                                                    {values?.contactPhone || 'Company Number'}
                                                </p>
                                            </ul>
                                        </div>
                                    </SimpleBar>
                                </Card>
                            </Col>
                        </Row>
                    )}
                </Formik>
            </Container>
        </React.Fragment>
    );
}

export default JobsForm;
