import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import userProfileService from '../../services/userProfilesService';
import { Card, Pagination } from 'react-bootstrap';

import debug from 'sabio-debug';
const _logger = debug.extend('UserProfiles');

function UserProfiles() {
    const [pageData, setPageData] = useState({
        arrayOfProfiles: [],
        profileComponents: [],
        currentPage: 1, // for rendering the pagination
        pageIndex: 0, //for axios requests
        pageSize: 4,
        totalNumberOfProfiles: 0,
        numberOfPages: 0,
    });

    const mapProfiles = (aProfile) => {
        _logger('Profile from map', aProfile);
        return <UserProfile profile={aProfile} key={'ListA-' + aProfile.id} />;
    };

    const onPageChange = (page) => {
        _logger('Moving to page: ', page.target.innerText);
        let pageNumber = parseInt(page.target.innerText);
        if (page.target.innerText.includes('›')) {
            pageNumber = pageData.currentPage + 1;
        } else if (page.target.innerText.includes('‹')) {
            pageNumber = pageData.currentPage - 1;
        } else {
            pageNumber = parseInt(page.target.innerText);
        }

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.currentPage = pageNumber;
            pd.pageIndex = pageNumber - 1;
            return pd;
        });
    };

    const RoundedPagination = () => {
        let items = [];
        for (let number = 1; number <= pageData.numberOfPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === pageData.currentPage}>
                    {number}
                </Pagination.Item>
            );
        }
        return (
            <>
                <Card>
                    <Card.Body>
                        <Pagination className="pagination-rounded" onClick={onPageChange}>
                            {pageData.pageIndex > 0 ? <Pagination.Prev /> : null}
                            {items}
                            {pageData.pageIndex + 1 < pageData.numberOfPages ? <Pagination.Next /> : null}
                        </Pagination>
                    </Card.Body>
                </Card>
            </>
        );
    };

    useEffect(() => {
        userProfileService
            .getProfilesByPage(pageData.pageIndex, pageData.pageSize)
            .then(onGetAllProfilesSuccess)
            .catch(onGetAllProfilesError);
    }, [pageData.currentPage]);

    const onGetAllProfilesSuccess = (response) => {
        _logger('onGetAllProfileSuccess', response.data);
        let arrayOfProf = response.data.item.pagedItems;
        let numberOfP = response.data.item.totalPages;
        let numberOfProf = response.data.item.totalCount;
        let comp = arrayOfProf.map(mapProfiles);
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfProfiles = arrayOfProf;
            pd.numberOfPages = numberOfP;
            pd.totalNumberOfProfiles = numberOfProf;
            pd.profileComponents = comp;
            return pd;
        });
    };
    const onGetAllProfilesError = (err) => {
        _logger('onGetAllProfilesError', err);
    };

    return (
        <React.Fragment>
            <div className="row">{pageData.profileComponents}</div>
            <RoundedPagination />
        </React.Fragment>
    );
}
export default UserProfiles;
