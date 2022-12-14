import { Field, Form, Formik, ErrorMessage } from 'formik';
import { faqFormSchema } from '../../../schema/faqFormSchema';
import React, { useState, useEffect } from 'react';
import * as faqsServices from '../../../services/faqsServices';
import debug from 'sabio-debug';
import './faqadmin.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

const _logger = debug.extend('CreateFaq');

const CreateFaq = (props) => {
    const editFaq = props.selectedFaq_;
    _logger('Selected FAQ on CreateFaq component...', editFaq);

    const [faq, setFaq] = useState({
        faqData: {
            id: 0,
            question: '',
            answer: '',
            categoryId: 0,
            sortOrder: 0,
            faqType: '',
        },
    });

    const [faqTypes, setFaqTypes] = useState();

    useEffect(() => {
        let payload = ['FAQCategories'];
        faqsServices.getLookups(payload).then(onGetLookupSuccess).catch(onGetLookupError);

        if (editFaq !== undefined) {
            setFaq((prevState) => {
                let pd = { ...prevState };
                pd.faqData.id = parseInt(editFaq.id);
                pd.faqData.question = editFaq.question;
                pd.faqData.answer = editFaq.answer;
                pd.faqData.sortOrder = editFaq.sortOrder;
                pd.faqData.faqType = editFaq.faqCategories.name;

                return pd;
            });
        }
    }, [editFaq]);

    const onGetLookupSuccess = (response) => {
        _logger('onGetLookupSuccess', response);
        setFaqTypes((prevState) => {
            let pd = { ...prevState };
            pd = response.data.item.faqCategories;
            return pd;
        });
    };
    const onGetLookupError = (err) => {
        _logger('onSearchBlogCategoriesError', err);
    };
    const mapFaqType = (aType) => {
        return (
            <option value={aType.name} key={`faqType_${aType.name}`} id={aType.id}>
                {aType.name}
            </option>
        );
    };

    const faqSubmit = (values) => {
        for (var ix = 0; ix < faqTypes.length; ix++) {
            if (values.faqType === faqTypes[ix].name) {
                values.categoryId = faqTypes[ix].id;
            }
        }

        if (editFaq === undefined) {
            faqsServices.faqPost(values).then(onFaqsPostSucces).catch(onFaqsError);
        } else {
            faqsServices.updateFaqs(editFaq.id, values).then(onEditSuccess).catch(onEditError);
        }
    };
    const onEditSuccess = (response) => {
        _logger('Edit success...', response);
        props.editModalState(faq.faqData);
    };
    const onEditError = (error) => {
        _logger('Edit has error...', error);
    };

    const onFaqsPostSucces = (response) => {
        _logger(response);
        if (response) {
            toastr.success('FAQ has been updated');
        }
        props.editModalState();
    };

    const onFaqsError = (err) => {
        _logger(err);
        if (err) {
            toastr.error('FAQ did not post');
        }
    };

    return (
        <React.Fragment>
            <Formik
                enableReinitialize={true}
                initialValues={faq.faqData}
                onSubmit={faqSubmit}
                validationSchema={faqFormSchema}>
                {() => (
                    <Form>
                        <div>
                            <div className="card faqcard mt-3">
                                <div className="mb-3">
                                    <label htmlFor="question" className="form-label">
                                        Question
                                    </label>
                                    <Field
                                        type="text"
                                        name="question"
                                        className="form-control"
                                        id="question"
                                        placeholder="Question"></Field>
                                    <ErrorMessage name="question" component="div" className="has-error" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="answer" className="form-label">
                                        Answer
                                    </label>
                                    <Field
                                        component="textarea"
                                        name="answer"
                                        className="form-control"
                                        id="answer"
                                        placeholder="answer"
                                        rows="3"></Field>
                                    <ErrorMessage name="answer" component="div" className="has-error" />
                                </div>
                                <Row>
                                    <Col>
                                        <div className="mb-3">
                                            <label htmlFor="sortOrder_" className="form-label">
                                                FAQ Category
                                            </label>
                                            <Field
                                                component="select"
                                                name="faqType"
                                                id="faqType"
                                                className="form-control mb-3">
                                                <option value={0}>Select a category</option>
                                                {faqTypes?.map(mapFaqType)}
                                            </Field>
                                        </div>
                                    </Col>
                                    <Col>
                                        <div className="mb-3">
                                            <label htmlFor="sortOrder" className="form-label">
                                                Sort Order
                                            </label>
                                            <Field
                                                type="number"
                                                min="0"
                                                name="sortOrder"
                                                className="form-control"
                                                id="sortOrder"
                                                placeholder="SortOrder"></Field>
                                            <ErrorMessage name="sortOrder" component="div" className="has-error" />
                                        </div>
                                    </Col>
                                </Row>
                                <div>
                                    <button
                                        type="submit"
                                        className={
                                            editFaq === undefined ? 'btn btn-primary btn-sm' : 'btn btn-warning btn-sm'
                                        }>
                                        {editFaq === undefined ? 'Submit' : 'Confirm Changes'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    );
};

export default CreateFaq;

CreateFaq.propTypes = {
    selectedFaq_: PropTypes.shape({
        id: PropTypes.number.isRequired,
        answer: PropTypes.string.isRequired,
        question: PropTypes.string.isRequired,
        sortOrder: PropTypes.number.isRequired,
        faqCategories: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    }),
    editModalState: PropTypes.func,
};
