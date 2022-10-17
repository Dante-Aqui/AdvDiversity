import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MentorsApptsDatePicker from './MentorsApptsDatePicker';
import SimpleBar from 'simplebar-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../../../jobs/Loader';
import appointmentsService from '../../../../../services/appointmentsService';
import debug from 'sabio-debug';
import toastr from 'toastr';
import MentorApptCard from './MentorApptCard';
import { mentorsTableProptypes } from '../proptypes/mentorsAnalyticsPropTypes';

const _loggerMentorsAppts = debug.extend('MentorsAppts');
const today = new Date();
const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);

const MentorsAppts = (props) => {
    const [pageData, setPageData] = useState({
        dateRange: {
            startDate: today.toISOString().split('T')[0],
            endDate: nextMonth.toISOString().split('T')[0],
        },
        apptsCards: [],
        apptsArray: [],
        totalCount: 0,
        current: 1,
        pageIndex: 0,
        pageSize: 5,
        hasMore: true,
        mentors: [],
    });

    useEffect(() => {
        if (pageData !== undefined) {
            appointmentsService
                .getApptsByDate(
                    pageData.pageIndex,
                    pageData.pageSize,
                    pageData.dateRange.startDate,
                    pageData.dateRange.endDate
                )
                .then(onGetEventsByDateSuccessful)
                .catch(onGetEventsByDateError);
        }
    }, [pageData.pageIndex, pageData.dateRange]);

    useEffect(() => {
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.apptsArray.sort((a, b) => new Date(a.apptDateTime) - new Date(b.apptDateTime));
            pd.apptsCards = pd.apptsArray.map(mapToApptCard);
            return pd;
        });
    }, [props, pageData.apptsArray]);

    const onGetEventsByDateSuccessful = (response) => {
        _loggerMentorsAppts(response);
        const appts = response.item.pagedItems;
        const total = response.item.totalCount;
        const hasNextPage = response.item.hasNextPage;

        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.apptsArray = [...pd.apptsArray, ...appts];
            pd.totalCount = total;
            pd.hasMore = hasNextPage;
            pd.mentors = props.mentorsInfo;
            return pd;
        });
    };

    const onGetEventsByDateError = (error) => {
        toastr.error(error, 'Oops, something went wrong.');
    };

    const mapToApptCard = (appt) => {
        const mentors = props.mentorsInfo;
        let mentor = { name: '', src: '' };
        let mentee = {};
        const foundMentor = mentors?.find((mentor) => mentor.userId === appt.mentorId);

        if (foundMentor !== undefined) {
            mentor = foundMentor;
            mentor.src = mentor?.avatarPicture;
            mentor.name = `${mentor?.firstName} ${mentor?.lastName}`;
            mentor?.mentees.find((mentee) => mentee.userId === appt.menteeId);
        }

        return <MentorApptCard key={appt.id} appointment={{ ...appt, mentor: mentor, mentee: mentee }} />;
    };

    const onPageChange = () => {
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.pageIndex = pd.pageIndex + 1;
            return pd;
        });
    };

    const searchByDateRange = (dateRange) => {
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.pageIndex = 0;
            pd.hasMore = true;
            pd.apptsArray = [];
            pd.apptsCards = [];
            pd.dateRange = dateRange;

            return pd;
        });
    };

    return (
        <Row className="d-flex flex-column">
            <Col className="mb-3">
                <MentorsApptsDatePicker searchByDateRange={searchByDateRange} dateRange={pageData.dateRange} />
            </Col>
            <Col className="simplebar-content-wrapper">
                <SimpleBar
                    scrollableNodeProps={{ id: 'scrollableDiv' }}
                    className="card-body py-0"
                    style={{ maxHeight: '66vh', minHeight: '66vh' }}>
                    <InfiniteScroll
                        dataLength={pageData?.apptsArray.length}
                        next={onPageChange}
                        hasMore={pageData?.hasMore}
                        loader={<Loader />}
                        scrollableTarget="scrollableDiv"
                        className="p-1"
                        endMessage={<p className="m-1">Oh no! There are no more appointments.</p>}>
                        {pageData?.apptsCards}
                    </InfiniteScroll>
                </SimpleBar>
            </Col>
        </Row>
    );
};

MentorsAppts.propTypes = mentorsTableProptypes;

export default React.memo(MentorsAppts);
