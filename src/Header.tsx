import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function Header() {
    return (
        <Container>
            <Row className='mt-3 align-items-end'>
                <Col md={5} className='btn-group'>
                    <Button className='bg-primary rounded-2 btn text-start'>
                        <h1 className={'header fs-1 p-3'}>Нови Новости</h1>
                    </Button>
                </Col>
                <Col md={4}>
                    <Button variant='success' className='float-end'>
                        Прегледај зачувани објави
                    </Button>
                </Col>
                <Col md={3}>
                    <Form>
                        <Form.Control type='text' placeholder='Пребарај...' className={'center'}/>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;
