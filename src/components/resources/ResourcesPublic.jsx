import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCardPublic';
import ResourceSearch from './ResourceSearch';
import * as resourceService from '../../services/resourceService';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import toastr from 'toastr';
import 'rc-pagination/assets/index.css';
import { BsSearch } from 'react-icons/bs';
import { Formik, Form, Field } from 'formik';
import { Col, Row } from 'react-bootstrap';
import debug from 'sabio-debug';

const _logger = debug.extend('Resources');

function Resources() {
    const [pageData, setPageData] = useState({
        arrayOfResources: [],
        resourceComponents: [],
        arrayOfResourceType: [],
        resourceTypeComponent: [],
        pageIndex: 0,
        pageSize: 4,
        totalPages: 0,
        currentActualPage: 0,
    });

    const [formData] = useState({ search: '' });

    const [searchResource, setSearchResource] = useState({
        arrOfSearchItems: [],
        searchItemComponent: [],
    });
    const [resourceType, setResourceType] = useState('showAll');
    const onChange = (currentPage) => {
        if (resourceType === 'showAll') {
            resourceService
                .getPaginatedResources(currentPage - 1, pageData.pageSize)
                .then(getPaginatedResourcesSuccess)
                .catch(getPaginatedResourcesError);
        }
    };

    const onHandleSearch = (value) => {
        setResourceType('showAll');
        resourceService.searchResource(value.search).then(onSearchResourcesSuccess).catch(onSearchResourcesError);
    };

    useEffect(() => {
        resourceService.getResourceType().then(onGetResourceTypeSuccess).catch(onGetResourceTypeError);
    }, []);

    useEffect(() => {
        if (resourceType !== 'showAll') {
            resourceService
                .getResourcesByTypeId(resourceType)
                .then(onGetResourcesByTypeIdSuccess)
                .catch(onGetResourcesByTypeIdError);
        } else {
            resourceService
                .getPaginatedResources(0, 4)
                .then(getPaginatedResourcesSuccess)
                .catch(getPaginatedResourcesError);
        }
    }, [resourceType]);

    const mapResource = (aResource) => {
        return <ResourceCard resource={aResource} key={aResource.id}></ResourceCard>;
    };

    const mapOption = (resource) => {
        return (
            <option value={resource.id} key={`resource_${resource.id}`}>
                {resource.name}
            </option>
        );
    };

    const onHandleFilterButtonClick = (event) => {
        event.preventDefault();
        _logger(event.currentTarget.value);
        const rt_ = event.currentTarget.value;
        setResourceType(rt_);
    };

    const mapSearchResource = (resource) => {
        return <ResourceSearch resource={resource} key={resource.id}></ResourceSearch>;
    };

    const getPaginatedResourcesSuccess = (data) => {
        let returnedArray = data.item.pagedItems;

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfResources = returnedArray;
            pd.resourceComponents = returnedArray.map(mapResource);
            pd.totalPages = data.item.totalCount;
            return pd;
        });
    };

    const onSearchResourcesSuccess = (response) => {
        let foundResource = response.data.item.pagedItems;
        _logger('search is good... ', foundResource);
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfResources = foundResource;
            pd.resourceComponents = foundResource.map(mapSearchResource);
            return pd;
        });
    };

    const onGetResourceTypeSuccess = (response) => {
        let resourceType = response.data.items;

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfResourceType = resourceType;
            pd.resourceTypeComponent = resourceType.map(mapOption);

            return pd;
        });
    };

    const onGetResourcesByTypeIdSuccess = (response) => {
        let foundResource = response.data.items;
        setSearchResource((prevState) => {
            const pd = { ...prevState };
            pd.arrOfSearchItems = foundResource;
            pd.searchItemComponent = foundResource.map(mapSearchResource);
            return pd;
        });
    };

    const onGetResourcesByTypeIdError = () => {};
    const onGetResourceTypeError = () => {};
    const onSearchResourcesError = () => {};
    const getPaginatedResourcesError = () => {
        toastr.error('Unable to retrieve Resources', 'Failed To Retrieve Resources');
    };

    return (
        <>
            <div className="m-3">
                <div className="card container">
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Resource Library
                    </h2>
                    <h5 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Welcome to our Resources Library. Here you can view third-party organizations that provide
                        mentorship programs or classes.
                    </h5>
                    <Row>
                        <Col>
                            <div className="container">
                                <h4>Browse Resource Types</h4>
                                <form>
                                    <select
                                        className="blogTypeId p-1"
                                        value={resourceType}
                                        onChange={onHandleFilterButtonClick}>
                                        <option value="showAll">Show All</option>
                                        {pageData.resourceTypeComponent}
                                    </select>
                                </form>
                            </div>
                        </Col>
                        <Col>
                            <div className="container mt-2">
                                <Pagination
                                    current={pageData.currentActualPage}
                                    total={pageData.totalPages}
                                    pageSize={pageData.pageSize}
                                    onChange={onChange}
                                    locale={locale}
                                    disabled={resourceType !== 'showAll'}></Pagination>
                            </div>
                        </Col>
                        <Col>
                            <Formik enableReinitialize={true} initialValues={formData} onSubmit={onHandleSearch}>
                                <Form>
                                    <div className="input-group">
                                        <div className="form-outline m-1">
                                            <label className="form-label ">Search:</label>
                                        </div>
                                        <div className="form-outline">
                                            <Field
                                                type="text"
                                                className="form-control"
                                                name="search"
                                                placeholder="Enter title..."></Field>
                                        </div>

                                        <button type="submit" className="btn btn-primary">
                                            <BsSearch />
                                        </button>
                                    </div>
                                </Form>
                            </Formik>
                        </Col>
                    </Row>

                    <div className="container row mt-2">
                        {resourceType !== 'showAll' ? searchResource.searchItemComponent : pageData.resourceComponents}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Resources;
