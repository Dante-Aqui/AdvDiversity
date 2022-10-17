import React from 'react';
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import CreateFaq from './CreateFaq';
import PropTypes from 'prop-types';
import * as faqsServices from '../../../services/faqsServices';
import debug from 'sabio-debug';

const _logger = debug.extend('EditModal');

const EditModal = (props) => {
    const faqId = useState(props.id);
    const [openEditModal, setOpenEditModal] = props.isShown;
    const [selectedFaq, setSelectedFaq] = useState();

    useEffect(() => {
        faqsServices.getFaqById(faqId).then(onGetFaqByIdSuccess).catch(onGetFaqByIdError);
    });
    const onGetFaqByIdSuccess = (response) => {
        // _logger('onGetFaqById Success...', response.item);
        setSelectedFaq(response.item);
    };
    const onGetFaqByIdError = (error) => {
        _logger('OnGetFaqById Error...', error);
    };

    const hideModal = () => {
        setOpenEditModal(false);
        window.location.reload();
    };

    return (
        <React.Fragment>
            <Modal show={openEditModal} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{faqId ? `Edit FAQ #${faqId}` : 'Add a FAQ'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateFaq selectedFaq_={selectedFaq} />
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default EditModal;

EditModal.propTypes = {
    id: PropTypes.string.isRequired,
    isShown: PropTypes.bool.isRequired,
};
