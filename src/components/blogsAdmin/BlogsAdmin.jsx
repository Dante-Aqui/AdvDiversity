import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import debug from 'sabio-debug';
import blogAdminService from '../../services/blgAdminService';
import './BlogsAdmin.css';
import FileUploader from '../files/FileUploader';
import { Card } from 'react-bootstrap';
import toastr from 'toastr';

const _logger = debug.extend('addBlog');
function AddBlog() {
    const [blogsData, setBlogsData] = useState({
        BlogTypeId: '',
        Title: '',
        Subject: '',
        Content: '',
        IsPublished: '',
        ImageUrl: '',
    });
    const handleSubmit = (blogsData) => {
        _logger(blogsData);
        const blogsJson = JSON.stringify(blogsData);
        const blogsCopy = JSON.parse(blogsJson);
        blogsCopy.BlogTypeId = Number(blogsCopy.BlogTypeId);
        blogsCopy.IsPublished = blogsCopy.IsPublished ? true : false;
        _logger(blogsCopy);
        blogAdminService.addBlog(blogsCopy).then(addBlogSuccess).catch(addBlogError);
    };
    const addBlogSuccess = (response) => {
        _logger(response);
        toastr.success('Blog Created');
    };
    const addBlogError = (error) => {
        _logger(error);
        toastr.error('Error, Blog not created');
    };
    const onFileUploadSuccess = (response) => {
        setBlogsData((prevState) => {
            const newBlogData = { ...prevState };
            newBlogData['ImageUrl'] = response[0].url;
            return newBlogData;
        });
        _logger('File upload success response', response);
    };
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                </div>
                <Formik enableReinitialize={true} initialValues={blogsData} onSubmit={handleSubmit}>
                    <Form>
                        <Card className="form-title-card">
                            <Card.Body>
                                <h1> Add A Blog </h1>
                            </Card.Body>
                        </Card>
                        <Card className="blogAdminCard">
                            <div className="form-group ">
                                <label htmlFor="BlogTypeId">BlogType</label>
                                <Field className="form-control" name="BlogTypeId" component="select">
                                    <option value="">Please Select Blog</option>
                                    <option value="1">Career</option>
                                    <option value="2">Education</option>
                                    <option value="3">Management</option>
                                    <option value="4">Motivation</option>
                                    <option value="5">Leadership</option>
                                </Field>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Title">Title </label>
                                <Field className="form-control" type="text" name="Title" />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="Subject">Subject </label>
                                <Field className="form-control" type="text" name="Subject" />
                            </div>
                            <div className="form-group ">
                                <label htmlFor="Content">Content </label>
                                <Field className="form-control" rows={2} as="textarea" name="Content" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="IsPublished">IsPublished</label>
                                <Field className="form-control" type="text" name="IsPublished" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ImageUrl">ImageUrl</label>
                                <FileUploader onHandleUploadSuccess={onFileUploadSuccess} isMultilple={true} />
                            </div>
                        </Card>
                        <button type="submit" className="btn btn-primary submitbtn">
                            Submit
                        </button>
                    </Form>
                </Formik>
            </div>
        </React.Fragment>
    );
}

export default AddBlog;
