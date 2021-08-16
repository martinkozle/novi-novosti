import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    return (
        <Row className='mt-3 align-items-end'>
            <Col md={6}>
                <h1 className={'header bg-primary fs-1 p-3'}>Нови Новости</h1>
            </Col>
            <Col md={3}>
                <Button variant='success' className='float-end' href='#'> {/*TODO add functionality*/}
                    Прегледај зачувани објави
                </Button>
            </Col>
            <Col md={3}>
                <Form>
                    <Form.Control type='text' placeholder='Пребарај...' className={'center'}/>
                </Form>
            </Col>
        </Row>
    );
}

export default Header;
