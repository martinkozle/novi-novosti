import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import categories from './data/categories.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface CategoriesNavbarProp {
    buttonRef: (el: any) => number
}

function CategoriesNavbar(props: CategoriesNavbarProp) {
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Nav className='me-auto'>
                    {
                        categories.categories.map(
                            category => {
                                return (
                                    <CategoryButton key={category} category={category} buttonRef={props.buttonRef}/>
                                )
                            }
                        )
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

interface CategoryButtonProp {
    category: string,
    buttonRef: (el: any) => number
}

function CategoryButton(props: CategoryButtonProp) {
    return (
        <Link to={`/category/${props.category}`} ref={props.buttonRef} className='text-decoration-none nav-link rounded me-2 bg-primary text-white text-center'>
            {props.category}
        </Link>
    );
}

export default CategoriesNavbar;
