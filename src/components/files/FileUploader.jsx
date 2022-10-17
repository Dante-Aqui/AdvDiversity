import React from 'react';
import propTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import debug from 'sabio-debug';
import fileService from '../../services/fileService.js';
import * as toastr from 'toastr';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import 'toastr/build/toastr.css';

function FileUploader(props) {
    const _logger = debug.extend('FileUploader');

    const handleAcceptedFiles = (files) => {
        _logger('handleAcceptedFiles', { files });

        const formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file);
        });

        fileService.uploadFile(formData).then(onUploadSuccess).catch(onUploadError);
    };

    const onUploadSuccess = (response) => {
        _logger('onUploadSuccess', { response });
        props.onHandleUploadSuccess(response.item);
    };

    const onUploadError = (error) => {
        _logger('onUploadError', { error });
        toastr['error']('Failed to upload file.');
    };

    return (
        <>
            <Dropzone onDrop={(acceptedFiles) => handleAcceptedFiles(acceptedFiles)} multiple={props.isMultilple}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropzone">
                        <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <AiOutlineCloudUpload size={30} />
                            <h5>Drop {props.isMultilple ? 'files' : 'file'} here</h5>
                        </div>
                    </div>
                )}
            </Dropzone>
        </>
    );
}

FileUploader.propTypes = {
    onHandleUploadSuccess: propTypes.func,
    isMultilple: propTypes.bool,
};

export default FileUploader;
