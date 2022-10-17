import React from 'react';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';

const Subscription = (sub) => {
    const aProduct = sub.subscription;

    return (
        <Card className={classNames('card-pricing', 'card', 'card-pricing-recommended')}>
            <Card.Body className="text-center">
                <p className="card-pricing-plan-name fw-bold text-uppercase">{aProduct.name}</p>
                <img src={aProduct.images[0]} alt="sub images" className="card-pricing-icon"></img>
                <h2 className="card-pricing-price">
                    <span>{aProduct.unit_label}</span>
                </h2>
                <ul className="card-pricing-features">{aProduct.description}</ul>
                <button
                    onClick={sub.update}
                    value={aProduct.statement_descriptor}
                    name="lookupKeys"
                    className="btn btn-primary mt-4 mb-2 btn-rounded ">
                    Choose Plan
                </button>
            </Card.Body>
        </Card>
    );
};

export default Subscription;
