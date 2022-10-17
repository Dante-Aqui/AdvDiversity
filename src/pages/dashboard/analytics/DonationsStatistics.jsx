import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Row, Col, Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';

const DonationsStatistics = ({ donationsStats }) => {
    const _logger = debug.extend('DonationsStatistics');
    _logger('ordersGrowth arr ->', donationsStats);
    const [donStats, setDonStats] = useState({
        arrayOfDonations: [],
        totalDonations: 0,
        totalSubscribers: 0,
        avgDonation: 0,
    });

    useEffect(() => {
        const arrayOfDon = donationsStats.map((item) => item.amountTotal);
        const totDonations = arrayOfDon.reduce((partialSum, item) => partialSum + item, 0);
        const arrSubs = donationsStats.map((item) => item.suscribedMembers);
        const totSubscribers = arrSubs.reduce((partialSum, item) => partialSum + item, 0);
        let avgDon = 0;

        if (arrayOfDon !== null && totDonations !== 0) {
            avgDon = Math.round(totDonations / arrayOfDon.length);
        }

        setDonStats((prevStats) => {
            let ns = { ...prevStats };
            ns.arrayOfDonations = arrayOfDon;
            ns.totalDonations = totDonations;
            ns.totalSubscribers = totSubscribers;
            ns.avgDonation = avgDon;

            return ns;
        });

        _logger(donStats);
    }, [donationsStats]);

    const colors = ['#0acf97'];

    const getDaysInMonth = (month, year) => {
        var date = new Date(year, month, 1);
        var days = [];
        var idx = 0;
        while (date.getMonth() === month && idx < 9) {
            var d = new Date(date);
            days.push(d.getDate() + ' ' + d.toLocaleString('en-us', { month: 'short' }));
            date.setDate(date.getDate() + 1);
            idx += 1;
        }
        return days;
    };

    const now = new Date();
    const labels = getDaysInMonth(now.getMonth() + 1, now.getFullYear());

    const apexBarChartOpts = {
        grid: {
            padding: {
                left: 0,
                right: 0,
            },
        },
        chart: {
            height: 309,
            type: 'area',
            parentHeightOffset: 0,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth',
            width: 4,
        },
        zoom: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: colors,
        xaxis: {
            type: 'string',
            categories: labels,
            tooltip: {
                enabled: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {},
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    return '$ ' + val;
                },
                offsetX: -15,
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                type: 'vertical',
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.45,
                opacityTo: 0.1,
                stops: [45, 100],
            },
        },
    };
    const apexBarChartData = [
        {
            name: 'Donations',
            data: donStats.arrayOfDonations,
        },
    ];

    return (
        <>
            <Row>
                <Col xl={4} lg={4}>
                    <Card className="tilebox-one">
                        <Card.Body>
                            <i className="uil uil-users-alt float-end"></i>
                            <h6 className="text-uppercase mt-0">Total Donations</h6>
                            <h2 className="my-2" id="active-users-count">
                                $ {donStats.totalDonations}
                            </h2>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-arrow-up-bold"></span> 5.27%
                                </span>
                                <span className="text-nowrap">Since last month</span>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4} lg={4}>
                    <Card className="tilebox-one">
                        <Card.Body>
                            <i className="uil uil-users-alt float-end"></i>
                            <h6 className="text-uppercase mt-0">Total Subscribers</h6>
                            <h2 className="my-2" id="active-users-count">
                                {donStats.totalSubscribers}
                            </h2>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-arrow-up-bold"></span> 5.27%
                                </span>
                                <span className="text-nowrap">Since last month</span>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4} lg={4}>
                    <Card className="tilebox-one">
                        <Card.Body>
                            <i className="uil uil-users-alt float-end"></i>
                            <h6 className="text-uppercase mt-0">Average Donation</h6>
                            <h2 className="my-2" id="active-users-count">
                                $ {donStats.avgDonation}
                            </h2>
                            <p className="mb-0 text-muted">
                                <span className="text-success me-2">
                                    <span className="mdi mdi-arrow-up-bold"></span> 5.27%
                                </span>
                                <span className="text-nowrap">Since last month</span>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Card className="card-h-100">
                    <Card.Body>
                        <ul className="nav float-end d-none d-lg-flex">
                            <li className="nav-item">
                                <a className="nav-link text-muted" href="/">
                                    Today
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-muted" href="/">
                                    7d
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="/">
                                    15d
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-muted" href="/">
                                    1m
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-muted" href="/">
                                    1y
                                </a>
                            </li>
                        </ul>
                        <h4 className="header-title mb-3">Donations</h4>
                        <Chart
                            options={apexBarChartOpts}
                            series={apexBarChartData}
                            type="area"
                            className="apex-charts mt-3"
                            height={308}
                        />
                    </Card.Body>
                </Card>
            </Row>
        </>
    );
};

DonationsStatistics.propTypes = {
    donationsStats: PropTypes.arrayOf(
        PropTypes.shape({
            dateCreated: PropTypes.string.isRequired,
            amountTotal: PropTypes.number.isRequired,
            suscribedMembers: PropTypes.number.isRequired,
        })
    ),
};
export default React.memo(DonationsStatistics);
