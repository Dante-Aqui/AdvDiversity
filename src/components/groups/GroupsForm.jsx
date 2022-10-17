import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import debug from 'sabio-debug';
import { groupFormSchema } from '../../schema/groupsFormSchema';
import * as groupService from '../../services/groupService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FileUploader from '../files/FileUploader';
import './groups.css';
import toastr from 'toastr';

const _logger = debug.extend('GroupsForm');

function AddGroup() {
    const [groupTypes, setGroupTypes] = useState();
    useEffect(() => {
        let payload = ['GroupTypes'];
        groupService.getLookups(payload).then(onGetLookupSuccess).catch(onGetLookupError);
    }, []);

    const [groupFormData] = useState({
        groupType: '',
        name: '',
        headline: '',
        description: '',
        logo: '',
    });

    const navigate = useNavigate();

    const onGetLookupSuccess = (response) => {
        _logger('onGetLookupSuccess', response);
        setGroupTypes((prevState) => {
            let pd = { ...prevState };
            pd = response.data.item.groupTypes;
            return pd;
        });
    };

    const onGetLookupError = (err) => {
        _logger('onSearchBlogCategoriesError', err);
        toastr.error(err);
    };

    const onCreateGroupSuccess = (response) => {
        _logger(response);
        Swal.fire('You have successfully added a Group!');
        navigate('/searchorganizations');
    };

    const onCreateGroupError = (response) => {
        _logger('Register error', { response });
        Swal.fire('Register Error');
    };

    const mapGroup = (group) => {
        return (
            <option value={group.id} key={`group_${group.id}`}>
                {group.name}
            </option>
        );
    };

    const [uploadFileData, setUploadFileData] = useState({
        name: '',
        url: '',
        filesType: '',
        fileTypeId: '',
    });

    const onHandleUploadSuccess = (files) => {
        _logger('onHandleUploadSuccess', { files });

        setUploadFileData((prevState) => {
            let newUploadObject = { ...prevState };
            newUploadObject = files[0];
            return newUploadObject;
        });
    };

    const onAddAGroupClicked = (e) => {
        e.preventDefault();
        navigate('/searchorganizations');
    };

    const handleSubmit = (values) => {
        _logger(values, 'values obeject handle submit');
        _logger(uploadFileData.url, 'Logo Url');
        _logger(groupFormData);

        const payload = {
            groupTypeId: values.groupType,
            name: values.name,
            headline: values.headline,
            description: values.description,
            logo: uploadFileData.url,
        };

        groupService.createGroup(payload).then(onCreateGroupSuccess).catch(onCreateGroupError);
    };
    const mappedGroups = groupTypes?.map(mapGroup);

    return (
        <React.Fragment>
            <button
                type="button"
                className="btn btn-secondary rounded-pill back-to-search-btn"
                value="backToSearchResults"
                onClick={onAddAGroupClicked}>
                Back To Search Results
            </button>
            <Formik
                enableReinitialize={true}
                initialValues={groupFormData}
                onSubmit={handleSubmit}
                validationSchema={groupFormSchema}>
                {() => (
                    <Form className="bg-white group-form-style px-3">
                        <div className="container">
                            <h3 className="group-form-title pt-2">Create A Group</h3>
                            <div className="row">
                                <div className="inline-display">
                                    <div className="group-form-name-field">
                                        <label htmlFor="name">Name</label>
                                        <Field
                                            placeholder="Please Enter Your Group Name"
                                            type="text"
                                            name="name"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="name" component="div" className="jq-err" />
                                    </div>
                                    <div className="grouptype-field">
                                        <label htmlFor="groupType">GroupType</label>
                                        <Field component="select" name="groupType" className="drop-down form-control ">
                                            <option>Please Select a GroupType</option>
                                            {mappedGroups}
                                        </Field>
                                        <ErrorMessage name="groupType" component="div" className="jq-err" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="mt-2" htmlFor="headline">
                                    Headline
                                </label>
                                <Field
                                    placeholder="Please Enter A Headline"
                                    type="text"
                                    name="headline"
                                    className="form-control"
                                />
                                <ErrorMessage name="headline" component="div" className="jq-err" />
                            </div>
                            <div className="mb-3">
                                <label className="mt-2" htmlFor="logo">
                                    Upload Your Logo
                                </label>
                                <ErrorMessage name="logo" component="div" className="jq-err" />
                                <FileUploader
                                    name="logo"
                                    onHandleUploadSuccess={onHandleUploadSuccess}
                                    isMultilple={true}
                                />
                                <div className="group-file-name-pos">{uploadFileData.name}</div>
                            </div>
                            <div>
                                <label className="mt-4" htmlFor="description">
                                    Description
                                </label>
                                <Field
                                    component="textarea"
                                    name="description"
                                    className="group-desc-field form-control "
                                    placeholder="Please Enter Your Group's Description"
                                />
                                <ErrorMessage name="description" component="div" className="jq-err" />
                            </div>
                            <div className="pb-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary mt-3  groups-submit-btn"
                                    onClick={handleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}

export default AddGroup;
