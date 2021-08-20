import React from 'react';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import BackButton from './BackButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';


function Header() {
    return (
        <Navbar bg='dark' expand='lg' className='sticky-top'>
            <BackButton/>
            <Container className='ms-auto'>
                <Navbar.Brand className='btn-group'>
                    <Link to={`${process.env.PUBLIC_URL}/`} className='bg-secondary rounded-2 btn btn-secondary text-start'>
                        <h1 className='header'>Нови Новости</h1>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='me-auto'></Nav>
                    <Nav className='me-auto'>
                        <Search/>
                    </Nav>
                    <Nav>
                        <Link to={`${process.env.PUBLIC_URL}/saved-articles`} className='me-2'>
                            <Button variant='secondary'>Прегледај зачувани објави</Button>
                        </Link>
                        <Nav.Link className='text-white'>
                            <i className="bi bi-person-circle"></i> <span
                            className='text-decoration-underline'>Мартин</span>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function Search() {
    return (
        <Form.Group className='d-flex flex-row'>
            <Form.Control type='search' placeholder='Пребарај...' className='rounded-left'/>
            <Button type='submit' variant='secondary' className='rounded-right'>
                <i className="bi bi-search"></i>
            </Button>
        </Form.Group>
    );
}

export default Header;
