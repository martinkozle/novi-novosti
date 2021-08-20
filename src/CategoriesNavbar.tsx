import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {requestCategories} from './API';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface CategoriesNavbarParams {
    categoryName: string | undefined
}

interface CategoryButtonProp {
    category: string,
    buttonClass: string
}

function CategoriesNavbar() {
    const {categoryName} = useParams<CategoriesNavbarParams>();
    const [shownCategories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        const categories = requestCategories();
        setCategories(categories);
    }, []);

    return (
        <Navbar bg='light' expand='lg' className='mb-2'>
            <Container>
                <Nav className='me-auto'>
                    {
                        shownCategories.map(
                            category => {
                                if (category === categoryName) {
                                    return (
                                        <CategoryButton key={category} category={category} buttonClass='bg-success'/>
                                    )
                                } else {
                                    return (
                                        <CategoryButton key={category} category={category} buttonClass='bg-primary'/>
                                    )
                                }
                            }
                        )
                    }
                </Nav>
            </Container>
        </Navbar>
    );
}

function CategoryButton(props: CategoryButtonProp) {
    return (
        <Link to={`/category/${props.category}`}
              className={`text-decoration-none nav-link rounded me-2 ${props.buttonClass} text-white text-center`}>
            {props.category}
        </Link>
    );
}

export default CategoriesNavbar;
