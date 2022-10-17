import React from 'react';
import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppointmentComments from '../comments/appointmentcomments/AppointmentComments';

const MentorAppointmentCard = (props) => {
    const appt = props.appts;

    const getParsedDate = (strDate) => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const strSplitDate = String(strDate).split(' ');
        let date = new Date(strSplitDate[0]);
        let dd = date.getDate();
        let mm = date.getMonth();

        const yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        date = `${months[mm]} ${dd}, ${yyyy}`;

        return date;
    };

    const onDeleteAppt = () => {
        props.onDeleteAppt(appt.id, appt.mentorId);
    };

    if (!appt) {
        return <p>You do not have appointments with anyone. Start connecting today!</p>;
    } else {
        return (
            <React.Fragment>
                <Row>
                    <div className="col-lg-3 p-2 timeline-item-info" key={`appointment_${appt.id}`}>
                        <div className="timeline-item-info">
                            <h3 className="text-info fw-bold mb-1 d-block">{appt.apptType}</h3>
                            <h5>{appt.description}</h5>
                            <h5 className="mb-0 pb-2 text-muted">{getParsedDate(appt.apptDateTime)}</h5>
                        </div>
                    </div>
                    <div className="text-center col-lg-3 p-2">
                        <div>
                            <h4 className="mb-0 ">
                                {appt.firstName} {appt.lastName}
                            </h4>
                            <img src={appt.avatarUrl} className="rounded-circle avatar-lg img-thumbnail" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 p-2">
                        <h3>
                            <Link to="/dashboard/profiles" className="btn btn-info btn-sm mb-2">
                                Go To Profile
                            </Link>
                        </h3>
                        <h3>
                            <Button onClick={onDeleteAppt} variant="warning">
                                Cancel Appointment
                            </Button>
                        </h3>
                    </div>
                    <div>
                        <AppointmentComments currentUser={props.currentUser} appointmentId={appt.id} />
                    </div>
                </Row>
            </React.Fragment>
        );
    }
};

MentorAppointmentCard.propTypes = {
    appts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        mentorId: PropTypes.number.isRequired,
        menteeId: PropTypes.number.isRequired,
        apptType: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        apptDateTime: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
    }),
    currentUser: PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.number.isRequired,
        isLoggedIn: PropTypes.bool,
        roles: PropTypes.arrayOf(PropTypes.string),
    }),
    onDeleteAppt: PropTypes.func.isRequired,
};

export default MentorAppointmentCard;
