import React from 'react'
import { Card } from "react-bootstrap";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

import CardTitle from '../ui/CardTitle';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrganizationDonations = () => {
    var barChartData = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [
            {
                barPercentage: 0.7,
                categoryPercentage: 0.5,
                label: 'This year',
                backgroundColor: '#727cf5',
                borderColor: "#727cf5",
                data: [4234, 645, 2345, 645, 8765, 10, 7564, 87, 756, 66, 91, 14]
            },
        ],
    };

    var barChartOpts = {
        maintainAspectRatio: false,

        hover: {
            intersect: true
        },

        plugins: {
            filler: {
                propagate: false
            },
            tootltips: {
                intersect: false
            },
            legend: {
                display: false
            },
        },

        scales: {
            x: {
                reverse: false,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                },
            },
            y: {
                ticks: {
                    stepSize: 10,
                    display: false
                },
                min: 10,
                display: true,
                borderDash: [5, 5],
                grid: {
                    color: 'rgba(0,0,0,0)',
                    fontColor: '#fff'
                }
            }
        }
    }

    return (
        <Card>
            <Card.Body>
                <CardTitle
                    containerClass='d-flex align-items-center justify-content-between mb-2'
                    title='Donations'
                    menuItems={[
                        { label: 'Weekly Report' },
                        { label: 'Monthly Report' },
                        { label: 'Action' },
                        { label: 'Settings' }
                    ]}
                />

                <div dir='ltr'>
                    <div style={{ height: '320px' }} className='mt-3 chartjs-chart'>
                        <Bar data={barChartData} options={barChartOpts} />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default OrganizationDonations