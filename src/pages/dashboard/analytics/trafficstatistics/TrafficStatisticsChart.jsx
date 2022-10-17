import React from 'react';
import { Card, Col } from 'react-bootstrap';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const TrafficStatisticsChart = (props) => {
    const { title, dates, count } = props.chartMetricInfo;

    const options = {
        xaxis: {
            categories: dates,
        },
        chart: {
            height: 380,
            type: 'area',
            toolbar: {
                show: false,
            },
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

        tooltip: {
            enabled: false,
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
    };

    const data = [
        {
            data: [...count],
        },
    ];

    return (
        <Col>
            <Card>
                <Card.Body>
                    <h4 className="header-title mb-3">{title} flow by day</h4>
                    <Chart options={options} series={data} type="area" className="apex-charts" />
                </Card.Body>
            </Card>
        </Col>
    );
};

TrafficStatisticsChart.propTypes = {
    chartMetricInfo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        dates: PropTypes.arrayOf(PropTypes.string).isRequired,
        count: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
};

export default React.memo(TrafficStatisticsChart);
