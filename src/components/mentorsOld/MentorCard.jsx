import React from 'react';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import './Mentor.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function MentorCard(props) {
    const _logger = debug.extend('MentorCard');

    const aMentor = props.mentor;

    _logger('aMentor', aMentor);

    const navigate = useNavigate();

    const onEditButtonClicked = () => {
        const mentorObj = aMentor;
        navigateToMentorForm(mentorObj);
    };

    const navigateToMentorForm = (receivedMentorObj) => {
        const resourceObjToSend = { type: 'EDIT_VIEW', payload: receivedMentorObj };
        navigate(`/mentorsform/${receivedMentorObj.id}`, {
            state: resourceObjToSend,
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
                props.onMentorClicked(props.mentor);
                Swal.fire('Deleted', '', 'success');
            } else {
                return;
            }
        });
    };

    const optionsWithClonOnOverlayclick = {
        closeOnOverlayClick: true,
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="card shadow col-md bg-body rounded mentorCard ">
                    <div className="card-body">
                        <h4>{aMentor.summary}</h4>
                        <p className="mb-1">{aMentor.description}</p>
                        <p className="mb-1">{aMentor.siteUrl}</p>
                        <p className="mb-1">{aMentor.phone}</p>
                        <button
                            type="button"
                            id="Edit"
                            data-page="Edit"
                            className="btn btn-secondary"
                            onClick={onEditButtonClicked}>
                            Edit
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => onDeleteButtonClicked(optionsWithClonOnOverlayclick)}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

MentorCard.propTypes = {
    mentor: PropTypes.shape({
        summary: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        siteUrl: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }),
    onMentorClicked: PropTypes.func,
};
export default React.memo(MentorCard);
