import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import TemplateCard from './TemplateCard';
import * as newsletterTemplatesService from '../../services/newsletterTemplatesService';
import debug from 'sabio-debug';
import { Link } from 'react-router-dom';
import TemplatesForm from './TemplatesForm';
import Pagination from 'rc-pagination';
import * as toastr from 'toastr';
import 'rc-pagination/assets/index.css';
import 'toastr/build/toastr.css';

function NewsLetterTemplate() {
    const _logger = debug.extend('NewsletterTemplates');

    const [templateData, setTemplateData] = useState({
        index: 0,
        size: 6,
        totalCount: 0,
        templates: [],
        mappedTemplates: [],
    });
    const [searchBar] = useState({
        search: '',
    });
    const [isSearch, setIsSearch] = useState(false);

    useEffect(() => {
        const index = templateData.index;
        const size = templateData.size;
        newsletterTemplatesService.getPaginated(index, size).then(onGetSuccess);
    }, []);

    const onGetSuccess = (response) => {
        _logger(response);
        setTemplateData((prevData) => {
            const newData = { ...prevData };
            newData.templates = response.item.pagedItems;
            newData.mappedTemplates = newData.templates.map(mapTemplates);
            newData.totalCount = response.item.totalCount;
            return newData;
        });
        setIsSearch(false);
    };

    const mapTemplates = (aTemplate) => {
        return <TemplateCard template={aTemplate} key={aTemplate.id} onTemplateClicked={onDeleteRequested} />;
    };

    const onDeleteRequested = useCallback((myTemplate) => {
        _logger(myTemplate.id, { myTemplate });

        const handler = getDeleteSuccessHandler(myTemplate.id);

        newsletterTemplatesService.deleting(myTemplate.id).then(handler).catch(onDeleteError);
    }, []);

    const getDeleteSuccessHandler = (idToBeDeleted) => {
        return () => {
            setTemplateData((prevState) => {
                const pd = { ...prevState };
                pd.templates = [...pd.templates];

                const indOf = pd.templates.findIndex((person) => {
                    let result = false;

                    if (person.id === idToBeDeleted) {
                        result = true;
                    }
                    return result;
                });

                if (indOf >= 0) {
                    pd.templates.splice(indOf, 1);
                    pd.mappedTemplates = pd.templates.map(mapTemplates);
                }
                return pd;
            });
        };
    };

    const onDeleteError = (error) => {
        _logger(error);
    };

    const handleSearch = (values) => {
        _logger(values.search);
        if (values.search) {
            newsletterTemplatesService
                .getSearchPaginated(0, templateData.size, values.search)
                .then(onSearchSuccess)
                .catch(onSearchError);
        } else {
            newsletterTemplatesService.getPaginated(0, templateData.size).then(onGetSuccess);
        }
    };
    const onSearchSuccess = (response) => {
        _logger(response);
        setTemplateData((prevData) => {
            const newData = { ...prevData };
            newData.templates = response.item.pagedItems;
            newData.mappedTemplates = newData.templates.map(mapTemplates);
            newData.totalCount = response.item.totalCount;
            return newData;
        });
        setIsSearch(true);
    };

    const onSearchError = (response) => {
        _logger(response);
        toastr['error']('Please double check your responses', 'Error');
    };

    const onPageChange = (page) => {
        if (isSearch) {
            newsletterTemplatesService
                .getSearchPaginated(page - 1, templateData.size, searchBar.search)
                .then(onSearchSuccess);
        } else {
            newsletterTemplatesService.getPaginated(page - 1, templateData.size).then(onGetSuccess);
        }
    };
    return (
        <div className="m-3">
            <div className="card container">
                <div className="container">
                    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        Newsletter Template (Admin)
                    </h2>
                    <div
                        className="container"
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link
                            to="/newslettertemplates/new"
                            element={<TemplatesForm></TemplatesForm>}
                            className="btn btn-primary"
                            style={{ margin: `5px` }}>
                            Add Template
                        </Link>
                        <Formik enableReinitialize={true} initialValues={searchBar} onSubmit={handleSearch}>
                            <Form>
                                <div className="form-group ">
                                    <label htmlFor="search">Search</label>
                                    <div className="d-flex justify-content between">
                                        <Field type="text" name="search" className="form-control" />
                                        <button type="submit" className="btn btn-primary">
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                        <Pagination
                            onChange={onPageChange}
                            current={templateData.index}
                            pageSize={templateData.size}
                            total={templateData.totalCount}
                            className="pagination-rounded"
                        />
                    </div>
                    <div className="container">
                        <div className="row" style={{ padding: `10px` }}>
                            {templateData.mappedTemplates}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsLetterTemplate;
