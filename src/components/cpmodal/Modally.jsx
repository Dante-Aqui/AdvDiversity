import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import logo from '../../assets/images/users/logo-transparent2.png';
import { CookiesProvider, useCookies } from 'react-cookie';
function Modally() {
    const [show, setShow] = React.useState(true);

    const handleClose = () => setShow(false);

    const [cookies, setCookie] = useCookies(['bob']);

    function onChange(newName) {
        setCookie('bob', newName, { path: '/' });
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} contentLabel="Modal">
                <img src={logo} alt="" className="pt-3 pb-0 center m-auto" height="140" width="150" />
                <Modal.Header>
                    <Modal.Title className="text-center w-75 m-auto">
                        <h1>Not Welcome</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    We use cookies and similar technologies on our website and process your personal data (e.g. IP
                    address), for example, to personalize content, and to analyze traffic on our website. Data
                    processing may also happen as a result of cookies being set. We share this data with third parties
                    that we name in out privacy policy. The data processing may take place with your consent or on the
                    basis of a legitimate interest, which you can object to. You have the right not to consent and to
                    change or revoke your consent at a later time.
                </Modal.Body>
                <CookiesProvider></CookiesProvider>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose} onChange={onChange}>
                        Accept
                        {cookies.name && <h1>{cookies.name}</h1>}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modally;
