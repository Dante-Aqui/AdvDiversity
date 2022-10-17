import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import debug from 'sabio-debug';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import avatar1 from './users/avatar-1.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import Blogs from './Blogs';

const _logger = debug.extend('Blog');

function BlogPage() {
    const [blogData, setBlogData] = useState({
        blogTypeId: '',
        authorId: '',
        title: '',
        subject: '',
        content: '',
        isPublished: true,
        imageUrl: '',
    });

    const { state } = useLocation();
    _logger('state', { state });

    useEffect(() => {
        if (state && state?.type === 'BLOG_VIEW') {
            _logger('blog change firing');
            setBlogData(() => {
                let formData = state.payload;
                let viewBlogData = {
                    authorEmail: formData.authorEmail,
                    content: formData.content,
                    dateCreated: formData.dateCreated,
                    dateModified: formData.dateModified,
                    imageUrl: formData.imageUrl,
                    subject: formData.subject,
                    title: formData.title,
                };
                return viewBlogData;
            });
        }
    }, []);

    return (
        <div className="container-fluid">
            <Row className="Main-Artilce m-3 justify-content-center">
                <Col xxl={8} lg={6}>
                    <Card className="d-block center">
                        <Card.Body>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}>
                                <h1 className="text-align:center">{blogData.title}</h1>
                            </div>
                            <Card.Img variant="top" src={blogData.imageUrl} />
                            <h2>{blogData.subject}</h2>

                            <p className="text-muted mb-2">{blogData.content}</p>

                            <p className="text-muted mb-2">
                                With supporting text below as a natural lead-in to additional contenposuere erat a ante.
                                Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique?
                                Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo
                                rerum? Lorem ipsum dolor sit amet. Voluptates, illo, iste itaque voluptas corrupti
                                ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas
                                quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
                                supporting text below as a natural lead-in to additional contenposuere erat a ante. With
                                supporting text below as a natural lead-in to additional contenposuere erat a ante.
                                Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique?
                                Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo
                                rerum? Lorem ipsum dolor sit amet. Voluptates, illo, iste itaque voluptas corrupti
                                ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas
                                quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
                                supporting text below as a natural lead-in to additional contenposuere erat a ante.
                            </p>
                            <p className="text-muted mb-2">
                                With supporting text below as a natural lead-in to additional contenposuere erat a ante.
                                Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique?
                                Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo
                                rerum? Lorem ipsum dolor sit amet. Voluptates, illo, iste itaque voluptas corrupti
                                ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas
                                quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
                                supporting text below as a natural lead-in to additional contenposuere erat a ante.
                            </p>
                            <p className="text-muted mb-2">
                                With supporting text below as a natural lead-in to additional contenposuere erat a ante.
                                Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique?
                                Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo
                                rerum? Lorem ipsum dolor sit amet. Voluptates, illo, iste itaque voluptas corrupti
                                ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas
                                quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
                                supporting text below as a natural lead-in to additional contenposuere erat a ante.
                            </p>
                            <p className="text-muted mb-4">
                                With supporting text below as a natural lead-in to additional contenposuere erat a ante.
                                Voluptates, illo, iste itaque voluptas corrupti ratione reprehenderit magni similique?
                                Tempore, quos delectus asperiores libero voluptas quod perferendis! Voluptate, quod illo
                                rerum? Lorem ipsum dolor sit amet. Voluptates, illo, iste itaque voluptas corrupti
                                ratione reprehenderit magni similique? Tempore, quos delectus asperiores libero voluptas
                                quod perferendis! Voluptate, quod illo rerum? Lorem ipsum dolor sit amet. With
                                supporting text below as a natural lead-in to additional contenposuere erat a ante.
                            </p>
                            <div
                                className="container justify-content-center"
                                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Link to="/blogs" element={Blogs} className="btn btn-primary" style={{ margin: `5px` }}>
                                    Return to Blogs Page
                                </Link>
                            </div>
                            <Row>
                                <Col>
                                    <ul className="social-list list-inline mt-3 text-start">
                                        <h5>Author</h5>
                                        <img
                                            src={avatar1}
                                            className="rounded-circle img-thumbnail avatar-lg"
                                            alt="friend"
                                        />
                                        <li className="list-inline-item">
                                            <Link to="#" className="social-list-item border-primary text-primary">
                                                <FontAwesomeIcon icon={faFacebook} />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="social-list-item border-danger text-danger">
                                                <FontAwesomeIcon icon={faGoogle} />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="social-list-item border-info text-info">
                                                <FontAwesomeIcon icon={faTwitter} />
                                            </Link>
                                        </li>
                                        <li className="list-inline-item">
                                            <Link to="#" className="social-list-item border-secondary text-secondary">
                                                <FontAwesomeIcon icon={faGithub} />
                                            </Link>
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Comments />
                </Col>
            </Row>
        </div>
    );
}

export default BlogPage;
