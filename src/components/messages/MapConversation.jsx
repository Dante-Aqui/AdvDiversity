import React from 'react';
import debug from 'sabio-debug';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
const _logger = debug.extend('MapConversation');

const selectedUser = (e) => {
    e.preventDefault();
    _logger('selectedUser');
};

function MapConversation(props) {
    _logger(props);
    return (
        <Link to="#" className="text-body" onClick={selectedUser}>
            <div
                className={classnames('d-flex', 'align-items-start', 'mt-1', 'p-2', {
                    'bg-light': true,
                })}>
                <img
                    src="https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    className="me-2 rounded-circle"
                    height="48"
                    alt="phto"
                />

                <div className="w-100 overflow-hidden">
                    <h5 className="mt-0 mb-0 font-14">
                        <span className="float-end text-muted font-12">10:00</span>
                        Ben Santjer
                    </h5>
                    <p className="mt-1 mb-0 text-muted font-14">
                        <span className="w-25 float-end text-end">
                            <span className="badge badge-danger-lighten">3</span>
                        </span>
                        <span className="w-75">Hi, How are you ?</span>
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default MapConversation;
