import React from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import PropTypes from 'prop-types';
import worldMapData from './worldMapData';
import './usersmap.css';

const UsersMap = (props) => {
    return (
        <div className="mapWrapper">
            <VectorMap {...worldMapData} checkedLayers={[...props.countries]} />
        </div>
    );
};

UsersMap.propTypes = {
    countries: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default React.memo(UsersMap);
