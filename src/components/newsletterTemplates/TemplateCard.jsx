import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import Swal from 'sweetalert2';
import informationIcon from '../../assets/images/surveys/information.svg';
import editIcon from '../../assets/images/surveys/edit.svg';
import deleteIcon from '../../assets/images/surveys/delete.svg';

function TemplateCard(props) {
    const [modalShow, setModalShow] = useState(false);

    const _logger = debug.extend('TemplateCard');

    const aTemplate = props.template;

    _logger(aTemplate);

    const navigate = useNavigate();

    const onEditButtonClicked = () => {
        const templateObj = aTemplate;
        navigateToTemplateForm(templateObj);
    };

    const navigateToTemplateForm = (receivedTemplatesObj) => {
        const templateObjToSend = { type: 'EDIT_VIEW', payload: receivedTemplatesObj };
        navigate(`/newslettertemplates/${receivedTemplatesObj.id}`, {
            state: templateObjToSend,
        });
    };

    const onDeleteButtonClicked = async () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
        }).then((result) => {
            if (result.isConfirmed) {
                props.onTemplateClicked(props.template);
                Swal.fire('Deleted', '', 'success');
            } else {
                return;
            }
        });
    };

    const MoreInfoClicked = (props) => {
        return (
            <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Additional Information</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="container">
                        Name: {aTemplate.name}
                        <br />
                        Description: {aTemplate.description}
                        <br />
                        Primary Image: {aTemplate.primaryImage}
                        <br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const modalHandler = () => {
        setModalShow(!modalShow);
    };

    return (
        <div className="col-md-4">
            <div className="card h-100">
                <div className="shadow-lg card-body bg-white rounded" style={{ color: `slategray` }}>
                    <h4 className="card-title text-center">{aTemplate.name}</h4>
                    <img className="card-img-top p-3" src={aTemplate.primaryImage} alt=""></img>
                    <h4 className="card-title text-center">{aTemplate.description}</h4>
                    <div className="container">
                        <div className="text-center">
                            <button className="btn" onClick={onEditButtonClicked}>
                                <img src={editIcon} alt="edit icon" width="20" />
                            </button>
                            &nbsp;
                            <button className="btn" onClick={onDeleteButtonClicked}>
                                <img src={deleteIcon} alt="delete trash can" width="20"></img>
                            </button>
                            &nbsp;
                            <button className="btn" onClick={modalHandler}>
                                <img src={informationIcon} alt="info i" width="20"></img>
                            </button>
                            <MoreInfoClicked show={modalShow} onHide={modalHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

TemplateCard.propTypes = {
    template: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        primaryImage: PropTypes.string.isRequired,
    }),
    onTemplateClicked: PropTypes.func.isRequired,
    onHide: PropTypes.func,
};

export default React.memo(TemplateCard);
