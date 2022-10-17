import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const UsersDonutChart = (props) => {
    const { newUsers, returningUsers } = props.usersInfo;
    const options = {
        labels: ['New Users', 'Returning Users'],
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '30%',
                },
                expandOnClick: true,
            },
        },
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topLeft',
            },
            style: {
                fontSize: '23px',
                colors: ['#fff'],
            },
        },
    };

    const data = [newUsers, returningUsers];

    return (
        <>
            <Chart options={options} series={data} type="donut" className="apex-charts" />
        </>
    );
};

UsersDonutChart.propTypes = {
    usersInfo: PropTypes.shape({
        newUsers: PropTypes.number.isRequired,
        returningUsers: PropTypes.number.isRequired,
    }),
};

export default React.memo(UsersDonutChart);
