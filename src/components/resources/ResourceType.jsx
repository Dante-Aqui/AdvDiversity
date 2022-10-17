import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as resourceService from '../../services/resourceService';
import ResourceSearch from './ResourceSearch';

const ResourceType = () => {
    const resourceTypeId = useParams();

    const [resources, setResources] = useState({
        arrOfResources: [],
        resourcesComponent: [],
    });

    const [resourceType, setResourceType] = useState({
        arrOfResourceType: [],
        resourceTypeComponent: [],
    });

    useEffect(() => {
        resourceService
            .getResourcesByTypeId(resourceTypeId.resourcetypeId)
            .then(onGetResourcesSuccess)
            .catch(onGetResourcesError);

        resourceService.getResourceType().then(onGetResourceTypeSuccess).catch(onGetResourceTypeError);
    }, []);

    const mapResources = (resource) => {
        return <ResourceSearch key={resource.id} resource={resource}></ResourceSearch>;
    };

    const mapResourceTypes = (resourceType) => {
        return (
            <button className="btn" onClick={getResourcesOnClick} key={resourceType.id}>
                <h5 id={resourceType.id}>{resourceType.name}</h5>
            </button>
        );
    };

    const getResourcesOnClick = (event) => {
        const resId = event.target.id;
        resourceService.getResourcesByTypeId(resId).then(onGetResourcesSuccess).catch(onGetResourcesError);
    };

    const onGetResourcesSuccess = (response) => {
        let resourceItems = response.data.items;

        setResources((prevState) => {
            const pd = { ...prevState };
            pd.arrOfResources = resourceItems;
            pd.resourcesComponent = resourceItems.map(mapResources);

            return pd;
        });
    };

    const onGetResourcesError = () => {};

    const onGetResourceTypeSuccess = (response) => {
        let resourceTypes = response.data.items;

        setResourceType((prevState) => {
            let pd = { ...prevState };
            pd.arrOfResourceType = resourceTypes;
            pd.resourceTypeComponent = resourceTypes.map(mapResourceTypes);

            return pd;
        });
    };
    const onGetResourceTypeError = () => {};

    return (
        <>
            <div className="container">
                <div className="row">{resourceType.resourceTypeComponent}</div>
                <div className="row" style={{ padding: `10px` }}>
                    {resources.resourcesComponent}
                </div>
            </div>
        </>
    );
};

export default ResourceType;
