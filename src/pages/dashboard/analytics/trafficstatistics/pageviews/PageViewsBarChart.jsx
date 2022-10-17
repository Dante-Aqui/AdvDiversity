import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const PageViewsBarChart = (props) => {
    const { pages, viewsByPage } = props.pagesInfo;

    const options = {
        dataLabels: {
            enabled: false,
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
            categories: [...pages],
            labels: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                align: 'left',
                style: {
                    fontSize: '17px',
                },
            },
        },
        tooltip: {
            fixed: {
                enabled: false,
                position: 'topLeft',
            },
            style: {
                fontSize: '20px',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 2,
            },
        },
        chart: {
            toolbar: {
                show: false,
            },
            events: {
                dataPointSelection: (event, chartContext, config) => {
                    const index = config.selectedDataPoints[0];
                    props.viewAverageTimeOnPage(index);
                },
            },
        },
    };

    const data = [
        {
            name: 'Visits count',
            data: viewsByPage,
        },
    ];

    return (
        <>
            <Chart options={options} series={data} height={350} type="bar" className="apex-charts" />
        </>
    );
};

PageViewsBarChart.propTypes = {
    pagesInfo: PropTypes.shape({
        pages: PropTypes.arrayOf(PropTypes.string).isRequired,
        viewsByPage: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
    viewAverageTimeOnPage: PropTypes.func.isRequired,
};

export default React.memo(PageViewsBarChart);
