import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import avatar1 from './users/avatar-1.jpg';
import avatar2 from './users/avatar-2.jpg';
import avatar3 from './users/avatar-3.jpg';
import classNames from 'classnames';

function BlogCard(aBlog) {
    const navigate = useNavigate();
    const navigateToBlogPage = () => {
        const state = { type: 'BLOG_VIEW', payload: aBlog.aBlog };
        navigate(`/blogs/blogPage/${aBlog.aBlog.id}`, { state });
    };

    return (
        <Card className="d-block card h-100 border border-2 rounded">
            {aBlog.aBlog.imageUrl && (
                <>
                    <img className="card-img-top h-50 w-100" src={aBlog.aBlog.imageUrl} alt="" />
                    <div className="card-img-overlay  text-end">
                        <div className="badge bg-success">Published</div>
                    </div>
                </>
            )}
            <Card.Body className={aBlog.aBlog.imageUrl ? 'position-relative' : ''}>
                <h4 className="text-title mt-0">{aBlog.aBlog.title}</h4>
                {!aBlog.aBlog.imageUrl && (
                    <div
                        className={classNames('badge', {
                            'bg-success': 'Published',
                        })}>
                        {aBlog.aBlog.isPublished}
                    </div>
                )}

                {aBlog.aBlog.content && (
                    <p className="fst-italic fw-normal">
                        {aBlog.aBlog.content.slice(0, 150)}
                        <button
                            onClick={navigateToBlogPage}
                            type="button"
                            className="btn btn-link justify-content-md-end ">
                            ...Read More!
                        </button>
                    </p>
                )}
                <div>
                    <Link
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Mat Helme"
                        className="d-inline-block me-1">
                        <img src={avatar3} className="rounded-circle avatar-xs" alt="friend" />
                    </Link>
                    <Link
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="Michael Zenaty"
                        className="img-overlay d-inline-block me-1">
                        <img src={avatar1} className="rounded-circle avatar-xs" alt="friend" />
                    </Link>
                    <Link
                        to="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        data-original-title="James Anderson"
                        className="img-overlay d-inline-block">
                        <img src={avatar2} className="rounded-circle avatar-xs" alt="friend" />
                    </Link>
                </div>
                <p className="mb-1">
                    <span className="text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-comment-multiple-outline text-muted me-1"></i>
                        <b>19</b> Comments
                    </span>
                    <span className="btn btn-sm btn-link text-muted ps-0">
                        <i className="mdi mdi-heart text-end"></i>
                        <b>76</b> Likes
                    </span>
                </p>
            </Card.Body>
        </Card>
    );
}

export default React.memo(BlogCard);
