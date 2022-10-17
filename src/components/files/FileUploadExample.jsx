import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import FileUploader from './FileUploader';

function FileUpload() {
    const _logger = debug.extend('Files');
    _logger('FileUpload');

    const defaultData = {
        fullName: '',
        bio: '',
        primaryImage: '',
    };

    const onHandleUploadSuccess = (data) => {
        _logger('onHandleUploadSuccess', { data });
    };

    const [formData, setFormData] = useState(defaultData);

    const onFormFieldChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setFormData((prevState) => {
            const newUserObject = { ...prevState };
            newUserObject[name] = value;
            return newUserObject;
        });
    };
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="user-container">
                                <div className="user-form col-sm-5">
                                    <div className="d-flex user-form-header p-3">
                                        <h4 className="me-2">User Profile</h4>
                                    </div>
                                    <div className="bg-light border rounded-3 p-3">
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="text" className="form-label">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="fullName"
                                                    name="fullName"
                                                    placeholder="Full Name"
                                                    value={formData.fullName}
                                                    onChange={onFormFieldChange}
                                                />
                                            </div>

                                            <br />

                                            <div className="form-group">
                                                <label htmlFor="text" className="form-label">
                                                    Bio
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="bio"
                                                    name="bio"
                                                    placeholder="add your friend bio here"
                                                    value={formData.bio}
                                                    onChange={onFormFieldChange}
                                                />
                                            </div>

                                            <br />

                                            <div className="form-group">
                                                <label htmlFor="url" className="form-label">
                                                    Primary Image
                                                </label>

                                                <FileUploader
                                                    onHandleUploadSuccess={onHandleUploadSuccess}
                                                    isMultilple={true}
                                                />
                                            </div>

                                            <br />

                                            <button
                                                type="submit"
                                                className="btn btn-primary me-2"
                                                id="submitFriendForm"
                                                data-page="/friends">
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default FileUpload;
