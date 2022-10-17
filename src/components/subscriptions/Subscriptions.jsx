import React, { useState, useEffect } from 'react';
import debug from 'sabio-debug';
import * as subscriptionService from '../../services/subscriptionService';
import Subscription from './Subscription';
import { Row, Col } from 'react-bootstrap';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
const _logger = debug.extend('SubPage');

function Subscriptions() {
    const [products, setproductsUpdate] = useState({
        arrayOfProducts: [],
        productCompontents: [],
    });

    useEffect(() => {
        subscriptionService.getSubscriptions().then(onGetSubscriptionSuccess).catch(onGetSubscriptionError);
    }, []);

    const onClick = (e) => {
        _logger('handleChange', { syntheticEvent: e });
        const target = e.target;
        const newValue = target.value;
        const nameOfField = target.name;
        const newproductObject = {};
        newproductObject[nameOfField] = newValue;
        checkoutService(newproductObject);
        return newproductObject;
    };
    const onCheckoutSuccess = (response) => {
        _logger({ GetProduct: response });
        window.location.href = response.data.value.item.url;
    };

    const checkoutService = (lookup) => {
        subscriptionService.checkout(lookup).then(onCheckoutSuccess).catch(onCheckoutError);
    };

    const onCheckoutError = (response) => {
        toastr.error('There was an error with checkout please check back later');
        _logger({ GetProduct: response });
    };

    const onGetSubscriptionSuccess = (response) => {
        _logger({ GetProduct: response });
        let arrayOfProducts = response.data.data;
        setproductsUpdate((prevState) => {
            const pd = { ...prevState };
            pd.arrayOfProducts = arrayOfProducts;

            pd.productCompontents = arrayOfProducts.map(mapSubs);
            return pd;
        });
    };

    const mapSubs = (aSub) => {
        if (aSub.active === true) {
            return (
                <Col className="my-5" md={8} lg={6} xl={5} xxl={4} key={`aSubCard_${aSub.id}`}>
                    <Subscription subscription={aSub} update={onClick} />
                </Col>
            );
        }
    };

    const onGetSubscriptionError = (response) => {
        toastr.error('There was an error loading subscriptions please check back later');
        _logger({ GetProduct: response });
    };

    return (
        <Row className=" my-2 justify-content-center" md={4} xxl={3}>
            {products.productCompontents}
        </Row>
    );
}

export default Subscriptions;
