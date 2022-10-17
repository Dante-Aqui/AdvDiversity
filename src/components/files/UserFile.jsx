import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import fileService from '../../services/fileService.js';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import '../../assets/scss/custom/pages/_files.scss';
import 'rc-pagination/assets/index.css';
import '../../assets/scss/custom/pages/_files.scss';

function UserFile() {
    const _logger = debug.extend('UserFile');

    const [pageData, setPageData] = useState({
        arrFile: [],
        fileComponents: [],
        currentPage: 1,
        pageIndex: 0,
        total: 0,
        pageSize: 4,
    });

    const getFileForRender = (pageIndex, pageSize) => {
        fileService.getByCreatedBy(pageIndex, pageSize).then(onGetByCreatedBySuccess).catch(onGetByCreatedByError);
    };

    const onGetByCreatedBySuccess = (response) => {
        _logger('onGetByCreatedBySuccess', { response });
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrFile = [...response.item.pagedItems];
            pd.total = response.item.totalCount;
            pd.fileComponents = pd.arrFile.map(mapFiles);
            return pd;
        });
    };

    const onGetByCreatedByError = (error) => {
        _logger('onGetByCreatedByError', { error });
    };

    useEffect(() => {
        _logger('useEffect', { pageData });
        getFileForRender(pageData.pageIndex, pageData.pageSize);
    }, [pageData.currentPage]);

    const onPageChange = (page) => {
        _logger('onPageChange', { page });
        setPageData((prevState) => {
            const cp = { ...prevState };
            cp.currentPage = page;
            cp.pageIndex = page - 1;
            return cp;
        });
    };

    function deleteFile(fileId){
        _logger('deleteFile', { fileId });
        fileService.deleteById(fileId).then(onDeleteFileSuccess).catch(onDeleteFileError);
    };

    const onDeleteFileSuccess = (fileIdToBeDeleted) => {
        _logger('onDeleteFileSuccess', { fileIdToBeDeleted });
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrFile = [...pd.arrFile];

            const index = pd.arrFile.findIndex((f) => f.id === fileIdToBeDeleted);
            if (index >= 0) {
                pd.arrFile.splice(index, 1);
                pd.fileComponents = pd.arrFile.map(mapFiles);
            }
            return pd;
        });
    };

    const onDeleteFileError = (error) => {
        _logger('onDeleteFileError', { error });
    };

    const mapFiles = (file) => {
        return (
            <Card className="mt-1 mb-0 shadow-none border" key={file.url}>
            <div className="p-2">
                <Row className="align-items-center">
                    <Col className="col-auto">
                        <img
                            data-dz-thumbnail=""
                            className="avatar-sm rounded bg-light"
                            alt={'File'}
                            src={'https://bit.ly/3yLtHwR'}
                        />
                    </Col>

                    <Col className="ps-0">
                        <h3 to="#" className="text-muted fw-bold">
                            {file.name}
                        </h3>
                    </Col>
                    <Col className="text-end">
                        <button
                            className="btn btn-outline-warning file-upload-btn"
                            style={{ marginLeft: '13px' }}
                            type="submit"
                            id="removeFile"
                            onClick={()=>{deleteFile(file.id)}}>
                            Remove
                        </button>
                    </Col>
                </Row>
            </div>
            </Card>
        );
    };

    return (
        <>
            <div className="files-container">
                <div className="files-list p-2">
                    <div className="bg-light border rounded-3">
                        <h1 className="me-2" style={{ textAlign: 'center' }}>
                            User Files
                        </h1>
                        <div className="row p-4">
                            {pageData.fileComponents}
                            <div style={{ textAlign: 'center' }}>
                                <Pagination
                                    style={{ marginTop: '13px' }}
                                    total={pageData.total}
                                    pageSize={pageData.pageSize}
                                    onChange={onPageChange}
                                    current={pageData.currentPage}
                                    locale={locale}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserFile;
