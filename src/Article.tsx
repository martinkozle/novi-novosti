import React from 'react';
import {useParams} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import {requestArticleByID} from './API';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

interface ArticleParams {
    id: string
}

function Article() {
    const {id} = useParams<ArticleParams>();
    const article = requestArticleByID(+id);
    if (article) {
        return (
            <Card key={article.id}>
                <Card.Body>
                    <Card.Title className='fs-2'>{article.title}</Card.Title>
                    <Nav>
                        {
                            article.categories.map(category => {
                                return (
                                    <Nav.Item key={category} className='me-2 p-1 bg-info'>{category}</Nav.Item>
                                );
                            })
                        }
                    </Nav>
                    <small className='text-muted'>Објавено на {article.time}</small>
                    <hr/>
                    {
                        article.text.split('\n').map(
                            (paragraph, index) => {
                                return <ArticleParagraph key={index} text={paragraph}/>
                            }
                        )
                    }
                </Card.Body>
            </Card>
        );
    } else {
        return <h1>Article not found!</h1>
    }
}

interface ArticleParagraphProp {
    text: string
}

function ArticleParagraph(prop: ArticleParagraphProp) {
    if (prop.text === "") {
        return <></>
    } else {
        return (
            <p>{prop.text}</p>
        );
    }
}

export default Article;
