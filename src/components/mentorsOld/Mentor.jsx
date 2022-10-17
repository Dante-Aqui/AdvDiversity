import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Pagination } from 'react-bootstrap';
import MentorCard from './MentorCard';
import debug from 'sabio-debug';
import toastr from 'toastr';
import mentorService from '../services/mentorService';
import locale from 'rc-pagination/lib/locale/en_US';
import { Link } from 'react-router-dom';
import MentorsForm from '../components/mentors/MentorsForm';

function Mentors() {
    const _logger = debug.extend('Mentors');

    const [mentorData, setMentorData] = useState({
        arrayOfMentors: [],
        mentorComponents: [],
    });

    const [pageIndex, updatePageIndex] = useState(0);
    const [pageSize] = useState(8);
    const [totalPages, updateTotalPages] = useState(0);
    const [currentActualPage, updateCurrentActualPage] = useState(1);

    useEffect(() => {
        _logger('firing useEffect for getMentors');
        mentorService.getMentors(pageIndex, pageSize).then(onGetMentorsSuccess).catch(onGetMentorsError);
    }, []);

    const onGetMentorsSuccess = (response) => {
        _logger('onGetMentorsSuccess', response);
        let returnedArray = response.item.pagedItems;

        setMentorData((prevState) => {
            const md = { ...prevState };
            md.arrayOfmentors = returnedArray;
            md.mentorComponents = returnedArray.map(mapMentors);
            updateTotalPages(() => {
                return response.item.totalCount;
            });
            return md;
        });
        return response;
    };
    const onGetMentorsError = (err) => {
        _logger(err);
        toastr.error('Failed To get Mentor');
    };

    const mapMentors = (aMentor) => {
        return <MentorCard mentor={aMentor} key={aMentor.id} onMentorClicked={onDeleteRequested} />;
    };

    const onDeleteRequested = useCallback((myMentor, eObj) => {
        _logger(myMentor.id, { myMentor, eObj });

        const handler = getDeleteSuccessHandler(myMentor.id);

        mentorService.deleteMentor(myMentor.id).then(handler).catch(onDeleteError);
    }, []);

    const getDeleteSuccessHandler = (idToBeDeleted) => {
        return () => {
            setMentorData((prevState) => {
                const md = { ...prevState };
                md.arrayOfMentors = [...md.arrayOfMentors];

                const indOf = md.arrayOfMentors.findIndex((person) => {
                    let result = false;

                    if (person.id === idToBeDeleted) {
                        result = true;
                    }

                    return result;
                });

                if (indOf >= 0) {
                    md.arrayOfMentors.splice(indOf, 1);
                    md.mentorComponents = md.arrayOfMentors.map(mapMentors);
                }

                return md;
            });
        };
    };

    const onDeleteError = (error) => {
        _logger(error);
        toastr.error('Failed To delete Mentor');
    };

    const onChange = (e) => {
        _logger('onChange Firing', { syntheticEvent: e });
        let target = e;
        if (target > 0) {
            target--;
        }
        updatePageIndex(() => {
            const currentPageIndex = target;
            return currentPageIndex;
        });
        updateCurrentActualPage(() => {
            const paginatePage = e;
            return paginatePage;
        });

        mentorService.getMentors(target, pageSize).then(onGetMentorsSuccess).catch(onGetMentorsError);
    };

    return (
        <Row className="m-3">
            <Col>
                <div className="card container-fluid">
                    <div className="container">
                        <h2>Mentors</h2>
                        <div
                            className="container"
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Link
                                to="/mentorsform/new"
                                element={<MentorsForm></MentorsForm>}
                                className="btn btn-primary"
                                style={{ margin: `5px` }}>
                                +
                            </Link>
                            <Pagination
                                current={currentActualPage}
                                total={totalPages}
                                pageSize={pageSize}
                                onChange={onChange}
                                locale={locale}></Pagination>
                        </div>
                        <div className="container">
                            <div className="row" style={{ padding: `10px` }}>
                                {mentorData.mentorComponents}
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
export default Mentors;
