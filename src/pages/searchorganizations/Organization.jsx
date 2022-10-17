import React from 'react';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as groupServices from '../../services/groupService';
import Swal from 'sweetalert2';
import '../../components/groups/groups.css';
import { FaEdit, FaRegTrashAlt } from 'react-icons/fa';

const _logger = debug.extend('Organization');

function Organization(props) {
    const org = props.organization;
    const aOrgData = props.state;
    const currentUser = props.currentUser;
    _logger(org.createdById, 'createdById');

    const onHandleDeleteClicked = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                groupServices.deleteGroup(org.id, org.createdById).then(onDeleteSucess).catch(onDeleteError);
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    };

    const onDeleteSucess = (response) => {
        _logger(response, 'deleteResponse');
        window.location.reload(false);
    };
    const onDeleteError = (err) => {
        _logger(err);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `You're not authorized to delete this record!`,
            footer: err,
        });
    };

    const onJoinClicked = () => {
        const payload = { groupId: org.id };
        groupServices.joinGroup(payload).then(onJoinGroupSucess).catch(onJoinGroupError);
        _logger(org.id);
    };

    const onJoinGroupSucess = (response) => {
        _logger(response, 'joinResponse');
    };
    const onJoinGroupError = (err) => {
        _logger(err);
    };

    return (
        <React.Fragment>
            <Link to={`${org.id}`} state={aOrgData}>
                <Row>
                    <Col>
                        <div className="col mx-auto">
                            <h4 className=" font-purple"> {org.name}</h4>
                            <p className=" font-grey h4">Description: {org.description}</p>
                            <p className="font-grey h4">Category: {org.groupType.name}</p>
                            <div>
                                <button
                                    to={`${org.id}`}
                                    state={aOrgData}
                                    onClick={onJoinClicked}
                                    type="button"
                                    className="btn btn-secondary organization-card-btns group-join-button">
                                    Join
                                </button>{' '}
                            </div>
                        </div>
                    </Col>
                    <Col>
                        <img className="group-logo-shrink" src={org?.logo} height={200} width={200} alt="logo-Img" />
                    </Col>
                </Row>
            </Link>
            {org?.createdById === currentUser.id ? (
                <div className="mx-1">
                    <Link to={`${org.id}`} state={aOrgData} type="button">
                        <FaEdit className="group-edit-icon" />
                    </Link>
                    <button type="button" className="group-borderless-edit" onClick={onHandleDeleteClicked}>
                        <FaRegTrashAlt className="group-delete-button" />
                    </button>
                </div>
            ) : null}

            <div className="mb-3 organization-card-bottom-line ">
                <div>
                    <hr style={{ height: '1.5px', width: '100%' }} />
                </div>
            </div>
        </React.Fragment>
    );
}

Organization.propTypes = {
    organization: PropTypes.shape({
        id: PropTypes.number.isRequired,
        groupTypeId: PropTypes.number,
        name: PropTypes.string.isRequired,
        headline: PropTypes.string,
        description: PropTypes.string.isRequired,
        logo: PropTypes.string,
        createdById: PropTypes.number,
        createdDate: PropTypes.instanceOf,
        modifiedDate: PropTypes.instanceOf,
        groupType: PropTypes.string,
    }),
    state: PropTypes.shape({ id: PropTypes.number }),
    currentUser: PropTypes.shape({
        id: PropTypes.number,
    }),
};

export default Organization;
