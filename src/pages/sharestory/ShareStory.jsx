import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import debug from 'sabio-debug';
import './sharestory.css';
import shareStorySchema from '../../schema/shareStorySchema';
import * as shareStoryService from '../../services/shareStoryService';
import FileUploader from '../../components/files/FileUploader';
import toastr from 'toastr';

const _logger = debug.extend('sharestory');

function ShareStory() {
    const [shareStoryData, setShareStoryData] = useState({
        name: '',
        email: '',
        story: '',
    });

    function handleSubmit(values) {
        _logger('ShareStoryService Request', values);
        shareStoryService.addShareStory(values).then(onAddStorySuccess).catch(onAddStoryError);
    }
    const onAddStorySuccess = (response) => {
        _logger('Story Successfully Created!', response);
        toastr.success('Story Successfully Created!');
    };
    const onAddStoryError = (error) => {
        _logger('Error! Story Not Uploaded!', error);
        toastr.error('Error! Story Not Uploaded!');
    };
    const onFileUploadSuccess = (response) => {
        setShareStoryData((prevState) => {
            const newStoryData = { ...prevState };
            newStoryData[shareStoryData] = response[0].url;
            return newStoryData;
        });
        _logger('File Successfully Uploaded!', response);
        toastr.success('File Successfully Uploaded!');
    };

    return (
        <React.Fragment>
            <div className="story-background-img">
                <div className="story-img-header">Share Your Story</div>
            </div>
            <Formik
                enableReinitialize={true}
                initialValues={shareStoryData}
                onSubmit={handleSubmit}
                validationSchema={shareStorySchema}>
                <Form>
                    <div
                        className="container"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="col-md-8 col-md-offset-8">
                            <div className="story-card-styling bg-light border-success">
                                <h1 className="text-center story-form-header-font"> SHARE YOUR MENTORING STORY:</h1>
                                <h3 className="text-center story-form-body-font">
                                    Share your story and inspire others to mentor by telling us about how a mentor has
                                    impacted you or about your experience mentoring a young person.
                                </h3>
                                <div className="form-group story-form-label-font mt-3 mx-3">
                                    <label htmlFor="name">Name:</label>
                                    <Field type="text" name="name" className="form-control story-form-input-font" />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </div>
                                <div className="form-group story-form-label-font mt-3 mx-3">
                                    <label htmlFor="email">Email:</label>
                                    <Field type="email" name="email" className="form-control story-form-input-font" />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>
                                <div className="form-group story-form-label-font mt-3 mx-3">
                                    <label htmlFor="story">Type your story in the box here:</label>
                                    <Field
                                        component="textarea"
                                        name="story"
                                        rows="5"
                                        className="form-control story-form-input-font"
                                    />
                                    <ErrorMessage name="story" component="div" className="text-danger" />
                                </div>
                                <div className="form-group story-form-label-font mt-3 mx-3">
                                    <label htmlFor="text">Upload a file here:</label>
                                    <FileUploader onHandleUploadSuccess={onFileUploadSuccess} isMultiple={true} />
                                </div>
                                <button type="submit" className="btn btn-dark mt-2 mx-3">
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </React.Fragment>
    );
}
export default ShareStory;
