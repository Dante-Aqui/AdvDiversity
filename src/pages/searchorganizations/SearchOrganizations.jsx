import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import debug from 'sabio-debug';
import Organization from './Organization';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
import * as groupServices from '../../services/groupService';
import * as toastr from 'toastr';
import 'toastr/build/toastr.css';
import { Col, Row } from 'react-bootstrap';
import '../../components/groups/groups.css';
import PropTypes from 'prop-types';

const _logger = debug.extend('SearchOrganizations');

function SearchOrganizations(props) {
    const [buttons, setButtons] = useState();
    useEffect(() => {
        let payload = ['GroupTypes'];
        groupServices.getLookups(payload).then(onGetLookupSuccess).catch(onGetLookupError);
    }, []);

    const onGetLookupSuccess = (response) => {
        _logger('onGetLookupSuccess', response);
        setButtons((prevState) => {
            let pd = { ...prevState };
            pd = response.data.item.groupTypes;
            return pd;
        });
    };

    const onGetLookupError = (err) => {
        _logger('onSearchBlogCategoriesError', err);
    };

    const [groupType, setGroupType] = useState('showAll');
    const [groups, setGroups] = useState({
        arrayOfOrganizations: [],
        organizationComponents: [],
        page: { pageIndex: 0, pageSize: 0, totalCount: 0, totalPages: 0 },
    });

    const location = useLocation();
    const [mentorData] = useState(location.state);
    _logger(mentorData);

    const onHandleFilterButtonClick = (e) => {
        const gt_ = e.currentTarget.value;
        setGroupType(() => {
            return gt_;
        });
    };
    const onGetGroupByTypeSuccess = (data) => {
        let arrayOfGroups = data.item.pagedItems;
        setGroups((prevState) => {
            let pd = { ...prevState };
            pd.arrayOfOrganizations = arrayOfGroups;
            pd.organizationComponents = arrayOfGroups.map(mapOrganization);
            pd.page.pageIndex = data.item.pageIndex;
            pd.page.pageSize = data.item.pageSize;
            pd.page.totalCount = data.item.totalCount;
            pd.page.totalPages = data.item.totalPages;
            return pd;
        });
    };
    const onGetGroupByTypeError = (error) => {
        _logger(error);
        toastr.error('message', error);
    };

    const mapFilterButton = (button) => {
        return (
            <button
                type="button"
                className="btn btn-secondary rounded-pill m6 search-organizations-filter-btns"
                value={button.name}
                key={button.name}
                onClick={onHandleFilterButtonClick}>
                {button.name}
            </button>
        );
    };

    useEffect(() => {
        if (groupType !== 'showAll') {
            groupServices
                .getGroupByGroupTypePaginated(groupType, 0, 3)
                .then(onGetGroupByTypeSuccess)
                .catch(onGetGroupByTypeError);
        } else {
            groupServices.getAllGroupsPaginated(0, 3).then(onGetGroupSuccess).catch(onGetGroupError);
        }
    }, [groupType]);

    const onGetGroupSuccess = (data) => {
        let arrayOfGroups = data.item.pagedItems;
        setGroups((prevState) => {
            let pd = { ...prevState };
            pd.arrayOfOrganizations = arrayOfGroups;
            pd.organizationComponents = arrayOfGroups.map(mapOrganization);
            pd.page.pageIndex = data.item.pageIndex;
            pd.page.pageSize = data.item.pageSize;
            pd.page.totalCount = data.item.totalCount;
            pd.page.totalPages = data.item.totalPages;
            return pd;
        });
    };
    const onGetGroupError = (error) => {
        _logger(error);
        toastr.error(error);
    };

    function mapOrganization(organizationObj) {
        const aOrgData = { id: organizationObj.id };
        _logger(aOrgData, 'a org data');
        return (
            <React.Fragment>
                <Organization
                    key={'org1-' + organizationObj.id}
                    organization={organizationObj}
                    state={aOrgData}
                    {...props}
                />
            </React.Fragment>
        );
    }
    const onChange = (currentPage) => {
        if (groupType !== 'showAll') {
            groupServices
                .getGroupByGroupTypePaginated(groupType, currentPage - 1, groups.page.pageSize)
                .then(onGetGroupByTypeSuccess)
                .catch(onGetGroupByTypeError);
        } else {
            groupServices
                .getAllGroupsPaginated(currentPage - 1, groups.page.pageSize)
                .then(onGetGroupSuccess)
                .catch(onGetGroupError);
        }
    };
    const navigate = useNavigate();
    const onAddAGroupClicked = (e) => {
        e.preventDefault();
        navigate('/groups/new');
    };

    _logger(groups.arrayOfOrganizations, 'aoo');
    _logger(groups.organizationComponents, 'oc');

    return (
        <React.Fragment>
            <div className="m-3">
                <div className="card container ">
                    <Col>
                        <h1 className="mb-3 search-organizations-title">Our Current Partners</h1>
                    </Col>
                    <div className="inline-display mx-auto">
                        <div>
                            <button
                                type="button"
                                className="btn btn-secondary rounded-pill m6 search-organizations-filter-btns"
                                value="showAll"
                                key="showAll"
                                onClick={onHandleFilterButtonClick}>
                                Show All
                            </button>
                        </div>
                        <div>{buttons?.map(mapFilterButton)}</div>
                    </div>
                    <div className="container row mt-3 mb-4 margin-3-paginate">
                        <Pagination
                            onChange={onChange}
                            current={groups.page.pageIndex + 1}
                            total={groups.page.totalCount}
                            locale={locale}
                            pageSize={3}
                        />
                    </div>
                    <div className="container so-title">
                        <div className="col">{groups.organizationComponents}</div>
                    </div>

                    <div className="container mb-3">
                        <Row>
                            <Col>
                                <Pagination
                                    onChange={onChange}
                                    current={groups.page.pageIndex + 1}
                                    total={groups.page.totalCount}
                                    locale={locale}
                                    pageSize={3}
                                />
                            </Col>
                            <Col>
                                <button
                                    type="button"
                                    className=" btn btn-secondary sorganization-add-grp-btn"
                                    onClick={onAddAGroupClicked}>
                                    Add a group
                                </button>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

SearchOrganizations.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
    }),
};
export default SearchOrganizations;
