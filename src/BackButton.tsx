import React from 'react';
import {useHistory} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function BackButton() {
    const history = useHistory();

    return (
        <Button className='mb-2 position-absolute' type='button' variant='white' onClick={history.goBack} style={{left: 20}}>
            <i className="bi bi-arrow-left fs-3 text-white"></i>
        </Button>
    )
}

export default BackButton;
