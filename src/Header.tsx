import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function Header() {
    return (
        <Navbar bg='dark' expand='lg'>
            <Container>
                <Navbar.Brand className='btn-group'>
                    <Link to='/'>
                        <Button className='bg-secondary rounded-2 btn btn-secondary text-start'>
                            <h1 className='header'>Нови Новости</h1>
                        </Button>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'></Nav>
                    <Nav>
                        <Nav.Link href='#' className='bg-secondary text-white rounded me-2'>
                            Прегледај зачувани објави
                        </Nav.Link>
                        <Search/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function Search() {
    return (
        <Form.Group className='d-flex flex-row'>
            <Form.Control type='search' placeholder='Пребарај...' className='me-1'/>
            <Button type='submit' variant='outline-success'>
                <i className="bi bi-search"></i>
            </Button>
        </Form.Group>
    );
}

export default Header;
