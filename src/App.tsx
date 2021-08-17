import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Header from './Header';
import CategoriesNavbar from './CategoriesNavbar';
import Article from './Article';
import ArticlesPreview from './ArticlePreview';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const categoryButtonsRefs: Array<HTMLElement> = [];

    return (
        <div>
            <Router>
                <Header/>
                <CategoriesNavbar buttonRef={el => categoryButtonsRefs.push(el)}/>
                <Container className='mt-2'>
                    <Switch>
                        <Route exact path='/'>
                            <Redirect to='/category/Ново'/>
                        </Route>
                        <Route exact path='/category/:categoryName'>
                            <ArticlesPreview categoryButtonsRefs={categoryButtonsRefs}/>
                        </Route>
                        <Route exact path='/article/:id'>
                            <Article/>
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
