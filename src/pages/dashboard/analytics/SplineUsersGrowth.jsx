import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';

const SplineUsersGrowth = ({ userStats }) => {
    const _logger = debug.extend('SplineUsersGrowth');
    _logger('userStats arr ->', userStats);
    const [mentorInformation, setMentorInformation] = useState({
        quantityArr: 0,
        datesArr: '',
    });

    const [menteeInformation, setMenteeInformation] = useState({
        quantityArr: 0,
        datesArr: '',
    });

    useEffect(() => {
        for (let index = 0; index < userStats.length; index++) {
            const arrUsers = userStats[index]?.usersGrowth.map((item) => item.quantity);
            const arrDates = userStats[index]?.usersGrowth.map((item) => convertDate(item.dateCreated));

            if (userStats && userStats[index].roleName === 'Mentor') {
                setMentorInformation((prevUser) => {
                    const nu = { ...prevUser };
                    nu.quantityArr = arrUsers;
                    nu.datesArr = arrDates;

                    return nu;
                });
            } else if (userStats && userStats[index].roleName === 'Mentee') {
                setMenteeInformation((prevUser) => {
                    const nu = { ...prevUser };
                    nu.quantityArr = arrUsers;
                    nu.datesArr = arrDates;

                    return nu;
                });
            }
        }
    }, [userStats]);

    _logger('Mentors Info->', mentorInformation);
    _logger('Mentees Info ->', menteeInformation);

    const convertDate = (eventDate) => {
        var options = {
            month: 'long',
            day: 'numeric',
        };
        var today = new Date(eventDate);
        return today.toLocaleDateString('en-US', options);
    };

    const apexAreaChart1Opts = {
        chart: {
            height: 380,
            type: 'area',
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        colors: ['#727cf5', '#6c757d'],
        legend: {
            offsetY: -10,
        },
        xaxis: {
            categories: mentorInformation.datesArr,
        },
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topLeft',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
    };

    const apexAreaChart1Data = [
        {
            name: 'Mentee',
            data: menteeInformation.quantityArr,
        },

        {
            name: 'Mentor',
            data: mentorInformation.quantityArr,
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">Users growth</h4>
                <Chart options={apexAreaChart1Opts} series={apexAreaChart1Data} type="area" className="apex-charts" />
            </Card.Body>
        </Card>
    );
};

SplineUsersGrowth.propTypes = {
    userStats: PropTypes.arrayOf(
        PropTypes.shape({
            roleName: PropTypes.string,
            quantity: PropTypes.number,
            usersGrowth: PropTypes.arrayOf(
                PropTypes.shape({
                    dateCreated: PropTypes.string,
                    quantity: PropTypes.number,
                })
            ),
        })
    ),
};

export default React.memo(SplineUsersGrowth);
