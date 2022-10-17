import React from "react"
import { Card, } from "react-bootstrap"
import logo from '../../assets/images/users/logo-transparent2.png';

const JobDetailsPlaceholder = () => {
    return (
        <Card
            className="bg-white text-black img-gradient border-0"
        >
            <div
                className="text-center p-4"
            >
                <Card.Title>
                    These are jobs that could be the perfect fit! See if any more results are discovered by modifying your search.
                </Card.Title>
                <Card.Text>
                    Your results are listed on the left. Click on any job to get more information!
                </Card.Text>
            </div>
            <Card.Img
                className="opacity-50"
                src={logo}
                alt="Card image"
            />
        </Card>
    )
}

export default JobDetailsPlaceholder;
