import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const UsersStatistics = ({ actUsers }) => {
    const [result, setResult] = useState(0);
    const _logger = debug.extend('Statistics');
    _logger('actUsers running ->', actUsers);

    useEffect(() => {
        const arr = actUsers?.usersGrowth;
        const currentMonth = new Date().getMonth() + 1;
        let monthCreated = 0;
        let usersByMonth = 0;
        const usersByMonthArr = [];

        for (let index = 0; index < arr?.length; index++) {
            monthCreated = new Date(arr[index].dateCreated).getMonth() + 1;
            if (index !== 0) {
                const prevMonthCreated = new Date(arr[index - 1].dateCreated).getMonth() + 1;

                if (monthCreated !== prevMonthCreated) {
                    usersByMonth = 0;
                }
            }
            usersByMonth += arr[index].quantity;
            usersByMonthArr[monthCreated] = usersByMonth;
        }

        const usersGrowthTrue = (dif) => {
            return (
                <span className="bg-success text-white me-2">
                    <span className="mdi mdi-arrow-up-bold"></span> {dif}
                </span>
            );
        };

        const usersGrowthFalse = (dif) => {
            return (
                <span className="bg-danger text-white me-2">
                    <span className="mdi mdi-arrow-up-bold"></span> {dif}
                </span>
            );
        };

        if (usersByMonthArr[currentMonth] > usersByMonthArr[currentMonth - 1]) {
            const difference = usersByMonthArr[currentMonth] - usersByMonthArr[currentMonth - 1];
            setResult(usersGrowthTrue(difference));
        } else if (usersByMonthArr[currentMonth] < usersByMonthArr[currentMonth - 1]) {
            const difference = usersByMonthArr[currentMonth - 1] - usersByMonthArr[currentMonth];
            setResult(usersGrowthFalse(difference));
        } else {
            setResult(usersGrowthTrue(0));
        }

        _logger(result);
    }, []);

    return (
        <>
            <Card className="tilebox-one">
                <Card.Body>
                    <h5 className="text-uppercase mt-0">Active {actUsers?.roleName}s</h5>
                    <h2 className="my-2" id="active-users-count">
                        {actUsers?.quantity}
                    </h2>
                    <p className="mb-0 text-muted">
                        {result}
                        <span className="text-nowrap">Since last month</span>
                    </p>
                </Card.Body>
            </Card>
        </>
    );
};

UsersStatistics.propTypes = {
    actUsers: PropTypes.shape({
        roleName: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        usersGrowth: PropTypes.arrayOf(
            PropTypes.shape({
                dateCreated: PropTypes.string,
                quantity: PropTypes.number,
            })
        ),
    }),
};

export default UsersStatistics;
