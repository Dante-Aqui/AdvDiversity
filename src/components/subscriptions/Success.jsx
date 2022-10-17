import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import * as subscriptionService from '../../services/subscriptionService';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import debug from 'sabio-debug';

const _logger = debug.extend('success');

function Success() {
    const [customer, setCustomerData] = useState({
        amountTotal: 0,
        id: 0,
        currency: '',
        customerId: '',
        mode: '',
        paymentStatus: '',
        customerName: '',
        customerEmail: '',
        transactionId: '',
        dateOrdered: null,
    });

    useEffect(() => {
        let win = window.location.href.split('=');
        subscriptionService.getSession(win[1]).then(onSuccessfulPageSuccess).catch(onSuccessfulPageError);
    }, []);

    const onSuccessfulPageSuccess = (response) => {
        _logger(response.data.value.item);
        let customerInfo = response.data.value.item;
        setCustomerData((prevState) => {
            const pd = { ...prevState };
            pd.id = customerInfo.client_reference_id;
            pd.customerId = customerInfo.customer;
            pd.amountTotal = customerInfo.amount_total;
            pd.currency = customerInfo.currency;
            pd.mode = customerInfo.mode;
            pd.paymentStatus = customerInfo.payment_status;
            pd.customerName = customerInfo.customer_details.name;
            pd.customerEmail = customerInfo.customer_details.email;
            subscriptionService.getOrder(pd.id).then(getCustSuccess).catch(getCustError);
            subscriptionService.updateCustomer(pd, pd.id).then(onUpdateSuccess).catch(onUpdateErr);
            return pd;
        });
    };

    const onSuccessfulPageError = (response) => {
        toastr.error('An error has occured retreiving your recepit');
        _logger(response);
    };

    const onUpdateSuccess = (response) => {
        _logger(response);
    };

    const getCustSuccess = (response) => {
        _logger(response);
        const orderData = response.data;
        setCustomerData((prevState) => {
            const pd = { ...prevState };
            pd.transactionId = orderData.transactionId;
            pd.dateOrdered = orderData.dateModified;

            return pd;
        });
    };

    const getCustError = (err) => {
        toastr.error('There was a problem retrieving customer');
        _logger(err);
    };

    const onUpdateErr = (response) => {
        toastr.error('There was a problem Updating customer');
        _logger({ GetProduct: response });
    };

    const emailReceiptSuccess = (response) => {
        toastr.success('Receipt was sent to Email');
        _logger(response);
    };

    const emailReceiptErr = (response) => {
        toastr.error('There was a problem sending the email');
        _logger({ GetProduct: response });
    };

    const sendEmail = () => {
        subscriptionService.emailReceipt(customer).then(emailReceiptSuccess).catch(emailReceiptErr);
    };

    const calculateTotalToUSD = customer.amountTotal / 100 + '.00';

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Row className="my-3 justify-content-center">
                        <Col lg={4}>
                            <h4 className="header-title mb-3 justify-content-center">
                                Thank You {customer.customerName} for Subscribing!
                            </h4>
                            <Card>
                                <Card.Body>
                                    <h4 className="header-title mb-3">Order Summary</h4>
                                    <div>Purchase for a {customer.mode}</div>
                                    <div>Transtion Id: {customer.transactionId}</div>
                                    <div>Email: {customer.customerEmail}</div>
                                    <div>Total Amount: ${calculateTotalToUSD}</div>
                                    <div>Payment Status: {customer.paymentStatus}</div>
                                    <button onClick={sendEmail} className="btn btn-primary">
                                        Email Receipt
                                    </button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Success;
