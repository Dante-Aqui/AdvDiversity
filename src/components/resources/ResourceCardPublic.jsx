import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './admin/resourcecard.css';

import ResourceModal from './ResourceModal';

function ResourceCard(props) {
    const aResource = props.resource;

    const [modalShow, setModalShow] = useState(false);

    return (
        <div className="col-md-3">
            <button className="btn  card-border" onClick={() => setModalShow(true)}>
                <div className="card">
                    <div className="card-body">
                        <img className="card-img-top p-1" src={aResource.logo} alt=""></img>
                    </div>
                    <div className="m-2">
                        <h4 className="card-title card-heading">{aResource.name}</h4>
                    </div>
                </div>
            </button>
            <ResourceModal show={modalShow} resource={aResource} onHide={() => setModalShow(false)}></ResourceModal>
        </div>
    );
}

ResourceCard.propTypes = {
    resource: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    }),
};

export default React.memo(ResourceCard);
