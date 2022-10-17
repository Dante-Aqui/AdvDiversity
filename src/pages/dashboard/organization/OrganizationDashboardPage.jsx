import React from 'react';
import { Card, Row, Col } from "react-bootstrap"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { AiOutlineInsertRowAbove } from "react-icons/ai"
import { BiUserCheck, BiUserMinus } from "react-icons/bi"
import { Doughnut } from 'react-chartjs-2';

import CardTitle from '../../../components/ui/CardTitle';
import OrganizationDashboard from '../../../components/dashboardorganization/OrganizationDashboard';
import Calendar from '../../../components/ui/Calendar';
import OrganizationDonations from '../../../components/dashboardorganization/OrganizationDonations';


ChartJS.register(ArcElement, Tooltip, Legend);


const OrganizationDashboardPage = () => {

  const colors = ['#0acf97', '#727cf5', '#fa5c7c'];

  const donutChartData = {
    labels: ['Total followes', 'Mentee followers', 'Mentor followers'],
    datasets: [
      {
        data: [64, 26, 90],
        backgroundColor: colors,
        borderColor: 'transparent',
        borderWidth: '3',
      },
    ],
  };

  const donutChartOpts = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '80%',
  };

  return (
    <div className='container'>
      <OrganizationDashboard />
      <Card>
        <Card.Body>
          <CardTitle containerClass="d-flex align-items-center justify-content-between"
            title="Job Fair"
            menuItems={[
              { label: 'Weekly Report' },
              { label: 'Monthly Report' },
              { label: 'Action' },
              { label: 'Settings' },
            ]} />

          <div className="my-4 chartjs-chart" style={{ height: '195px' }}>
            <Doughnut data={donutChartData} options={donutChartOpts} />
          </div>

          <Row className='text-center mt-2 py-2'>
            <Col sm={4}>
              <div className='my-2 my-sm-0'>
                <AiOutlineInsertRowAbove size={22} />
                <h3 className='fw-normal'>
                  <span>342</span>
                </h3>
                <p className='text-muted mb-0'>Total insert in a said job fair</p>
              </div>
            </Col>

            <Col sm={4}>
              <div className='my-2 my-sm-0'>
                <BiUserCheck size={22} />
                <h3 className='fw-normal'>
                  <span>23</span>
                </h3>
                <p className='text-muted mb-0'>Participated</p>
              </div>
            </Col>

            <Col sm={4}>
              <div className='my-2 my-sm-0'>
                <BiUserMinus size={22} />
                <h3 className='fw-normal'>
                  <span>43</span>
                </h3>
                <p className='text-muted mb-0'>No Show</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <OrganizationDonations />
      <Calendar />
    </div>
  )
}

export default OrganizationDashboardPage