import React from "react";
import { Card, Stack, Badge } from "react-bootstrap";
import PropTypes from "prop-types";

function JobCard(props) {

    const aJob = props.jobData

    const showJobDetails = () => {
        props.detailsClick(aJob)
    }

    const getTimeDifference = () => {
        const daysBetween = new Date().getDate() - new Date(aJob?.dateCreated).getDate()

        if (daysBetween === 0) {
            return 'Today'
        } else if (daysBetween === 1) {
            return 'Yesterday'
        } else if (daysBetween > 30) {
            return `30+ days ago`
        } else if (daysBetween < 0) {
            const dayBetween = daysBetween + 30
            return `${dayBetween} days ago`;
        } else {
            return `${daysBetween} days ago`
        }
    }

    return (
        <>
            <Card
                key={aJob.id}
                onClick={showJobDetails}
                className="job-card-style"
                tabIndex="0"
            >
                <Card.Body
                    className="p-1"
                >
                    <div className="my-2">
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
                                        className="pb-0" id="DIV-2"
                                    >
                                        <div>
                                            <p
                                                className="jobs-logo"
                                            >
                                                {aJob?.contactName.charAt(0)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="p-2 "
                                >
                                    <h5
                                        className="center-jobs"
                                    >
                                        {aJob?.title || "Error Loading Job title "}
                                        <br />
                                    </h5>
                                    <h4
                                        className="card-title jobs-purp-text"
                                        title="Job title"
                                        name="card-title"
                                    >
                                        {aJob?.contactName || "Error Loading Company Name"}
                                    </h4>
                                    <h5>
                                        {aJob?.location.city || "Error Loading City "}
                                    </h5>
                                </div>
                            </div>
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
                        </Stack>
                    </div>
                    <div
                        className="border rounded p-2 mb-3"
                    >
                        <span
                            className="mb-0"
                        >
                            {aJob.description.slice(0, 100)}...
                        </span>
                    </div>
                    <div
                        className="split-actionbar mb-1 center-job-fields">
                        <Stack
                            direction="horizontal"
                            gap={4}
                        >
                            <div
                                className="date-styles-2"
                                name="datePostedMeta">
                                {getTimeDifference()}
                            </div>
                        </Stack>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
};

JobCard.propTypes = {
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

export default React.memo(JobCard);