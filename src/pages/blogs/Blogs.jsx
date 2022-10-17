import React, { useState, useEffect } from 'react';
import blogService from '../../services/blogService';
import BlogCard from './BlogCard';
import Pagination from 'rc-pagination';
import locale from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
import debug from 'sabio-debug';
import { Row, Col, ButtonGroup } from 'react-bootstrap';

const _logger = debug.extend('BlogsPage');
const _loggerBlogs = _logger.extend('Blogs');

function Blogs() {
    const [blogsData, setBlogsData] = useState({
        arrayOfBlogs: [],
        blogComponents: [],
        blogTypes: [],
        blogCategories: '',
        formData: 'Show All',
        page: { pageIndex: 0, pageSize: 0, totalCount: 0, totalPages: 0 },
    });

    const onSearchBlogsSuccess = (response) => {
        _logger('onSearchBlogsSuccess', response);

        setBlogsData((prevState) => {
            let pd = { ...prevState };
            pd.arrayOfBlogs = response.data.item.pagedItems;
            pd.blogComponents = response.data.item.pagedItems.map(mapBlogs);
            pd.page.totalCount = response.data.item.totalCount;
            pd.page.pageIndex = response.data.item.pageIndex;
            pd.page.pageSize = response.data.item.pageSize;
            pd.page.totalPages = response.data.item.totalPages;

            return pd;
        });
    };

    const onSearchBlogsError = (err) => {
        _logger('onSearchBlogsError', err);
    };

    const onSelectFormChange = (e) => {
        _loggerBlogs('onSelectFormChange', { syntheticEvent: e });
        const target = e.target;
        const value = target.value;
        _logger('value', value);

        setBlogsData((prevState) => {
            _logger('updater onChange');
            const newBlogObject = {
                ...prevState,
            };
            newBlogObject.formData = value;
            return newBlogObject;
        });
    };
    //#endregion

    //#region GetAll BlogTypes
    useEffect(() => {
        _logger('Rendered BlogTypes');
        let payload = ['BlogTypes'];
        blogService.getLookups(payload).then(onGetLookupSuccess).catch(onGetLookupError);
    }, []);

    const onGetLookupSuccess = (response) => {
        _loggerBlogs('onGetLookupSuccess', response);
        setBlogsData((prevState) => {
            let pd = { ...prevState };
            pd.blogTypes = response.data.item.blogTypes;
            return pd;
        });
    };

    const onGetLookupError = (err) => {
        _loggerBlogs('onSearchBlogCategoriesError', err);
    };

    const mapBlogTypes = (blogType) => {
        return (
            <option value={blogType.name} key={`blogType_${blogType.name}`}>
                {blogType.name}
            </option>
        );
    };
    //#endregion

    //#region GetAll Blogs
    useEffect(() => {
        _loggerBlogs('firing getBlogs');
        if (blogsData.formData !== 'Show All') {
            blogService.searchBlogs(blogsData.formData, 0, 3).then(onSearchBlogsSuccess).catch(onSearchBlogsError);
        } else {
            blogService.getBlogs(0, 3).then(onGetBlogsSuccess).catch(onGetBlogsError);
        }
    }, [blogsData.formData]);

    const onGetBlogsSuccess = (response) => {
        _loggerBlogs('onGetBlogsSuccess', response);
        setBlogsData((prevState) => {
            let pd = { ...prevState };
            pd.arrayOfBlogs = response.item.pagedItems;
            pd.blogComponents = response.item.pagedItems.map(mapBlogs);
            pd.page.totalCount = response.item.totalCount;
            pd.page.pageIndex = response.item.pageIndex;
            pd.page.pageSize = response.item.pageSize;
            pd.page.totalPages = response.item.totalPages;

            return pd;
        });
    };

    const onGetBlogsError = (err) => {
        _loggerBlogs('onGetBlogsError', err);
    };

    const mapBlogs = (aBlog) => {
        return <BlogCard aBlog={aBlog} key={'ListA-' + aBlog.id} />;
    };
    //#endregion

    //#region Pagination
    const onChange = (currentPage) => {
        _loggerBlogs('onChange', { syntheticEvent: currentPage });
        let target = currentPage;
        if (target > 0) {
            target--;
        }
        if (blogsData.formData !== 'Show All') {
            blogService
                .searchBlogs(blogsData.formData, target, blogsData.page.pageSize)
                .then(onSearchBlogsSuccess)
                .catch(onSearchBlogsError);
        } else {
            blogService.getBlogs(target, blogsData.page.pageSize).then(onGetBlogsSuccess).catch(onGetBlogsError);
        }
    };
    //#endregion
    return (
        <Row className="m-3">
            <Col>
                <div className="card container-fluid">
                    <div className="container">
                        <h1>Blogs</h1>
                        <div
                            className="container"
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <form>
                                <select
                                    className="blogTypeId p-1"
                                    value={blogsData.formData}
                                    onChange={onSelectFormChange}>
                                    <option>Show All</option>
                                    {blogsData.blogTypes.map(mapBlogTypes)}
                                </select>
                            </form>
                            <ButtonGroup>
                                <Pagination
                                    className="pagination justify-content-center"
                                    current={blogsData.page.pageIndex + 1}
                                    total={blogsData.page.totalCount}
                                    pageSize={3}
                                    onChange={onChange}
                                    locale={locale}></Pagination>
                            </ButtonGroup>
                        </div>
                        <Row className="my-3 mx-auto">
                            {blogsData.arrayOfBlogs.map((aBlog) => {
                                return (
                                    <Col className="my-2" md={6} xxl={4} key={`aBlogCard_${aBlog.id}`}>
                                        <BlogCard aBlog={aBlog} />
                                    </Col>
                                );
                            })}
                        </Row>
                        <div className="pagination justify-content-center">
                            <ButtonGroup>
                                <Pagination
                                    className="pagination justify-content-center"
                                    current={blogsData.page.pageIndex + 1}
                                    total={blogsData.page.totalCount}
                                    pageSize={3}
                                    onChange={onChange}
                                    locale={locale}></Pagination>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}

export default Blogs;
