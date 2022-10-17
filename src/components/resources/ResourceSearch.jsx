import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ResourceModal from './ResourceModal';
import './admin/resourcecard.css';

const SearchResource = (props) => {
    const aResource = props.resource;

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div className="col-md-3">
                <button className="btn card-border" onClick={() => setModalShow(true)}>
                    <div className="card">
                        <div className="card-body card-border">
                            <img className="card-img-top p-2" src={aResource.logo} alt=""></img>
                            <h4 className="card-title card-heading">{aResource.name}</h4>
                        </div>
                    </div>
                </button>
                <ResourceModal resource={aResource} show={modalShow} onHide={() => setModalShow(false)} />
            </div>
        </>
    );
};

SearchResource.propTypes = {
    resource: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
    }),
};

export default SearchResource;
