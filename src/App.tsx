import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Header from './Header';
import CategoriesNavbar from './CategoriesNavbar';
import Article from './Article';
import {CategoryArticlePreviews, SavedArticlePreviews} from './ArticlePreviews';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div>
            <Router>
                <Header/>
                <Switch>
                    <Route exact path='/'>
                        <Redirect to='/category/Ново'/>
                    </Route>
                    <Route exact path='/category/:categoryName'>
                        <CategoriesNavbar/>
                        <CategoryArticlePreviews/>
                    </Route>
                    <Route exact path='/article/:id'>
                        <CategoriesNavbar/>
                        <Article/>
                    </Route>
                    <Route exact path='/saved-articles'>
                        <SavedArticlePreviews/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
