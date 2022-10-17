import React, { useState, useEffect, useCallback } from 'react';
import { Card, Col, Form } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import MentorRow from './MentorRow';
import debug from 'sabio-debug';
import { mentorsTableProptypes } from '../proptypes/mentorsAnalyticsPropTypes';
import debounce from 'lodash.debounce';

const _loggerMentorsTable = debug.extend('MentorsTable');

const MentorsTable = (props) => {
    const [mentors, setMentors] = useState({
        info: [],
        rows: [],
    });

    useEffect(() => {
        setMentors((prevState) => {
            const m = { ...prevState };
            m.info = props.mentorsInfo;
            m.rows = m.info.map(mapToRow);
            _loggerMentorsTable(m);
            return m;
        });
    }, []);

    const mapToRow = (mentor) => {
        return <MentorRow key={mentor.id} mentorInfo={mentor} />;
    };

    const filterMentors = (e) => {
        const { value } = e.target;
        _loggerMentorsTable(value);

        setMentors((prevState) => {
            const m = { ...prevState };
            let filteredInfo = props.mentorsInfo.filter((mentor) => {
                let result = false;
                let name = `${mentor.firstName} ${mentor.lastName}`.toLowerCase();
                if (name.includes(value.toLowerCase())) {
                    result = true;
                }
                return result;
            });
            m.rows = filteredInfo.map(mapToRow);
            return m;
        });
    };

    const debouncedChangeHandler = useCallback(debounce(filterMentors, 300), []);

    return (
        <Card className="h-100">
            <Card.Body className="h-100 d-flex flex-column">
                <Col className="justify-content-end">
                    <Form className="w-50">
                        <div>
                            <label htmlFor="searchByName text-end">{`Search by name`}</label>
                            <input
                                onChange={debouncedChangeHandler}
                                type="text"
                                name="searchByName"
                                className="form-control"
                                placeholder="Mentor's name"
                            />
                        </div>
                    </Form>
                </Col>
                <Col>
                    <SimpleBar
                        scrollableNodeProps={{ id: 'scrollableDiv' }}
                        className="card-body py-0"
                        style={{ maxHeight: '100vh', minHeight: '100vh' }}>
                        {mentors.rows.length > 0 && mentors.rows}
                    </SimpleBar>
                </Col>
            </Card.Body>
        </Card>
    );
};

MentorsTable.propTypes = mentorsTableProptypes;
export default React.memo(MentorsTable);
