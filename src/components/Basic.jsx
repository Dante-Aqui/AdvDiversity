import React from 'react';

class Basic extends React.Component {
    state = {
        formData: {
            fullName: '',
            email: '',
        },
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col.-4"></div>
                </div>
            </div>
        );
    }
}

export default Basic;
