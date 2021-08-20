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
                    <Route exact path={`${process.env.PUBLIC_URL}/`}>
                        <Redirect to={`${process.env.PUBLIC_URL}/category/Ново`}/>
                    </Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/category/:categoryName`}>
                        <CategoriesNavbar/>
                        <CategoryArticlePreviews/>
                    </Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/article/:id`}>
                        <CategoriesNavbar/>
                        <Article/>
                    </Route>
                    <Route exact path={`${process.env.PUBLIC_URL}/saved-articles`}>
                        <SavedArticlePreviews/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
