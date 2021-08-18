import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {confirmAlert} from 'react-confirm-alert';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import Comments from './Comments';
import {requestArticleByID, saveArticle, unsaveArticle, isArticleSaved} from './API';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

interface ArticleParams {
    id: string
}

interface ButtonStatus {
    saved: boolean,
    variant: string,
    innerText: string
}

const BUTTON_STATUS_NOT_SAVED: ButtonStatus = {
    saved: false,
    variant: 'success',
    innerText: 'Зачувај'
}

const BUTTON_STATUS_SAVED: ButtonStatus = {
    saved: true,
    variant: 'secondary',
    innerText: 'Зачувано'
}

function Article() {
    const [buttonStatus, setButtonStatus] = useState<ButtonStatus>(BUTTON_STATUS_NOT_SAVED);

    const {id} = useParams<ArticleParams>();
    const article = requestArticleByID(+id);

    useEffect(() => {
        let isSaved = false;
        if (article) {
            isSaved = isArticleSaved(article.id);
        }
        if (isSaved) {
            setButtonStatus(BUTTON_STATUS_SAVED);
        } else {
            setButtonStatus(BUTTON_STATUS_NOT_SAVED);
        }
    }, []);


    function onClickSaveArticle(element: React.MouseEvent, id: number) {
        if (buttonStatus.saved) {
            confirmAlert({
                title: 'Тргни од зачувани',
                message: 'Дали сте сигурни?',
                buttons: [
                    {
                        label: 'Да',
                        onClick: () => {
                            unsaveArticle(id);
                            setButtonStatus(BUTTON_STATUS_NOT_SAVED);
                        }
                    },
                    {
                        label: 'Не',
                        onClick: () => void 0
                    }
                ]
            });
        } else {
            saveArticle(id);
            setButtonStatus(BUTTON_STATUS_SAVED);
        }
    }

    if (article) {
        return (
            <Container className='mt-2'>
                <Card key={article.id}>
                    <Card.Body>
                        <Card.Title className='fs-2'>{article.title}</Card.Title>
                        <Navbar>
                            <Nav className='me-auto'>
                                {
                                    article.categories.map(category => {
                                        return (
                                            <Nav.Item key={category} className='me-2 p-1 bg-info'>{category}</Nav.Item>
                                        );
                                    })
                                }
                            </Nav>
                            <Nav>
                                <Button variant={buttonStatus.variant}
                                        onClick={element => onClickSaveArticle(element, article.id)}>{buttonStatus.innerText}</Button>
                            </Nav>
                        </Navbar>
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
                <Comments articleID={article.id}/>
            </Container>
        );
    } else {
        return <Container className='mt-2'><h1>Article not found!</h1></Container>
    }
}

interface ArticleParagraphProp {
    text: string
}

function ArticleParagraph(prop: ArticleParagraphProp) {
    if (prop.text === '') {
        return <></>
    } else {
        return (
            <p>{prop.text}</p>
        );
    }
}

export default Article;
