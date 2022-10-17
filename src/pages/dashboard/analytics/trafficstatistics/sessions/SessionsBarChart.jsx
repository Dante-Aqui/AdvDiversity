import React from 'react';
import Chart from 'react-apexcharts';
import { Row, Col } from 'react-bootstrap';
import { FaDesktop, FaMobile, FaTablet } from 'react-icons/fa';
import PropTypes from 'prop-types';

const SessionsBarChart = (props) => {
    const { devices, count } = props.sessionsInfo;

    const options = {
        xaxis: {
            categories: [...devices],
            labels: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        chart: {
            toolbar: {
                show: false,
            },
        },
    };

    const data = [
        {
            data: [...count],
        },
    ];
    return (
        <>
            <Row>
                <Col xs={2}>
                    <div
                        className="h-100 
                                d-flex 
                                flex-column 
                                justify-content-around py-2
                                align-items-center  ">
                        <h2 className="pt-4 d-flex flex-column align-items-center">
                            <FaDesktop className="mb-1" />
                            <small>Desktop</small>
                        </h2>
                        <h2 className="d-flex flex-column align-items-center">
                            <FaMobile className="mb-1" />
                            <small>Mobile</small>
                        </h2>
                        <h2 className="pb-2 d-flex flex-column align-items-center">
                            <FaTablet className="mb-1"></FaTablet>
                            <small>Tablet</small>
                        </h2>
                    </div>
                </Col>
                <Col xs={10} className="py-2">
                    <Chart options={options} series={data} height={350} type="bar" className="apex-charts" />
                </Col>
            </Row>
        </>
    );
};

SessionsBarChart.propTypes = {
    sessionsInfo: PropTypes.shape({
        devices: PropTypes.arrayOf(PropTypes.string).isRequired,
        count: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
};

export default React.memo(SessionsBarChart);
