import React from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import * as faqsServices from '../../../services/faqsServices';
import debug from 'sabio-debug';
import CreateFaq from './CreateFaq';

const _logger = debug.extend('AllFaqs');

const AllFaqs = () => {
    const [allArrayOfFaqs, setAllarrayOfFaqs] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState();
    const [owner, setOwner] = useState();

    const mapFaqs = (ques, index) => {
        return (
            <Row key={'key_' + index}>
                <Col>
                    <div className="container grid">
                        <ul className="list-group">
                            <h5>{ques.question}</h5>
                            {ques.answer}
                            <div className="mb-2 mt-2">
                                <Button
                                    className="btn btn-info btn-sm"
                                    id={ques.id}
                                    onClick={handleModifyButtonClicked}>
                                    Edit
                                </Button>
                                <Button
                                    className="btn-danger btn-sm mx-2"
                                    onClick={handleShowDeleteConfirmation}
                                    id={ques.id}>
                                    Delete
                                </Button>
                            </div>
                        </ul>
                    </div>
                </Col>
                <div>
                    <hr
                        style={{
                            height: '1.5px',
                            width: '100%',
                        }}
                    />
                </div>
            </Row>
        );
    };

    const handleModifyButtonClicked = (e) => {
        e.preventDefault();
        const id = e.target.id;
        setOwner(e.target.id);
        _logger('Edit Modal activated...', e.target.id);
        setEditModalOpen(true);

        faqsServices.getFaqById(id).then(onGetFaqByIdSuccess).catch(onGetFaqByIdError);
    };
    const onGetFaqByIdSuccess = (response) => {
        _logger('onGetFaqById Success...', response.item);
        setSelectedFaq(response.item);
    };
    const onGetFaqByIdError = (error) => {
        _logger('OnGetFaqById Error...', error);
    };

    useEffect(() => {
        faqsServices.getFaqs().then(onSuccess).catch(onError);
    }, []);

    const onSuccess = (data) => {
        _logger('this is firing ', data.item);
        let newFaqs = data.item;
        _logger('arrayOfFaqs is firing ', newFaqs);

        setAllarrayOfFaqs(newFaqs);
    };

    const onError = (err) => {
        _logger('Get All Faqs Error...', err);
    };

    const handleShowDeleteConfirmation = (e) => {
        _logger('delete clicked...', e.target);
        setOwner(e.target.id);
        setModalOpen(() => {
            return true;
        });
    };
    const closeModal = (event) => {
        _logger('closeModal is firing...', event);

        setModalOpen(false);
        setEditModalOpen(false);
        faqsServices.getFaqs().then(onSuccess).catch(onError);
    };

    const hideModal = () => {
        setModalOpen(false);
        setEditModalOpen(false);
    };
    const onModalConfirmClicked = (e) => {
        e.preventDefault();
        _logger(owner);

        faqsServices.deleteFaqById(owner).then(onDeleteSuccess).catch(onDeleteError);
    };
    const onDeleteSuccess = (response) => {
        _logger('On Delete Success: ', response);
        closeModal();
    };
    const onDeleteError = (error) => {
        _logger('Delete Error: ', error);
    };

    const onHandleAddFaqClicked = (e) => {
        e.preventDefault();
        _logger(e.target.id);
        setEditModalOpen(true);
    };

    return (
        <React.Fragment>
            <Modal show={editModalOpen} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{owner ? `Edit FAQ #${owner}` : 'Add a FAQ'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreateFaq selectedFaq_={selectedFaq} editModalState={closeModal} />
                </Modal.Body>
            </Modal>

            <Modal show={modalOpen} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion Question {owner}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button className="btn-secondary btn-sm" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button className="btn-danger btn-sm" onClick={onModalConfirmClicked}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            <div>
                <Col className="text-center">
                    <Button className="btn btn-success btn-sm mt-2" onClick={onHandleAddFaqClicked} id="addFaq">
                        Add a new FAQ
                    </Button>
                </Col>
                <Row>{allArrayOfFaqs?.map(mapFaqs)}</Row>
            </div>
        </React.Fragment>
    );
};

export default AllFaqs;
