import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import debug from 'sabio-debug';
import * as groupServices from '../../services/groupService';
import toastr from 'toastr';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import { Col, Row } from 'react-bootstrap';
import { groupFormSchema } from '../../schema/groupsFormSchema';
import FileUploader from '../../components/files/FileUploader';
import '../../components/groups/groups.css';
import PropTypes from 'prop-types';

const _logger = debug.extend('GroupEdit');

function GroupEdit(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const groupData = location.state;
    const currentUser = props.currentUser;
    _logger(groupData);
    const { id } = useParams();

    const [groupTypes, setGroupTypes] = useState();
    const [selectedOrgData, setSelectedOrgData] = useState({
        id: '',
        groupType: '',
        name: '',
        headline: '',
        description: '',
        logo: '',
    });
    const [uploadFileData, setUploadFileData] = useState({
        name: '',
        url: null,
        filesType: '',
        fileTypeId: '',
    });

    const [count, setCount] = useState({
        groupId: '',
        totalCount: '',
    });

    const [groupName, setGroupName] = useState({
        groupName: '',
    });

    useEffect(() => {
        let payload = ['GroupTypes'];
        groupServices.getLookups(payload).then(onGetLookupSuccess).catch(onGetLookupError);
        let groupId = groupData.id;

        if (!location.state) {
            groupId = id;
        }
        groupServices.getGroupById(groupId).then(onGetGroupByIdSuccess).catch(onGetGroupByIdError);
    }, []);

    useEffect(() => {
        groupServices.getJoinedGroup(groupData.id).then(onGetJoinedGroupSuccess).catch(onGetJoinedGroupError);
    }, []);

    const onGetJoinedGroupSuccess = (response) => {
        _logger('onGetLookupSuccess', response);
        setCount((prevState) => {
            let groupCount = { ...prevState };
            groupCount = response.item;
            _logger(groupCount);
            return groupCount;
        });
    };

    const onGetJoinedGroupError = (err) => {
        _logger('onGetJoinedGroupError', err);
        toastr.error(err);
    };

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

    const mapGroupType = (type) => {
        return (
            <option value={type.id} key={`type_${type.id}`}>
                {type.name}
            </option>
        );
    };
    const onGetGroupByIdSuccess = (data) => {
        let aGroupData = data.item;
        setSelectedOrgData((prevState) => {
            let od = { ...prevState };
            od = {
                id: aGroupData.id,
                groupType: aGroupData.groupType.id,
                groupTypeId: aGroupData?.groupType?.id,
                name: aGroupData.name,
                headline: aGroupData.headline,
                logo: aGroupData.logo,
                description: aGroupData.description,
                createdById: aGroupData.createdById,
            };
            _logger(od, 'od getgroupbyidsuccess');
            return od;
        });
        setGroupName((prevState) => {
            let od = { ...prevState };
            od = { groupName: aGroupData.groupType.name };
            _logger(od);
            return od;
        });
    };

    const onGetGroupByIdError = (error) => {
        _logger(error);
        toastr.err('message', error);
    };

    const onUpdateSuccess = (response) => {
        _logger(response);
        toastr.success('message', response);
        window.location.reload(false);
    };
    const onUpdateError = (error) => {
        _logger(error);
        toastr.error(error);
    };
    const onHandleGoBackToSearchResults = () => {
        navigate('/searchorganizations', { state: groupData });
    };

    const onHandleUploadSuccess = (files) => {
        _logger('onHandleUploadSuccess', { files });

        setUploadFileData((prevState) => {
            let newUploadObject = { ...prevState };
            newUploadObject = files[0];
            return newUploadObject;
        });
    };
    const handleSubmit = (values) => {
        _logger(values, 'from handle submit');
        _logger(selectedOrgData, 'Does is have createdBy');
        let logoUrl = uploadFileData.url;
        if (!logoUrl) {
            logoUrl = selectedOrgData.logo;
        }
        const payload = {
            id: selectedOrgData.id,
            groupTypeId: values.groupTypeId,
            name: values.name,
            headline: values.headline,
            description: values.description,
            logo: logoUrl,
        };

        groupServices.updateGroup(payload.id, payload).then(onUpdateSuccess).catch(onUpdateError);
        _logger('update is firing');
    };

    const onDeleteJoinedGroupSuccess = (response) => {
        _logger(response, 'joinResponse');
        window.location.reload(false);
    };
    const onDeleteJoinedGroupError = (err) => {
        _logger(err);
    };
    const onJoinGroupSuccess = (response) => {
        _logger(response, 'joinResponse');
        window.location.reload(false);
    };
    const onJoinGroupError = (err) => {
        _logger(err);
    };

    const onJoinorUnjoinedClicked = () => {
        const payload = { groupId: count.groupId };
        const groupId = { groupId: groupData.id };

        if (count.groupId === 0) {
            groupServices.joinGroup(groupId).then(onJoinGroupSuccess).catch(onJoinGroupError);
        } else {
            groupServices
                .deleteJoinedGroup(payload.groupId)
                .then(onDeleteJoinedGroupSuccess)
                .catch(onDeleteJoinedGroupError);
        }
    };

    const mappedGroupTypes = groupTypes?.map(mapGroupType);

    const createdBy = selectedOrgData.createdById;
    const currentLogginInUser = currentUser.id;

    return (
        <React.Fragment>
            <div className="container">
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-secondary rounded-pill back-to-search-btn"
                        value="backToSearchResults"
                        onClick={onHandleGoBackToSearchResults}>
                        Back To Search Results
                    </button>
                </div>
                {createdBy === currentLogginInUser ? (
                    <div className="row mb-6 edit-pg-display group-update-font">
                        <div className="col col-lg-6">
                            <div className="row">
                                <div className="container">
                                    <div className="inline-display">
                                        <h1>{selectedOrgData?.name} </h1>
                                    </div>
                                    <div className="group-edit-joinmem-font mb-3">{count.totalCount + ' members'}</div>
                                    <div className="col">
                                        <button
                                            type="button"
                                            className="btn btn-secondary rounded-pill join-unjoin-btn join-unjoin-createdby"
                                            value="backToSearchResults"
                                            onClick={onJoinorUnjoinedClicked}>
                                            {count.groupId === 0 ? 'Join' : 'Withdraw'}
                                        </button>
                                    </div>
                                    <div className="mb-3 col">
                                        <h4>Headline</h4>
                                        <p>{selectedOrgData?.headline}</p>
                                    </div>
                                    <div className="mb-3">
                                        <h4>Description</h4>
                                        <p>{selectedOrgData?.description}</p>
                                    </div>
                                    <div>
                                        <h4>Group Type</h4>
                                        <p>{groupName.groupName}</p>
                                    </div>
                                </div>
                                <div className="col mb-3">
                                    <img src={selectedOrgData?.logo} height={200} width={200} alt="logoImage" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md ">
                            <h5 className="edit-form">Edit Selected Group</h5>
                            <h3 className="text-dark">{selectedOrgData?.name}</h3>
                            <div className="card bg-light border-success">
                                <div className="mt-2 mx-3">
                                    <Formik
                                        enableReinitialize={true}
                                        initialValues={selectedOrgData}
                                        onSubmit={handleSubmit}
                                        validationSchema={groupFormSchema}>
                                        <Form>
                                            <Row>
                                                <Col>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="name">Group Name</label>
                                                        <Field type="text" name="name" className="form-control" />
                                                        <ErrorMessage
                                                            name="name"
                                                            component="div"
                                                            className=".text-error"
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <label htmlFor="groupType">Select Group Type</label>
                                                    <Field as="select" name="groupTypeId" className="form-control">
                                                        <option value="">Select Group Type</option>
                                                        {mappedGroupTypes}
                                                    </Field>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div className="form-group mb-3">
                                                        <label htmlFor="Headline">Headline</label>
                                                        <Field type="text" name="headline" className="form-control" />
                                                        <ErrorMessage
                                                            name="headline"
                                                            component="div"
                                                            className=".text-error"
                                                        />
                                                    </div>
                                                </Col>
                                                <div className="form-group mb-4 container">
                                                    <label htmlFor="logoUrl">URL for logo</label>

                                                    <ErrorMessage name="logo" component="div" className="text-error" />
                                                    <Field
                                                        type="text"
                                                        name="logo"
                                                        className="form-control group-logo-edit-field "
                                                    />
                                                    <FileUploader
                                                        name="logo"
                                                        onHandleUploadSuccess={onHandleUploadSuccess}
                                                        isMultilple={true}
                                                    />
                                                    <div className="group-file-name-pos">{uploadFileData.name}</div>
                                                </div>
                                            </Row>
                                            <div className="form-group mb-3 mt-4">
                                                <label htmlFor="description">Description</label>
                                                <Field
                                                    component="textarea"
                                                    name="description"
                                                    className="form-control desc-field"
                                                    placeholder="Please Enter Your Group's Description"
                                                    type="text"
                                                />
                                                <ErrorMessage
                                                    name="description"
                                                    component="div"
                                                    className=".text-error"
                                                />
                                            </div>
                                            <div className="mb-3 mt-3">
                                                <Col className="col-auto left">
                                                    <button
                                                        type="submit"
                                                        className="btn  chat-send waves-effect waves-light update-submit-button"
                                                        onClick={handleSubmit}>
                                                        Submit
                                                    </button>
                                                </Col>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="row group-edit-not-createdby-font">
                        <div className="col">
                            <div className="container ">
                                <div className="col group-edit-not-createdby-logo mb-3">
                                    <img src={selectedOrgData?.logo} height={400} width={400} alt="logoImage" />
                                </div>
                            </div>
                            <div className="mb-2">
                                <h1>{selectedOrgData?.name}</h1>
                            </div>
                            <div className="group-edit-joinmem-font mb-3">{count.totalCount + ' members'}</div>
                            <div className="col">
                                <button
                                    type="button"
                                    className="btn btn-secondary rounded-pill join-unjoin-btn"
                                    value="backToSearchResults"
                                    onClick={onJoinorUnjoinedClicked}>
                                    {count.groupId === 0 ? 'Join' : 'Withdraw'}
                                </button>
                            </div>
                            <div className="mb-3 col">
                                <h4>Headline</h4>
                                <p>{selectedOrgData?.headline}</p>
                            </div>
                            <div className="mb-3">
                                <h4>Description</h4>
                                <p>{selectedOrgData?.description}</p>
                            </div>
                            <div>
                                <h4>Group Type</h4>
                                <p className="mb-5">{groupName.groupName}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
GroupEdit.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
    }),
};

export default GroupEdit;
