import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const SessionsRadarChart = (props) => {
    const { browsers, count } = props.sessionsInfo;

    const options = {
        xaxis: {
            categories: browsers,
            labels: {
                show: true,
                style: {
                    colors: ['#a8a8a8'],
                    fontSize: '15px',
                    fontFamily: 'Arial',
                },
            },
        },

        chart: {
            toolbar: {
                show: false,
            },
            width: '400',
            height: '400',
        },
        options: {
            fill: {
                opacity: 0.5,
                colors: [],
            },
        },
        yaxis: {
            show: false,
        },
    };

    const data = [
        {
            data: count,
        },
    ];
    return (
        <>
            <Chart options={options} series={data} type="radar" className="apex-charts" />
        </>
    );
};

SessionsRadarChart.propTypes = {
    sessionsInfo: PropTypes.shape({
        browsers: PropTypes.arrayOf(PropTypes.string).isRequired,
        count: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
};

export default React.memo(SessionsRadarChart);
