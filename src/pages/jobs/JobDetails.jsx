import React from "react"
import { Card, Stack, Container, Button, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import SimpleBar from "simplebar-react"
import PropTypes from "prop-types"


const JobDetails = (props) => {
    const aJob = props.jobData
    const convertDate = (eventDate) => {
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        var today = new Date(eventDate);
        return today.toLocaleDateString('en-US', options);
    };

    return (
        <Card >
            <Card.Body
                className="p-1 jobs-shadow rounded "
            >
                <div className="my-4">
                    <Stack
                        direction="horizontal"
                        gap={4}
                    >
                        <div
                            className="d-flex justify-content-between align-items-center"
                        >
                            <div
                                className="image-holder p-2 m-1"
                            >
                                <div
                                    className="jobs-logo-jd"
                                    id="DIV-2"
                                >
                                    {aJob?.contactName.charAt(0)}
                                </div>
                            </div>
                            <div
                                className="row"
                            >
                                <div
                                    className="p-2 "
                                >
                                    <h4
                                        className="center-jobs"
                                    >
                                        {aJob?.title || "Error Loading Job title "}
                                        <br />
                                    </h4>
                                    <h3
                                        className="card-title jobs-purp-text"
                                        title="Job title"
                                        name="card-title"
                                    >
                                        {aJob?.contactName || "Error Loading Company Name"}
                                    </h3>
                                    <h4>
                                        {aJob?.location.city || "Error Loading City "}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-4 center-jobs p-2 m-2 ms-auto"
                        >
                            <Button
                                className="jobs-purp"
                                variant="primary"
                                type="submit"
                                title="Apply"
                            >
                                Apply on company site
                            </Button>
                        </div>
                    </Stack>
                </div>

            </Card.Body>
            <SimpleBar
                className="card-body py-0 job-details-container"
            >
                <div
                    className="border rounded p-1 m-1"
                >
                    <Stack
                        direction="horizontal" gap={4}
                    >
                        <div
                            className="details-table-row"
                        >
                            <Stack
                                direction="horizontal" gap={4}
                            >
                                <p
                                    className="center-jobs m-1"
                                    id="jobPostedCity">{aJob?.location.city || "Error Loading City "},
                                </p>

                                <p
                                    className="center-jobs m-1"
                                    id="jobPostedState">{aJob?.state.code || "Error Loading State "}
                                </p>
                            </Stack>
                        </div>
                        <div
                            className="vr ms-auto"
                        />
                        <span
                            md={{ span: 4, offset: 4 }}
                            className="center-jobs p-2 m-1 ms-auto"
                        >
                            <Badge
                                pill bg="secondary"
                            >
                                {!aJob?.isRemote || "Remote"}
                            </Badge>{' '}
                        </span>
                        <div
                            className="vr ms-auto"
                        />
                        <div
                            className="details-table-row"
                        >
                            <Stack
                                direction="horizontal" gap={4}
                            >
                                <p
                                    className="center-jobs m-1"
                                    id="jobPostedLabel"
                                >
                                    {convertDate(aJob?.dateCreated) || "Error Loading Date Posted "}
                                </p>
                            </Stack>
                        </div>
                    </Stack>
                </div>
                <Container
                    className="jobDescriptionContainer"
                >
                    <div>
                        <div>
                            <div>
                                <p>
                                    <strong>
                                        {aJob?.jobType.type || "Error Loading Job Type"} Full Job Description:
                                    </strong>
                                </p>
                                <p>
                                    {aJob?.description || "Error loading Job description"}
                                </p>
                                <strong>
                                    Requirements:
                                </strong>
                                <p>
                                    {aJob?.requirements || "Error loading Job requirements"}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                <div
                    className="border rounded p-1 m-1"
                >
                    <ul
                        className="center-job-fields list-inline m-2"
                    >
                        <li
                            className="list-inline-item font-16 fw-semibold"
                        >
                            <Link
                                to="#"
                                className="text-secondary"
                            >
                                {aJob?.location.lineOne || "Error Loading address Line 1"}
                            </Link>
                        </li>
                        <li
                            className="list-inline-item text-muted"
                        >
                        </li>
                        <li
                            className="list-inline-item font-13 fw-semibold text-muted"
                        >
                            {aJob?.location.lineTwo || " "}
                        </li>

                        <p
                            className="text-muted mb-0">
                            {aJob?.location.city || "Error Loading City "}
                        </p>
                        <p
                            className="text-muted mb-0"
                        >
                            <b>
                                {aJob?.state.code || "Error Loading State "},
                                {aJob?.location.zip || "Error Loading Zip "}
                            </b>
                        </p>
                    </ul>
                </div>
                <div
                    className="border rounded p-1 m-1"
                >
                    <ul
                        className="center-job-fields list-inline mb-2"
                    >
                        <li
                            className="list-inline-item font-16 fw-semibold"
                        >
                            <Link
                                to="#"
                                className="text-secondary"
                            >
                                {aJob?.contactName || "Error Loading Company Name"}
                            </Link>
                        </li>
                        <li
                            className="list-inline-item text-muted"
                        >
                        </li>
                        <li
                            className="center-job-fields list-inline-item font-13 fw-semibold text-muted"
                        >
                            {aJob?.contactEmail || "Error Loading Company Email"}
                        </li>

                        <p
                            className="center-job-fields text-muted mb-0"
                        >
                            {aJob?.contactPhone || "Error Loading Company Number"}

                        </p>

                    </ul>
                </div>

            </SimpleBar>
        </Card>
    )
}

JobDetails.propTypes = {
    detailsClick: PropTypes.func,
    jobData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        jobType: PropTypes.shape({
            id: PropTypes.number,
            type: PropTypes.string.isRequired
        }),
        location: PropTypes.shape({
            id: PropTypes.number,
            locationTypeId: PropTypes.number,
            lineOne: PropTypes.string,
            lineTwo: PropTypes.string,
            city: PropTypes.string.isRequired,
            zip: PropTypes.string,
            stateId: PropTypes.number,
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            createdBy: PropTypes.number,
            modifiedBy: PropTypes.number,
        }),
        state: PropTypes.shape({
            id: PropTypes.number,
            code: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            countryId: PropTypes.number,
        }),
        createdBy: PropTypes.number,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        requirements: PropTypes.string.isRequired,
        isActive: PropTypes.bool,
        isRemote: PropTypes.bool,
        contactName: PropTypes.string,
        contactPhone: PropTypes.string,
        contactEmail: PropTypes.string,
        dateCreated: PropTypes.string,
        dateModified: PropTypes.string,
    })
}

export default JobDetails;
